import React from 'react'
import HeroCarousel from '../components/Carousel/HeroCarousel'
import FeaturedProduct from '../components/Product/FeaturedProduct'
import ProductCategory from '../components/Product/ProductCategory'

function HomePage() {
  return (
    <div>
      <HeroCarousel />
      <FeaturedProduct />
      <ProductCategory />
    </div>
  )
}

export default HomePage