import React from 'react'
import MainAbout from '../../Component/MainAbout/MainAbout'
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb'
import OurStory from '../../Component/OurStory/OurStory'
import WhyChoose from '../../Component/WhyChoose/WhyChoose'

const About = () => {
  return (
    <div>
      <Breadcrumb />
        <MainAbout />
        <OurStory />
        <WhyChoose />
    </div>
  )
}

export default About