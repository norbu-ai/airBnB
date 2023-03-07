import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-left">
          © 2022 Yonder &nbsp;·&nbsp;
          <span>Achok Khenrap Yeshi&nbsp;</span>
        </div>

        <div className="footer-right">
          <span className="social-link">
            <a
              href="https://github.com/akyeshi"
              target="blank"
              style={{ textDecoration: "none" }}
            >
              &nbsp;<i className="fa-brands fa-github"></i>
              {/* &nbsp; Achok Khenrap Yeshi &nbsp; */}
              &nbsp; GitHub &nbsp;
            </a>
          </span>

          <span className="social-link">
            <a
              href="https://www.linkedin.com/in/akyeshi/"
              target="blank"
              style={{ textDecoration: "none" }}
            >
              <i className="fa-brands fa-linkedin"></i>
              &nbsp; LinkedIn &nbsp;
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
