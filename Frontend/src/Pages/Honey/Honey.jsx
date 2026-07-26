import React from 'react'
import HoneySection from '../../Component/HoneySection/HoneySection'
import AboutHoney from '../../Component/AboutHoney/AboutHoney'
import HoneyProducts from '../../Component/HoneyProducts/HoneyProducts'
import HoneyBenifits from '../../Component/HoneyBenifits/HoneyBenifits'
import HoneyTestimonial from '../../Component/HoneyTestimonial/HoneyTestimonial'

const Honey = () => {
  return (
    <div>
        <HoneySection />
        <AboutHoney />
        <HoneyProducts />
        <HoneyBenifits />
        <HoneyTestimonial />
    </div>
  )
}

export default Honey