import Address from '#models/address'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Address.updateOrCreateMany(
      ['country', 'state', 'city', 'street', 'number'],
      [
        {
          country: 'Brasil',
          state: 'São Paulo',
          city: 'São Paulo',
          street: 'Rua SP',
          number: 123,
        },
        {
          country: 'Brasil',
          state: 'Rio de Janeiro',
          city: 'Rio de Janeiro',
          street: 'Rua RJ',
          number: 456,
        },
        {
          country: 'Brasil',
          state: 'Minas Gerais',
          city: 'Belo Horizonte',
          street: 'Rua MG',
          number: 789,
        },
        {
          country: 'Brasil',
          state: 'Paraná',
          city: 'Curitiba',
          street: 'Rua PR',
          number: 1011,
        },
      ]
    )
  }
}
