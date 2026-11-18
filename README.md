# Yash Wadhvani's Portfolio

My Personal Portfolio

Deployment instructions, environment setup, Spotify configuration, contact delivery, and desktop presence setup are documented in [DEPLOYMENT.md](DEPLOYMENT.md).

# Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)
- [Code of Conduct](#code-of-conduct)
- [Reporting Issues](#reporting-issues)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

# Description

This is my personal portfolio website where I showcase my projects, skills, and experiences. The website is built using React, HTML, CSS, and JavaScript, and is designed to be responsive and user-friendly.

# Technologies Used

- React
- HTML5
- CSS3
- JavaScript (ES6)

# Features

- Responsive design
- Interactive elements
- Project showcases

# Installation

1. Clone the repository:
    ```
    git clone https://github.com/YashWadhvani/portfolio.git
    ```
2. Navigate to the project directory:
    ```
    cd portfolio
    ```
3. Install dependencies:
    ```
    npm install
    ```
4. Start the development server:
    ```
    npm start
    ```
5. Open your browser and go to `http://localhost:3000`

# Live desktop presence

The portfolio can display the active Windows application through the local desktop companion. It detects the foreground window (VS Code, Valorant, Spotify, Discord, browsers, and other apps) and publishes only a short activity label to the protected presence endpoint.

1. Set the same `PRESENCE_PUBLISH_TOKEN` in `.env.local` and your deployment environment.
2. Start the portfolio with `npm run dev`.
3. In a second terminal, run `npm run presence:companion`.

For a deployed site, set `PRESENCE_URL` to the deployed `/api/presence/publish` URL and configure `KV_REST_API_URL` plus `KV_REST_API_TOKEN` for Upstash Redis. Without Redis, presence is available while the same server process remains alive.

# Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

# License

This project is licensed under the [MIT License](LICENSE).

# Code of Conduct

Please review and adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) when participating in this project.

# Reporting Issues

If you find a bug or have a feature request, please open an [issue](https://github.com/YashWadhvani/portfolio/issues) with detailed information.

# Acknowledgements

- [React](https://reactjs.org/)
- [Create React App](https://create-react-app.dev/)
- Thanks to all contributors and open source libraries used in this project.

# Contact

For questions or feedback, please contact [yashwadhvani123@gmail.com](mailto:yashwadhvani123@gmail.com) or open an issue on GitHub.
