// APITab.js
import React from "react";
import APIRequestComponent from "./APIRequestComponent";

const APITab = ({ onClose }) => {
  return (
    <div className="p-4 pt-12">
      <APIRequestComponent />
      <button
        className="bg-red-500 hover:bg-red-600 font-semibold text-white p-2 rounded-md mt-4"
        onClick={onClose}
      >
        Close Tab
      </button>
    </div>
  );
};

export default APITab;
