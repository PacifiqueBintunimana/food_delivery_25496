/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import headerImage from "../assets/assets/image/food-background.jpg";
import logoImage from "../assets/assets/image/food-background.jpg";
import TopMealsCarousel from "./TopMealsCarousel";
import { useTranslation } from "react-i18next";
import i18n from '../i18n';

const Homepage1 = () => {
  const [language, setLanguage] = useState("en");
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { t } = useTranslation();
/*
  const styles = {
    languageSwitcher: {
      position: "absolute",
      top: "10px",
      right: "20px",
      display: "flex",
      gap: "10px",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#f8f9fa",
      border: "1px solid #ced4da",
      borderRadius: "5px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#e2e6ea",
    },
  };*/
  const styles = {
    navbar: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      background: "#ff5722",
      color: "#fff",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      position: "relative",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    logo: {
      height: "50px",
      width: "50px",
    },
    navLinks: {
      display: "flex",
      flexDirection: "row",
      gap: "1.5rem",
      listStyle: "none",
    },
    ul: {
      display: "flex",
      gap: "1.5rem",
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    link: {
      color: "#fff",
      textDecoration: "none",
    },
    hamburger: {
      display: "none",
      fontSize: "1.5rem",
      background: "none",
      border: "none",
      color: "#fff",
      cursor: "pointer",
    },
    languageSwitcher: {
      display: "flex",
      gap: "0.5rem",
    },
    button: {
      backgroundColor: "#fff",
      color: "#ff5722",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };
  
  // Media Query for Mobile
  const mobileStyles = `
    @media (max-width: 768px) {
      .nav-links {
        display: none;
        flex-direction: column;
        background-color: #ff5722;
        position: absolute;
        top: 60px;
        right: 10px;
        padding: 1rem;
        border-radius: 10px;
      }
      .nav-links ul {
        flex-direction: column;
        gap: 1rem;
      }
      .hamburger {
        display: block;
      }
    }
  `;
  
  // Injecting Media Query
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = mobileStyles;
  document.head.appendChild(styleSheet);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0, minHeight: "100vh" }}>
  {/* Navbar */}
  <nav style={styles.navbar}>
    <div style={styles.logoContainer}>
      <img src={logoImage} alt="Hub Logo" style={styles.logo} />
      <h2>FoodExPress</h2>
    </div>
    <div
      className="nav-links"
      style={styles.navLinks}
      id="nav-links"
    >
      <ul style={styles.ul}>
        <li>
          <Link to="/login" style={styles.link}>
            {t("navbar.sign")}
          </Link>
        </li>
        <li>
          <Link to="/register" style={styles.link}>
            {t("navbar.signup")}
          </Link>
        </li>
        <li>
          <a href="#" style={styles.link}>
            <i className="ri-twitter-fill"></i>
          </a>
        </li>
        <li>
          <a href="#" style={styles.link}>
            <i className="ri-facebook-circle-fill"></i>
          </a>
        </li>
        <li>
          <a href="#" style={styles.link}>
            <i className="ri-instagram-line"></i>
          </a>
        </li>
      </ul>
    </div>
    <button
      style={styles.hamburger}
      onClick={() => {
        const navLinks = document.getElementById("nav-links");
        navLinks.style.display =
          navLinks.style.display === "block" ? "none" : "block";
      }}
    >
      ☰
    </button>
    <div style={styles.languageSwitcher}>
      <button
        onClick={() => changeLanguage("en")}
        style={styles.button}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("fr")}
        style={styles.button}
      >
        Français
      </button>
    </div>
  </nav>


<div>
      {/* Main Content */}
      <header style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <img src={headerImage} alt="Header" style={{ width: "100%", borderRadius: "8px" }} />
        <h1>{t("home.hometitle")}</h1>
        <p>{t("home.dihomeunder")}</p>
      
           
      </header>
      <form style={{ marginTop: "2rem" }}>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#fff",
                  borderRadius: "5px",
                  padding: "0.5rem 1rem",
                }}
              >
                <span>
                  <i className="ri-search-line"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search for restaurant"
                  style={{
                    border: "none",
                    outline: "none",
                    paddingLeft: "10px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#fff",
                  borderRadius: "5px",
                  padding: "0.5rem 1rem",
                }}
              >
                <span>
                  <i className="ri-arrow-down-s-line"></i>
                </span>
                <input
                  type="text"
                  placeholder="Menu - Food Category"
                  style={{
                    border: "none",
                    outline: "none",
                    paddingLeft: "10px",
                  }}
                />
              </div>
            </div>
            <button 
              type="submit"
              style={{
                backgroundColor: "#ff5722",
                color: "#fff",
                padding: "0.7rem 1.5rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Search Now
            </button>
          </form>
      </div>

      
      {/* TopMealsCarousel */}
      <div>
        <TopMealsCarousel />
      </div>

      {/* Footer */}
      <footer
        style={{
          background: "#333",
          color: "#fff",
          padding: "2rem 1rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Contact Info */}
        <div style={{ flex: "1 1 30%" }}>
          <h3>{t("home.homenext")}</h3>
          <p>
            <i className="ri-mail-line" style={{ marginRight: "8px" }}></i>
            <a
              href="mailto:bintunimana.pacifique@gmail.com"
              style={{ color: "#ffa726", textDecoration: "none" }}
            >
              bintunimana.pacifique@gmail.com
            </a>
          </p>
          <p>
            <i className="ri-phone-line" style={{ marginRight: "8px" }}></i>
            <a href="tel:+25085363827" style={{ color: "#ffa726", textDecoration: "none" }}>
              +250 853 63827
            </a>
          </p>
        </div>

        {/* Social Media Links */}
        <div style={{ flex: "1 1 30%", textAlign: "center" }}>
          <h3>Follow Us</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <a href="#" style={{ color: "#fff", fontSize: "1.5rem" }}>
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a href="#" style={{ color: "#fff", fontSize: "1.5rem" }}>
              <i className="ri-twitter-fill"></i>
            </a>
            <a href="#" style={{ color: "#fff", fontSize: "1.5rem" }}>
              <i className="ri-instagram-line"></i>
            </a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div style={{ flex: "1 1 30%" }}>
          <h3>Stay Updated</h3>
          <form style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #fff",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#ffa726",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default Homepage1;
