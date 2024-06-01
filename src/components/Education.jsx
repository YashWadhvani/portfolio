import React from "react";
import { Container } from "react-bootstrap";
// import KULogo from "../assets/Karnavati_University_logo.png";
import KULogo from "../assets/KarnavatiUniversity_Logo.png";
// import KULogo from "../assets/KULogo.png";
import DPSLogo from "../assets/dps_logo.png";

export default function Education() {
  return (
    <>
      <Container className="heroText" style={{ width: "max-content" }}>
        <h1 style={{ textAlign: "center" }}>Educational Qualifications</h1>
        <div className="timeline">
          <ul>
            <li>
              <div className="content">
                <h3>B. Tech. CSE (Specialization in AI/ML)</h3>
                <p>
                  Unitedworld Institute of Technology, Karnavati University.
                  <br />
                  <br />
                  <img
                    src={KULogo}
                    alt="ClgLogo"
                    style={{ width: "7rem", height: "7rem" }}
                  />
                </p>
              </div>
              <div className="time">
                <h4>2022 - 2026</h4>
              </div>
            </li>
            <li>
              <div className="content">
                <h3>Higher Secondary School</h3>
                <p>
                  Delhi Public School, Gandhinagar.
                  <br />
                  <br />
                  <img
                    src={DPSLogo}
                    alt="SchlLogo"
                    style={{
                      color: "white",
                      backgroundColor: "white",
                      width: "7rem",
                      height: "8rem",
                    }}
                  />
                </p>
              </div>
              <div className="time">2022</div>
            </li>
            <li style={{ height: "11rem" }}>
              <div className="content">
                <h3>Secondary School</h3>
                <p>
                  Delhi Public School, Rajkot.
                  <br />
                  <br />
                  <img
                    src={DPSLogo}
                    alt="SchlLogo"
                    style={{
                      color: "white",
                      backgroundColor: "white",
                      width: "7rem",
                      height: "8rem",
                    }}
                  />
                </p>
              </div>
              <div className="time">2020</div>
            </li>
            <div style={{ clear: "both", height: "0px" }}></div>
          </ul>
        </div>
      </Container>
      <br />
      <br />
    </>
  );
}
