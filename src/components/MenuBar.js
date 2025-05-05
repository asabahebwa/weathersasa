import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faThreads,
  faXTwitter,
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

  React.useEffect(() => {
    function handleResize() {
      setMobileMenuOpen(false);
    }

    window.addEventListener("resize", handleResize);
  });

  const toggleMobileMenu = () => {
    // setMobileMenuOpen(!mobileMenuOpen);
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
                <span>Home</span>
              </li>
              <li>
                <span>Blog</span>
              </li>
              <li>
                <span>Visualizations</span>
              </li>
              <li>
                <span>Contact</span>
              </li>
            </ul>
          </nav>
          <div className="social-icons">
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
              href="https://threads.net"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
            >
              <FontAwesomeIcon icon={faThreads} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="xTwitter"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
          </div>
          <div className="hamburger-menu-container" onClick={toggleMobileMenu}>
            <button className="hamburger-menu" aria-label="Toggle mobile menu">
              <FontAwesomeIcon icon={faBars} className="hamburger-icon" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${mobileMenuOpen ? "mobile-menu--active" : "mobile-menu"}`}
      >
        <div className="mobile-menu-nav">
          <nav>
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
              <li>
                <a href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div className="mobile-connect">
            Connect{" "}
            <span
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              {" "}
              <i className="arrow down"></i>
            </span>
          </div>
          <div className="mobile-social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <div className="mobile-social-icon">
                <div>Facebook</div>
                <div className="social-icon-logo">
                  <FontAwesomeIcon icon={faFacebook} />
                </div>
              </div>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <div className="mobile-social-icon">
                <div>Instagram</div>
                <div className="social-icon-logo">
                  <FontAwesomeIcon icon={faInstagram} />
                </div>
              </div>
            </a>
            <a
              href="https://threads.net"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
            >
              <div className="mobile-social-icon">
                <div>Threads</div>
                <div className="social-icon-logo">
                  <FontAwesomeIcon icon={faThreads} />
                </div>
              </div>
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="xTwitter"
            >
              <div className="mobile-social-icon">
                <div>X</div>
                <div className="social-icon-logo">
                  <FontAwesomeIcon icon={faXTwitter} />
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="mobile-menu-close" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faTimes} size="2xl" color="black" />
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
