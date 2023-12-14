import React from "react";
import { Container } from "react-bootstrap";
import Typewriter from "typewriter-effect";

export default function Hero() {
  return (
    <>
      <Container className="heroContainer">
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
      </Container>
    </>
  );
}
