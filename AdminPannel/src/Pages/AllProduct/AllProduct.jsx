import React from 'react'
import AllProductHome from '../../Components/AllProductHome/AllProductHome'
import Product from '../../Components/Product/Product'
import TotalProduct from '../../Components/TotalProduct/TotalProduct'

const AllProduct = () => {
  return (
    <div>
        <AllProductHome/>
        <Product/>
        <TotalProduct/>
    </div>
  )
}

export default AllProduct