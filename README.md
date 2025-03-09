<p align="center">
  <h2 align="center">Claride</h2>
  <p align="center"><b>Advanced Smart Contract IDE for Clarity</b></p>
  <p align="center">A streamlined and intuitive integrated development environment (IDE) designed for developing, compiling, and deploying Clarity smart contracts seamlessly from the browser.</p>
</p>

## About Claride

Claride is an open-source Integrated Development Environment (IDE) specifically designed for Clarity smart contracts. It provides developers with a powerful and user-friendly platform for writing, compiling, and deploying contracts within the Clarity blockchain ecosystem. Claride seamlessly integrates with Clarity networks, enabling efficient contract management and testing. This repository serves as the home for Claride, supporting developers in their journey of smart contract development and deployment on Clarity.

## Documentation

To start using Claride, visit our [Documentation](https://docs.solide0x.tech/docs/ide/clarity-ide)


## Getting Started

To run Claride locally, follow these steps:

### Clone the Repository
First, clone the Claride repository to your local machine using Git:
```bash
git clone https://github.com/solide-project/claride
```

### Install Dependencies
Navigate into the cloned repository directory and install the required npm packages:
```bash
cd Claride
bun install
```

### Install Backend Compiler
Next, install rust and clarinet and all the backend dependency for interacting with Clarity
```bash
sudo apt install build-essential pkg-config libssl-dev

git clone https://github.com/hirosystems/clarinet.git
cd clarinet
cargo clarinet-install
```

### Configure Environment Variables
Create a `.env.local` file in the root directory of the project and use the following template to fill in the required variables:
```
PROJECT_PATH=
GITHUB_API_KEY=
```

### Running Claride
After configuring the environment variables, start the Claride IDE:
```bash
bun run start
```

This command will launch the Claride IDE in your default web browser.

## Contribution Guidelines

We welcome contributions from the community to enhance Claride further. If you have suggestions, bug reports, or want to contribute code, please follow our [Contribution Guidelines](link-to-contribution-guidelines).

## Community and Support

Join the Claride community for discussions, support, and collaboration. Visit our [Discord channel (Coming Soon)](#) to connect with fellow developers and enthusiasts.

## License

Claride is released under the [MIT License](link-to-license). Feel free to use, modify, and distribute Claride for your projects.

---

Note: Claride is a community-driven project aimed at fostering openness, collaboration, and innovation in the blockchain development domain. Your feedback and contributions are highly valued. Let's build the future of smart contract development together!

Support us by starring this Repository and following us on [X](https://twitter.com/0xProofofLearn)! 😊