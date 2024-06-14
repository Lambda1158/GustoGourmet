import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./footer.css";
export default function Footer() {
  return (
    <div className="pies">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.linkedin.com/in/bruno-herrera-aa10b6201/"
      >
        <FontAwesomeIcon icon={faLinkedin} className="linkedin" size="2x" />
      </a>

      <div className="footer-info">
        <p>© 2024 Bruno Javier Herrera</p>
      </div>

      <a target="_blank" rel="noreferrer" href="https://github.com/Lambda1158">
        <FontAwesomeIcon icon={faGithub} className="linkedin" size="2x" />
      </a>
    </div>
  );
}
