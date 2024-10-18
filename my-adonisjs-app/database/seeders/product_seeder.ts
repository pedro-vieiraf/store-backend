import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Product.updateOrCreateMany(
      ['name', 'price', 'stock', 'description'],
      [
        {
          name: 'Product 1',
          price: 100,
          stock: 10,
          description: 'Description 1',
        },
        {
          name: 'Product 2',
          price: 550,
          stock: 23,
          description: 'Description 2',
        },
        {
          name: 'Product 3',
          price: 1500,
          stock: 30,
          description: 'Description 3',
        },
      ]
    )
  }
}
