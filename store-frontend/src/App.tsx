import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ProductsPage from './pages/ProductsPage'
import Register from './pages/Register'
import ProductDetails from './pages/ProductDetails'

function App() { // initial commit

  return (
    <>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
