import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ProductsPage from './pages/ProductsPage'

function App() { // initial commit

  return (
    <>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<h1>Product Detail</h1>} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
