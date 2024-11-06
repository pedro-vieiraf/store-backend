import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ProductsPage from './pages/ProductsPage'
import Register from './pages/Register'
import ProductDetails from './pages/ProductDetails'
import Header from './components/Header'
import ShoppingCart from './pages/ShoppingCart'
import Profile from './pages/Profile'

function App() {

  const location = useLocation();
  const showHeader = location.pathname !== '/' && location.pathname !== '/register'
  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
