import React from "react";
import { Container } from "react-bootstrap";
import {
  AiOutlineCopyrightCircle,
  AiFillFacebook,
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import Instagram from "../assets/instagram.png";

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
          <a
            href="https://twitter.com/yash_wadhvani"
            className="socials"
            target="blank"
          >
            <AiFillTwitterCircle color="#326ada" className="logos mx-2" />
          </a>
          <a
            href="https://www.facebook.com/yash.wadhvani.3"
            className="socials"
            target="blank"
          >
            <AiFillFacebook color="#3b5998" className="logos mx-2" />
          </a>
          <a
            href="https://wa.me/919904366478"
            className="socials"
            target="blank"
          >
            <AiOutlineWhatsApp color="#25d366" className="logos mx-2" />
          </a>
          <a
            href="https://www.instagram.com/yashwadhvani75"
            className="socials"
            target="blank"
          >
            <img
              src={Instagram}
              alt=""
              className="logos mx-2"
              height={"35px"}
            />
          </a>
        </Container>

        <Container className="copyrightText d-flex mx-auto justify-content-center my-1">
          <p className="mb-0">
            <span className="name">Yash Wadhvani</span>
            <br />
            Copyright
            <sup>
              <AiOutlineCopyrightCircle color="#676e77" fontSize={"15px"} />
            </sup>{" "}
            2023
            <br />
            All Rights Reserved.
          </p>
        </Container>
      </Container>
    </>
  );
}
