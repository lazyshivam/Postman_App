import React from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../services/helper";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-semibold mb-4">Welcome to Postman</h1>
      <p className="text-gray-600 text-center mb-8">
        Explore APIs, save your favorites, and more. Login to access your saved
        API links.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/workspace"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Go to Workspace
        </Link>

        <a
          href={`${BASE_URL}/auth/google`}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
