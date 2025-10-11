import React from 'react';


const Footer = () => {
  return (
    <footer>
      <div className="wrapper">
        <div className="links-container">
          <div className="links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          <div className="links">
            <h3>Course</h3>
            <ul>
              <li>
                <a href="#">Log In</a>
              </li>
              <li>
                <a href="#">Download</a>
              </li>
              <li>
                <a href="#">All Courses</a>
              </li>
            </ul>
          </div>

          <div className="links">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <a href="mailto:contact@email.com">tst.ele.gad@gmail.com</a>
              </li>
            </ul>


            <form action="#">
              <input type="text" placeholder="Email Address" />
              <button className="submit-btn">Subscribe</button>
            </form>
          </div>
        </div>
        <p className="copyright">This website is developed by TST Electronics 2021</p>
      </div>
    </footer>
  );
};

export default Footer;
