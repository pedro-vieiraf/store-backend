import Customer from '#models/customer'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Customer.updateOrCreateMany(
      ['name', 'cpf'],
      [
        {
          name: 'John Doe',
          cpf: 12345678910,
        },
        {
          name: 'Jane Doe',
          cpf: 10987654321,
        },
        {
          name: 'Foo Bar',
          cpf: 12312312312,
        },
        {
          name: 'Baz Qux',
          cpf: 32132132132,
        },
      ]
    )
  }
}
