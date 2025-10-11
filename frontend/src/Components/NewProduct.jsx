import React from 'react';
import newProductImage from '../img/new-product.jpg';

const NewProduct = () => {
    return (
        <div className="container">
            <div className="row g-4">
                <div className="col-md-6">
                    <img src={newProductImage} className="img-fluid" alt="New Product" />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                    <div>
                        <p>Our Newest Product Offer</p>
                        <h1>Smart Ring</h1>
                        <small>Track your fitness journey effortlessly with the Smart Ring, a sleek wearable that combines style and health monitoring right on your fingertip.</small>
                        <br />
                        <form  method="GET">
                            <input type="hidden" name="product" value="Smart Ring" />
                            <input type="hidden" name="price" value="199.00" />
                            <input type="hidden" name="quantity" value="1" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewProduct;
