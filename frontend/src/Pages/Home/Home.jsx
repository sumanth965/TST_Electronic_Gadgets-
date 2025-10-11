import React from 'react';
import Nav from '../../Components/Nav/Nav';
import Carousel from '../../Components/Carousel/Carousel';
import FeaturedProducts from '../../Components/FeaturedProducts/FeaturedProducts';
import Footer from '../../Components/Footer';
import HomeSlider from '../../Components/HomeSlider/HomeSlider';

export default function Home() {
  return (
    <div>
      {/* <Nav /> */}
      <br></br>
      <br />
      <Carousel />
      {/* <HomeSlider /> */}
      <FeaturedProducts />
      <Footer />
    </div>
  )
}
