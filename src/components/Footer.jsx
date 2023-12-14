import React from "react";
import { Container } from "react-bootstrap";
import {
  AiFillCopyrightCircle,
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
      <Container className="Footer d-flex flex-column justify-content-center align-items-center my-1">
        <Container className="contactLinksBox mx-auto d-flex justify-content-center">
          <AiFillGithub color="#fafbfc" className="logos mx-2" />
          <AiFillLinkedin color="#0077b5" className="logos mx-2" />
          <AiFillTwitterCircle color="#326ada" className="logos mx-2" />
          <AiFillFacebook color="#3b5998" className="logos mx-2" />
          <AiOutlineWhatsApp color="#25d366" className="logos mx-2" />
          <img src={Instagram} alt="" className="mx-2" height={"35px"} />
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
