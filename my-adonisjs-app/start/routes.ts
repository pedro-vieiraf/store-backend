/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const SalesController = () => import('#controllers/sales_controller')
const CustomersController = () => import('#controllers/customers_controller')
const ProductsController = () => import('#controllers/products_controller')

router.on('/').render('pages/home')

// customers routes
router.get('customers', [CustomersController, 'index'])
router.get('customers/:id', [CustomersController, 'show'])
router.post('customers', [CustomersController, 'store'])
router.put('customers/:id', [CustomersController, 'update'])
router.delete('customers/:id', [CustomersController, 'destroy'])

// products routes
router.get('products', [ProductsController, 'index'])
router.get('products/:id', [ProductsController, 'show'])
router.post('products', [ProductsController, 'store'])
router.put('products/:id', [ProductsController, 'update'])
router.delete('products/:id', [ProductsController, 'destroy'])

// sales routes
router.post('sales', [SalesController, 'store'])
