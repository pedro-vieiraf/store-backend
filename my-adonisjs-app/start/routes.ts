/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const CustomersController = () => import('#controllers/customers_controller')

router.on('/').render('pages/home')

router.get('customers', [CustomersController, 'index'])
router.get('customers/:id', [CustomersController, 'show'])
router.post('customers', [CustomersController, 'create'])
router.put('customers/:id', [CustomersController, 'update'])
