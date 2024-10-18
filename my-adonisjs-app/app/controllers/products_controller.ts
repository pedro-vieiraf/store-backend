import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
import { error } from 'node:console'

export default class ProductsController {
  async index({ response }: HttpContext) {
    // return all products
    try {
      const products = await Product.query().select('name', 'price').orderBy('name', 'asc')

      return response.status(200).json(products)
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: err.message })
    }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const { name, price, stock, description } = request.body()
      if (!name || !price || !stock || !description) {
        return response.status(400).json({ error: 'All fields are required' })
      }

      await Product.create({ name, price, stock, description })

      return response.status(201)
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: err.message })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const { id } = params
      const product = await Product.query()
        .where('id', id)
        .select('name', 'price', 'stock', 'description')
        .first()

      if (!product) {
        return response.status(404).json({ error: 'Product not found' })
      }

      return response.status(200).json(product)
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: err.message })
    }
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      const data = request.only(['name', 'price', 'stock', 'description'])

      const product = await Product.find(id)
      if (!product) {
        return response.status(404).json({ error: 'Product not found' })
      }

      product.merge(data)
      await product.save()

      return response.status(200).json(product)
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: err.message })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
