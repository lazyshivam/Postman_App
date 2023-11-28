import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded shadow-lg">
      <h1 className="text-4xl font-extrabold mb-4">About Our API Interaction Platform</h1>
      <p className="text-lg mb-6">
        Welcome to our API Interaction platform! We're dedicated to providing developers with
        a seamless experience for interacting with APIs. Whether you're building a web application,
        mobile app, or any other software, our platform is designed to simplify the process of
        testing, saving, and managing API links.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Key Features:</h2>
      <ul className="list-disc pl-6 text-lg mb-6">
        <li>Authentication to securely manage your data.</li>
        <li>Save and organize your favorite API links.</li>
        <li>Open multiple tabs and send requests simultaneously.</li>
        <li>Visualize API responses in an easily understandable format.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Get Started:</h2>
      <p className="text-lg mb-6">
        Start by registering or logging in to your account. Once logged in, you can explore the
        various features available on the platform. Don't forget to check out the Home page for
        managing your saved API links.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Happy Coding!</h2>
      <p className="text-lg">
        We hope our platform enhances your development workflow and makes working with APIs
        a delightful experience. If you have any questions or feedback, feel free to reach out
        to our support team.
      </p>

      <div className="mt-8">
        <Link to="/workspace" className="text-blue-500 hover:underline">
          Go to Workspace
        </Link>
      </div>
    </div>
  );
};

export default About;
