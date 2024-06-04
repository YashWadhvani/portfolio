import React from "react";
import { Container } from "react-bootstrap";

export default function Skills() {
  return (
    <>
      <Container>
        <h1 className="heroText" style={{ textAlign: "center" }}>
          Skills
        </h1>

        <Container className="SkillsContainer">
          <div className="heroText skillsTitleContainer">
            <h2>Front End Skills</h2>
          </div>
          <div className="skillsImgContainer">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain-wordmark.svg"
              alt="html5"
              className="skill"
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain-wordmark.svg"
              alt="css3"
              className="skill"
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original-wordmark.svg"
              alt="Bootstrap"
              className="skill"
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
              alt="javascript"
              className="skill"
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg"
              alt="reactjs"
              className="skill"
            />
          </div>
        </Container>

        <Container className="SkillsContainer">
          <div className="heroText skillsTitleContainer">
            <h2>Back End Skills</h2>
          </div>
          <div className="skillsImgContainer">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
              alt="javascript"
              className="skill"
            />

            {/* <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg"
              alt="expressjs"
              className="skill"
            /> */}

            <i className="devicon-express-original-wordmark skillIcon"></i>

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg"
              alt="nodejs"
              className="skill"
            />
          </div>
        </Container>

        <Container className="SkillsContainer">
          <div className="heroText skillsTitleContainer">
            <h2>Databases</h2>
          </div>
          <div className="skillsImgContainer">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-plain-wordmark.svg"
              alt="mongoDB"
              className="skill"
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg"
              alt="mysql"
              className="skill"
            />
          </div>
        </Container>

        <Container className="SkillsContainer">
          <div className="heroText skillsTitleContainer">
            <h2>Programming Languages</h2>
          </div>
          <div className="skillsImgContainer">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
              alt="C Language"
              className="skill"
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg"
              alt="java"
              className="skill"
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
              alt="javascript"
              className="skill"
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg"
              alt="python"
              className="skill"
            />
          </div>
        </Container>

        <Container className="SkillsContainer last">
          <div className="heroText skillsTitleContainer">
            <h2>Other Technologies</h2>
          </div>
          <div className="skillsImgContainer">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-plain-wordmark.svg"
              alt="git"
              className="skill"
            />

            {/* <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg"
              alt="github"
              className="skill"
            /> */}

            <i class="devicon-github-original-wordmark skillIcon"></i>

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
              alt="linux"
              className="skill"
            />

            {/* <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg"
              alt="markdown"
              className="skill"
            /> */}

            <i className="devicon-markdown-original skillIcon"></i>

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original-wordmark.svg"
              alt="vscode"
              className="skill"
            />
          </div>
        </Container>
      </Container>
    </>
  );
}
