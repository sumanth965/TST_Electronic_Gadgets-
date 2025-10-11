import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import img from '../img/product-1.jpg'
import Categories from './Categories';
import productinfo from './ProductInfo'


function AllProducts() {
  console.log('AllProducts component rendered');
  return (
    <>
      <Nav />
      <div id='container'>
        <div id='product-list'>
          <ul id='category-list'>
            <Link id='link-category'>
              <a href={productinfo} target='frame'>
                <li className="list-group-item">

                  <img src={img} alt="" id='product-img-list' />All Products
                </li>
              </a>
            </Link>

            <Link id='link-category'>
              <li className="list-group-item"> <img src={img} alt="" id='product-img-list' />Deals of the Day</li>
            </Link>

            <Link id='link-category'>
              <li className="list-group-item"> <img src={img} alt="" id='product-img-list' />Mobiles</li>
            </Link>

            <Link id='link-category'>
              <li className="list-group-item"> <img src={img} alt="" id='product-img-list' />Laptops</li>
            </Link>

            <Link id='link-category'>
              <li className="list-group-item"> <img src={img} alt="" id='product-img-list' />Desktops</li>
            </Link>

            <Link id='link-category'>
              <li className="list-group-item"> <img src={img} alt="" id='product-img-list' />Home Appliances</li>
            </Link>

            <Link id='link-category'>
              <li className="list-group-item"> <img src={img} alt="" id='product-img-list' />TV</li>
            </Link>

            <Link id='link-category'>
              <li className="list-group-item">TV</li>
            </Link>

            <Link id='link-category'>
              <li className="list-group-item">TV</li>
            </Link>

            <Link id='link-category'>
              <li className="list-group-item">TV</li>
            </Link>


          </ul>
        </div>
        <div id='product-content'>

          <Categories />
        </div>
      </div>
    </>
  );
}

export default AllProducts;
