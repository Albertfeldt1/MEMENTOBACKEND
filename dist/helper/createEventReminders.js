async;
createEventReminders(eventId, Types.ObjectId, userId, string, eventDate, Date, time, string);
{
    const eventDateTime = combineDateAndTime(eventDate, time);
    const now = new Date();
    const diff = eventDateTime.getTime() - now.getTime();
    const HOUR = 3600000;
    const DAY = HOUR * 24;
    const WEEK = DAY * 7;
    const MONTH = DAY * 30;
    const reminders = [];
    if (diff >= MONTH)
        reminders.push({ type: '1_month', fireAt: new Date(eventDateTime.getTime() - MONTH) });
    if (diff >= WEEK)
        reminders.push({ type: '1_week', fireAt: new Date(eventDateTime.getTime() - WEEK) });
    if (diff >= DAY)
        reminders.push({ type: '1_day', fireAt: new Date(eventDateTime.getTime() - DAY) });
    if (diff >= HOUR)
        reminders.push({ type: '1_hour', fireAt: new Date(eventDateTime.getTime() - HOUR) });
    if (reminders.length) {
        await this.reminderModel.insertMany(reminders.map(r => ({
            eventId,
            userId: new Types.ObjectId(userId),
            fireAt: r.fireAt,
            type: r.type,
        })));
    }
}
//# sourceMappingURL=createEventReminders.js.map