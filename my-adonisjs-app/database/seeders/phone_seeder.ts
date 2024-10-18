import Phone from '#models/phone'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Phone.updateOrCreateMany(
      ['customerId', 'phone'],
      [
        {
          customerId: 1,
          phone: 1234567890,
        },
        {
          customerId: 2,
          phone: 5987654321,
        },
        {
          customerId: 3,
          phone: 1231231231,
        },
      ]
    )
  }
}
