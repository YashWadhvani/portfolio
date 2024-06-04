import React from "react";
import { Container } from "react-bootstrap";
import {
  AiOutlineCopyrightCircle,
  AiFillGithub,
  AiFillLinkedin,
} from "react-icons/ai";

export default function Footer() {
  return (
    <>
      <Container className="footer d-flex flex-column justify-content-center align-items-center my-1">
        <Container className="contactLinksBox mx-auto d-flex justify-content-center">
          <a
            href="https://github.com/YashWadhvani"
            className="socials"
            target="blank"
          >
            <AiFillGithub color="#fafbfc" className="logos mx-2" />
          </a>
          <a
            href="https://www.linkedin.com/in/yash-wadhvani"
            className="socials"
            target="blank"
          >
            <AiFillLinkedin color="#0077b5" className="logos mx-2" />
          </a>
        </Container>

        <Container className="copyrightText d-flex mx-auto justify-content-center my-2">
          <p className="mb-0">
            <span className="name">Yash Wadhvani</span>
            <br />
            Copyright
            <sup>
              <AiOutlineCopyrightCircle color="#676e77" fontSize={"15px"} />
            </sup>{" "}
            2024 All Rights Reserved.
          </p>
        </Container>
      </Container>
    </>
  );
}
