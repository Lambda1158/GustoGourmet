import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import "./footer.css"
import { Link } from "react-router-dom";
export default function Footer() {

    return (
        <div className="pies">
            <div className="icon-conteiner" ><a target="_blank" href='https://www.linkedin.com/in/bruno-herrera-aa10b6201/'><FontAwesomeIcon icon={faLinkedin} className="linkedin" size="6x" /></a></div>
            <div className="footer-info">
                <p>this section is about me c:</p>
                <a target="_blank" href='https://www.linkedin.com/in/bruno-herrera-aa10b6201/'>my LinkedIn<FontAwesomeIcon icon={faLinkedin} className="linkedin" /></a>
                <br></br>
                <a target="_blank" href="https://github.com/Lambda1158">Github here<FontAwesomeIcon icon={faGithub} className="linkedin" /></a>
            </div>
            <div className="icon-conteiner" ><a target="_blank" href='https://github.com/Lambda1158'><FontAwesomeIcon icon={faGithub} className="linkedin" size="6x" /></a></div>
        </div>
    )
}