// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function Project() {
//   const [repos, setRepos] = useState([]);

//   const { id } = useParams();

//   useEffect(() => {
//     const fetchRepos = async () => {
//       try {
//         const response = await fetch(
//           "https://api.github.com/users/YashWadhvani/repos"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch repositories");
//         }
//         const data = await response.json();

//         setRepos(data);
//       } catch (error) {
//         console.error("Error fetching repositories:", error);
//       }
//     };

//     fetchRepos();
//   }, []);

//   return (
//     <>
//       {/* <h1 style={{ color: "white", marginTop: "5rem" }}>{capitalize(id)}</h1> */}
//       {repos.map((repo) => (
//         <>
//           <h1>{repo.name}</h1>
//           <h2>{repo.description}</h2>
//           <ul>
//             {repo.topics.map((topic, index) => (
//               <li
//                 key={index}
//                 style={{
//                   backgroundColor: "white",
//                   display: "inline",
//                   padding: "0.5rem",
//                   margin: "0.5rem",
//                   borderRadius: "15px",
//                   fontSize: "0.75rem",
//                 }}
//               >
//                 {topic.toUpperCase()}
//               </li>
//             ))}
//           </ul>
//         </>
//       ))}
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Project() {
  const [repo, setRepo] = useState(null);
  const { id } = useParams(); // This will capture 'JavaProgramsSem4'

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/YashWadhvani/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repository");
        }
        const data = await response.json();
        setRepo(data);
      } catch (error) {
        console.error("Error fetching repository:", error);
      }
    };

    fetchRepo();
  }, [id]);

  if (!repo) return <p>Loading...</p>;

  return (
    <div style={{ padding: "5rem", backgroundColor: "transparent" }}>
      <h1 style={{ color: "#fff" }}>{repo.name}</h1>
      <p style={{ color: "#fff" }}>{repo.description}</p>
      <div>
        <h3 style={{ color: "#fff" }}>Technologies Used:</h3>
        <ul>
          {repo.topics && repo.topics.length > 0 ? (
            repo.topics.map((topic, index) => (
              <li
                key={index}
                style={{
                  display: "inline-block",
                  backgroundColor: "#e0e0e0",
                  padding: "0.5rem 1rem",
                  margin: "0.5rem",
                  borderRadius: "15px",
                  fontSize: "0.9rem",
                }}
              >
                {topic.toUpperCase()}
              </li>
            ))
          ) : (
            <li>No technologies listed</li>
          )}
        </ul>
      </div>
      {repo.homepage && (
        <div style={{ color: "#fff" }}>
          <h3>Live Preview</h3>
          <a href={repo.homepage} target="_blank" rel="noreferrer">
            Click Here!
          </a>
        </div>
      )}
    </div>
  );
}
