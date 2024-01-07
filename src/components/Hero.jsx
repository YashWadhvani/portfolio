import React from "react";
import { Container } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import Desk from "../assets/desk4.png";

export default function Hero() {
  return (
    <>
      <Container className="heroContainer my-5">
        <Container className="heroTextCon my-auto">
          <h2 className="heroText my-2">I'm&nbsp;</h2>
          <h2 className="heroText dynamicText my-2">
            <Typewriter
              options={{
                strings: [
                  "Yash Wadhvani.",
                  "a Programmer.",
                  "a Web Developer.",
                  "an App Developer.",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h2>
          <h4 className="heroText">
            Currently Pursuing B. Tech. in Computer Science & Engineering
            (AI/ML).
          </h4>
        </Container>
        <Container className="heroImgCon">
          <img src={Desk} alt="" width={"550px"} height={"450px"} />
        </Container>
      </Container>
    </>
  );
}
