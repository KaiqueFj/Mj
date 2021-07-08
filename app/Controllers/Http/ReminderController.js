const Reminder = use('App/Models/Reminder')
'use strict'

class ReminderController {

    async ReminderCreator({ request, response }) {
        const Reminder_data = request.all();

        const { id } = request.only('id')
        const { hospital_name } = request.only('hospital_name');
        const { doctor_name } = request.only('doctor_name');
        const { specialty } = request.only('specialty');
        const { day } = request.only('day');
        const { schedule } = request.only('schedule');
        const { status } = request.only('status');

        const reminder = await Reminder.create(Reminder_data);

        await reminder.save()

        return response.status(201).send({ id, hospital_name, doctor_name, specialty, day, schedule, status });

    }

    async Reminder_show() {
        const reminder_show = Reminder.all()
        return reminder_show
      }
}

module.exports = ReminderController
