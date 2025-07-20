import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faBluesky,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Footer.css";

function Footer() {
  return (
    <div data-testid="footer-container" className="footer-container">
      <footer className="footer">
        <div className="footer-columns">
          <div className="column-one">
            <div className="logo">
              <div className="logo-icon">
                <span className="logo-w">W</span>
                <span className="logo-s">S</span>
              </div>
              <p className="brand-name">weathersasa</p>
            </div>

            <p className="brand-slogan">next-generation weather intelligence</p>
            <div className="brand-social-icons">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="xTwitter"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://bluesky.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Threads"
              >
                <FontAwesomeIcon icon={faBluesky} />
              </a>
            </div>
          </div>
          <div className="column-two">
            <div className="column-three">
              <p className="footer-column-heading">Products & Services</p>

              <p className="footer-column-option">For Business</p>
              <p className="footer-column-option">For Partners</p>
              <p className="footer-column-option">For Advertising</p>
              <p className="footer-column-option">Premium Subscription</p>
              <p className="footer-column-option">Professional Subscription</p>
            </div>

            <div className="column-four">
              <p className="footer-column-heading">More</p>
              <p className="footer-column-option">Warnings</p>
              <p className="footer-column-option">Severe Weather</p>
              <p className="footer-column-option">Sports</p>
              <p className="footer-column-option">Travel</p>
              <p className="footer-column-option">Space and Astronomy</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-trademark">
            {" "}
            &copy; 2025 weathersasa, Inc. "weathersasa" and the logo design are
            registered trademarks of weathersasa. All Rights Reserved.{" "}
          </div>
          <div className="footer-bottom-links">
            <span>Terms of Use</span>|<span>Privacy Policy</span>|
            <span>Cookie Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
