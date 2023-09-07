import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerBg}>
      <small className={styles.footerText}>
      Designed and developed by Helen Mariño 2023
      </small>
    </footer>
  );
};

export default Footer;
