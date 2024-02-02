import React from "react";
import { Container, Button } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import HeroImage from "../assets/Code typing-bro.png";
import Resume from "../assets/YashWadhvani_Resume.pdf";

export default function Hero() {
  return (
    <>
      <Container className="heroContainer my-5">
        <Container className="heroTextCon my-auto px-0">
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
          <h4 className="heroText my-2">
            Currently Pursuing B. Tech. in Computer Science & Engineering
            (AI/ML).
          </h4>
          <Button
            className="m-4 downloadResumeButton"
            href={Resume}
            target="_blank"
            download="YashWadhvani_Resume"
          >
            Download Resume
          </Button>
        </Container>
        <Container className="heroImgCon px-0">
          <img src={HeroImage} alt="" width={"450px"} height={"450px"} />
        </Container>
      </Container>
    </>
  );
}
