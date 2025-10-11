import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reviewpage.css';
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer";

export default function ReviewContactPage() {
  // State for reviews
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reviews, setReviews] = useState(JSON.parse(localStorage.getItem('reviews')) || []);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // State for contact form
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Rating and editing states
  const [hoverRating, setHoverRating] = useState({});
  const [ratingData, setRatingData] = useState({
    quality: 0, price: 0, satisfaction: 0, delivery: 0, service: 0,
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    setReviews(JSON.parse(localStorage.getItem('reviews')) || []);
  }, []);

  const handleLinkClick = (e) => {
    e.preventDefault();
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingIndex(null);
  };

  const handleRating = (category, value) => {
    setRatingData({ ...ratingData, [category]: value });
    setHoverRating({ ...hoverRating, [category]: 0 });
  };

  const handleMouseOver = (category, value) => {
    setHoverRating({ ...hoverRating, [category]: value });
  };

  const validateForm = (name, email) => {
    const formErrors = {};
    if (!name) formErrors.name = "Name is required";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) formErrors.email = "Invalid email address";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const { name, email, review } = e.target;

    if (validateForm(name.value, email.value)) {
      const newReview = {
        name: name.value,
        email: email.value,
        review: review.value,
        ratings: ratingData,
        date: new Date().toISOString(),
      };

      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
      alert('Review submitted successfully!');
      closeForm();
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/contact', formData);
      alert('Thank you for Sending Email us!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Message failed', error);
      alert("Error submitting message");
    }
  };

  const handleContactChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredReviews = reviews.filter(review =>
    review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.review.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    return sortCriteria === 'highestRating'
      ? (b.ratings.quality + b.ratings.price + b.ratings.satisfaction + b.ratings.delivery + b.ratings.service) -
      (a.ratings.quality + a.ratings.price + a.ratings.satisfaction + a.ratings.delivery + a.ratings.service)
      : new Date(b.date) - new Date(a.date);
  });

  const paginatedReviews = sortedReviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage);
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);

  const clearReviews = () => {
    localStorage.removeItem('reviews');
    setReviews([]);
    alert('All reviews cleared!');
  };

  return (
    <>
      <Nav />
      <div className="container review_contact_page">
        <header className="text-center my-4">
          <center>
            <h1 style={{ paddingLeft: "250px" }}>Customer Reviews & Contact Us</h1>
          </center>
          {/* <button className="btn btn-danger" onClick={clearReviews}>Clear All Reviews</button> */}
        </header>

        <div className="review_section">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button className="btn btn-primary" onClick={handleLinkClick}>Rate and Review</button>
            <input
              className="form-control w-25"
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select className="form-select" value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="highestRating">Highest Rating</option>
            </select>
          </div>

          {isFormOpen && (
            <div className="review_form_container border p-3 mb-4">
              <button className="btn-close" onClick={closeForm}></button>
              <form onSubmit={handleReviewSubmit}>
                <input className="form-control mb-2" type="text" name="name" placeholder="Name" required />
                {errors.name && <span className="text-danger">{errors.name}</span>}

                <input className="form-control mb-2" type="email" name="email" placeholder="Email" required />
                {errors.email && <span className="text-danger">{errors.email}</span>}

                <textarea className="form-control mb-2" name="review" placeholder="Write your review..." rows="4" required></textarea>

                <div className="ratings mb-4">
                  {['Quality', 'Price', 'Satisfaction', 'Delivery', 'Service'].map((category) => (
                    <div key={category} className="mb-3">
                      <label className="d-block font-weight-bold">{category}</label>
                      <div className="star-rating d-flex justify-content-start align-items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`star fs-3 ${(hoverRating[category.toLowerCase()] || ratingData[category.toLowerCase()]) > i ? 'filled' : ''}`}
                            onMouseOver={() => handleMouseOver(category.toLowerCase(), i + 1)}
                            onMouseOut={() => setHoverRating({ ...hoverRating, [category.toLowerCase()]: 0 })}
                            onClick={() => handleRating(category.toLowerCase(), i + 1)}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-success" type="submit">Submit Review</button>
              </form>
            </div>
          )}

          <div className="reviews_list">
            {paginatedReviews.length ? (
              paginatedReviews.map((review, index) => (
                <div key={index} className="review_item border p-3 mb-4 text-gold ">
                  <h3 className="text-black mb-2">{review.name}</h3>
                  <p className="text-black mb-2">{review.review}</p>
                  {Object.entries(review.ratings).map(([category, rating]) => (
                    <div key={category} className="progress-container mb-3">
                      <label className="text-black d-block mb-1">{category.charAt(0).toUpperCase() + category.slice(1)}:</label>
                      <div className="progress">
                        <div
                          className="progress-bar bg-gold"
                          style={{ width: `${rating * 20}%` }}>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-gold">No reviews found.</p>
            )}
          </div>


          <div className="pagination my-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="contact_section mt-5">
          <h2>Contact Us</h2>
          <form onSubmit={handleContactSubmit}>
            <input className="form-control mb-2" type="text" name="name" value={formData.name} onChange={handleContactChange} placeholder="Your Name" required />
            <input className="form-control mb-2" type="email" name="email" value={formData.email} onChange={handleContactChange} placeholder="Your Email" required />
            <textarea className="form-control mb-2" name="message" value={formData.message} onChange={handleContactChange} placeholder="Your Email Message" rows="4" required></textarea>
            <button className="btn btn-primary" type="submit">Send Message</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
