import type { HttpContext } from '@adonisjs/core/http'
import Customer from '#models/customer'
import Sale from '#models/sale'

export default class CustomersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    // return all customers
    try {
      const customers = await Customer.query().select('name', 'cpf').orderBy('id', 'asc')
      return response.status(200).json(customers)
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: err.message })
    }
  }
  /**
   * Display form to create a new record
   */
  async create({ request, response }: HttpContext) {
    try {
      const { name, cpf } = request.body()
      if (!name || !cpf) {
        return response.status(400).json({ error: 'Name and CPF are required' })
      }

      await Customer.create({ name, cpf })

      return response.status(201)
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return response.status(400).json({ error: 'CPF already registered' })
      }
      return response.status(500).json({ error: err.message })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      const month = request.input('month')
      const year = request.input('year')

      const customer = await Customer.find(id)
      if (!customer) {
        return response.status(404).json({ error: 'Customer not found' })
      }

      // get all sales for this customer
      const salesQuery = Sale.query()
        .where('customer_id', id)
        .preload('product')
        .orderBy('created_at', 'desc')

      // filtering by month and/or year
      if (month && year) {
        salesQuery.whereRaw('MONTH(created_at) = ? AND YEAR(created_at) = ?', [month, year])
      } else if (month) {
        salesQuery.whereRaw('MONTH(created_at) = ?', [month])
      } else if (year) {
        salesQuery.whereRaw('YEAR(created_at) = ?', [year])
      }

      // get the sales
      const sales = await salesQuery

      // format the sales data
      const filteredSales = sales.map((sale) => {
        return {
          id: sale.id,
          product: {
            name: sale.product.name,
            description: sale.product.description,
            price: sale.product.price,
            quantity: sale.quantity,
            finalPrice: sale.quantity * sale.unitPrice,
          },
        }
      })

      return response.status(200).json({
        customer: {
          id: customer.id,
          name: customer.name,
          cpf: customer.cpf,
        },
        sales: filteredSales,
      })
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
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
