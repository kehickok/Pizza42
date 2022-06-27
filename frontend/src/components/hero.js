import React from "react";

const logo = "https://static.vecteezy.com/system/resources/previews/004/595/230/original/single-slice-italian-pizza-cartoon-flat-illustration-isolated-in-white-background-vector.jpg";

const Hero = () => (
  <div className="text-center hero">
    <img className="mb-3 app-logo" src={logo} alt="Pizza 42 logo" width="120" />
    <h1 className="mb-4">Pizza 42 Ordering App</h1>
    <p className="lead">
      This is a sample application that demonstrates an online ordering application for a pizza company. {" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://auth0.com/docs/quickstart/spa/react"
      >
        React
      </a>
    </p>
  </div>
);

export default Hero;
