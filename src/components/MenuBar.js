import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faUserCircle,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/MenuBar.css";

const MenuBar = () => {
  // State to manage the mobile menu open/close state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="menu-bar-container">
      <div className="menu-bar">
        <div className="menu-bar-left">
          <div className="logo">
            <span className="logo-w">W</span>
            <span className="logo-s">S</span>
          </div>
          <div className="sign-in">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="user-icon"
              size="xl"
            />
            <span>Sign in</span>
          </div>
          <div className="mobile-sign-in">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="user-icon"
              size="xl"
            />
          </div>
        </div>
        {/* Center logo for mobile */}
        <div className="center-mobile-logo">
          <div className="logo">
            <span className="logo-w">W</span>
            <span className="logo-s">S</span>
          </div>
        </div>
        <div className="menu-bar-right">
          <nav className="main-nav">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/visualizations">Visualizations</a>
              </li>
            </ul>
          </nav>
          <div className="social-icons">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} />
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
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <button
            className="hamburger-menu"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>
      <div
        className={`${mobileMenuOpen ? "mobile-menu-active" : "mobile-menu"}`}
      >
        <nav className="main-nav">
          <ul>
            <li>
              <a href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="/blog" onClick={() => setMobileMenuOpen(false)}>
                Blog
              </a>
            </li>
            <li>
              <a
                href="/visualizations"
                onClick={() => setMobileMenuOpen(false)}
              >
                Visualizations
              </a>
            </li>
          </ul>
        </nav>

        <div className="social-icons">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FontAwesomeIcon icon={faTwitter} />
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
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
