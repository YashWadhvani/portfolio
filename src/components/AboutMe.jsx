import React from "react";
import { Container } from "react-bootstrap";
import YashImg from "../assets/YashBlob1.png";

export default function AboutMe() {
  return (
    <Container
      className="heroContainer"
      style={{ marginTop: "4rem", marginBottom: "4rem" }}
    >
      <Container className="heroImgCon my-2">
        <img src={YashImg} alt="Me" height={"450px"} width={"450px"} />
      </Container>
      <Container
        className="heroText heroTextCon my-5 px-0"
        style={{ fontSize: "1.25rem" }}
      >
        <p style={{ textAlign: "justify" }}>
          👋 Greetings! I'm <span className="dynamicText">Yash Wadhvani</span>,
          a passionate B.Tech student specializing in Artificial Intelligence
          and Machine Learning at Karnavati University.
        </p>
        <p style={{ textAlign: "justify" }}>
          With expertise in Python, MySQL, and the MERN Stack, I'm dedicated to
          shaping the future of technology. <br />
          Beyond coding, I find inspiration in music, gaming, and cricket,
          fueling my quest for continuous learning and collaboration.
          <br />
          🚀Let's connect and create a future where technology drives positive
          change!
        </p>
      </Container>
    </Container>
  );
}
