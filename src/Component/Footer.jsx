import React from 'react';
import { Link } from 'react-router-dom';
import './Css/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer-custom">
      <div className="container py-4 py-md-5">
        <div className="row">

          {/* Column 1: Brand Info */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="footer-heading"><a className='bites' href="/home">Delicious Bites</a></h5>
            <p className="footer-text">Fresh • Fast • Flavorful</p>
            <p className="footer-text mt-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> 
              365, Ameerpet, Hyderabad, Telangana - 500016
            </p>
            <p className="footer-text">
              <FontAwesomeIcon icon={faEnvelope} className="me-2" /> 
              rajnishrohit4742@gmail.com
            </p>
            <p className="footer-copyright mt-3">
              © {new Date().getFullYear()} Delicious Bites, Inc. All rights reserved.
            </p>
          </div>

          {/* Column 2: Useful Menu */}
          <div className="col-md-4 col-lg-4 mb-4 mb-md-0">
            <h6 className="footer-heading-small">Menu</h6>
            <ul className="list-unstyled">
              <li><Link to="/home" className="footer-link">Home</Link></li>
              <li><Link to="/veg" className="footer-link">Veg Items</Link></li>
              <li><Link to="/nonveg" className="footer-link">Non-Veg Items</Link></li>
              <li><Link to="/snack" className="footer-link">Snacks</Link></li>
              <li><Link to="/drink" className="footer-link">Drinks</Link></li>
              <li><Link to="/dessert" className="footer-link">Desserts</Link></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="col-md-4 col-lg-4">
            <h6 className="footer-heading-small">Follow Us</h6>
            <div className="d-flex mb-3">
              <a href="https://www.facebook.com/rajnish.rohit.1" className="footer-social-icon me-3"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="https://www.instagram.com/rajnish.rohitt?igsh=MWpncTV1c2tpY2psZA==" className="footer-social-icon me-3"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="https://x.com/RajnishRohit4?t=420tgSUao9dCt1uKxnmoHg&s=08" className="footer-social-icon me-3"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="https://github.com/rajnishrohit76-hub" className="footer-social-icon me-3"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="https://www.linkedin.com/in/rajnish-rohit-77457b286/" className="footer-social-icon"><FontAwesomeIcon icon={faLinkedin} /></a>


            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
