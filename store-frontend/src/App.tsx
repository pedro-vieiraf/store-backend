import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ProductsPage from './pages/ProductsPage'
import Register from './pages/Register'
import ProductDetails from './pages/ProductDetails'
import Header from './components/Header'
import ShoppingCart from './pages/ShoppingCart'

function App() { // initial commit

  const location = useLocation(); // Utilize useLocation para obter a rota atual // Verifique se a rota atual é /login ou /register 
  const showHeader = location.pathname !== '/' && location.pathname !== '/register'
  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
