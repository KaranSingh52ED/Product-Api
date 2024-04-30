import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProductList from './components/ProductList'
import ProductInfo from './components/ProductInfo'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductInfo />} />

      </Routes>
    </Router>
  )
}

export default App
