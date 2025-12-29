import { Injectable } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import * as admin from "firebase-admin";
import { config } from "dotenv";
config();

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  constructor(private readonly mailerService: MailerService) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.PROJECT_ID,
          privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
          clientEmail: process.env.CLIENT_EMAIL,
        }),
      });
    }
  }

  async sendEmail(to: string, subject: string, template: string, context: any) {
    try {
      const response = await this.mailerService.sendMail({
        from: "contact@dhaniq.co.uk",
        to,
        subject,
        template,
        context,
      });
      this.logger.log(
        `Email sent to ${to} | Subject: "${subject}" | MessageId: ${response.messageId}`
      );
      // return {
      //   success: true,
      //   message: 'Email sent successfully',
      //   info: {
      //     messageId: response.messageId,
      //     accepted: response.accepted,
      //     rejected: response.rejected,
      //   },
      // };
    } catch (error) {
      this.logger.error(
        `Failed to send email to ${to} | Subject: "${subject}" | Error: ${error.message}`,
        error.stack
      );
      console.error("Mailer Error:", error); // Add this for raw output
      // return {
      //   success: false,
      //   message: error.message,
      // };
    }
  }

  // async sendPushNotification(
  //   deviceToken: string,
  //   title: string,
  //   body: string,
  //   data?: any,
  // ) {
  //   try {
  //     const message: admin.messaging.Message = {
  //       notification: {
  //         title,
  //         body,
  //       },
  //       data: data || {},
  //       token: deviceToken,
  //     };

  //     const response = await admin.messaging().send(message);
  //     return {
  //       success: true,
  //       message: 'Push notification sent successfully',
  //       response,
  //     };
  //   } catch (error) {
  //     return { success: false, message: error.message };
  //   }
  // }
  async sendPushNotification(
    deviceToken: string,
    title: string,
    body: string,
    data?: Record<string, string>
  ) {
    try {
      const message: admin.messaging.Message = {
        token: deviceToken,

        notification: {
          title,
          body,
        },

        data: data || {},

        apns: {
          headers: {
            "apns-priority": "10", // High priority
          },
          payload: {
            aps: {
              alert: {
                title,
                body,
              },
              sound: "default",
              badge: 1,
              "content-available": 1, // Required for background notifications
            },
          },
        },
      };

      const response = await admin.messaging().send(message);

      return {
        success: true,
        message: "iOS push notification sent successfully",
        response,
      };
    } catch (error) {
      console.error("FCM Error:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async sendBulkPushNotification(
    deviceTokens: string[],
    title: string,
    body: string,
    data?: any
  ) {
    console.log(
      "=====>>>>>>>>deviceTokens",
      deviceTokens,
      "====>>>title",
      title,
      "===>>>body",
      body
    );
    try {
      const message: admin.messaging.MulticastMessage = {
        notification: {
          title,
          body,
        },
        data: data || {},
        tokens: deviceTokens,
      };

      const response = await admin.messaging().sendEachForMulticast(message);
      return {
        success: true,
        message: "Bulk push notifications sent successfully",
        response,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
