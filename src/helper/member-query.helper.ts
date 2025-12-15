import { Types } from 'mongoose';
import  moment from 'moment';

export const buildMemberQuery = (
  userId: string,
  search?: string,
  filterType?: string,
  startDate?: string,
  endDate?: string,
  paymentStatus?: string,
): Record<string, any> => {
  const userObjectId = new Types.ObjectId(userId);
  const query: any = { userId: userObjectId };
  
  // 🔍 Search filter
  if (search && search.trim() !== '') {
    const regex = new RegExp(search.trim(), 'i');
    query.$or = [{ memberName: regex }, { phoneNumber: regex }];
  }

  // 📅 Date filter
  let start: Date | undefined;
  let end: Date | undefined;

  if (filterType) {
    const today = moment().startOf('day');
    switch (filterType.toLowerCase()) {
      case 'today':
        start = today.toDate();
        end = moment(today).endOf('day').toDate();
        break;
      case 'week':
        start = moment().startOf('week').toDate();
        end = moment().endOf('week').toDate();
        break;
      case 'month':
        start = moment().startOf('month').toDate();
        end = moment().endOf('month').toDate();
        break;
      case 'year':
        start = moment().startOf('year').toDate();
        end = moment().endOf('year').toDate();
        break;
    }
  } else if (startDate && endDate) {
    start = new Date(startDate);
    end = new Date(endDate);
  }

  if (start && end) {
    query.createdAt = { $gte: start, $lte: end };
  }

  // 💰 Paid / Pending filter
  if (paymentStatus === 'paid') {
    query.paidAmount = { $gt: 0 };
  } else if (paymentStatus === 'pending') {
    query.pendingAmount = { $gt: 0 };
  }

  return query;
};
