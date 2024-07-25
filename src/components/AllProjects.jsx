import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const GitHubRepoCard = ({ repo }) => {
  return (
    <div className="github-repo-card col-6 RepoCard">
      <h2>{repo.name}</h2>
      <p>{repo.description}</p>
      <div className="details">
        <span className="mr-3">Stars: {repo.stargazers_count}</span>
        <span className="mr-3">Forks: {repo.forks_count}</span>
        <span className="mr-3">Language: {repo.language}</span>
      </div>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="VoGButton mt-2"
      >
        View on GitHub
      </a>
      <a
        href={`/projects/${repo.name}`}
        rel="noopener noreferrer"
        className="VoGButton mt-2"
      >
        Learn More
      </a>
    </div>
  );
};

export default function AllProjects(props) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/YashWadhvani/repos"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();

        setRepos(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepos();
  }, []);
  return (
    <>
      <h1 className="copyrightText" style={{ marginTop: "5rem" }}>
        Projects
      </h1>
      <Container className="darkBg RepoCards mt-2 ms-3">
        <Container className="repository-grid">
          {repos.map((repo) => (
            <GitHubRepoCard key={repo.id} repo={repo} />
          ))}
        </Container>
      </Container>
    </>
  );
}
