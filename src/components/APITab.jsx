// APITab.js
import React from "react";
import APIRequestComponent from "./APIRequestComponent";

const APITab = ({ onClose,
  tabId,
  method,
  url,
  queryParams,
  jsonData,
  headers,
  response,
  loading,
  error,
  activeTab,
 
} ) => {
  console.log(activeTab,"link");
  return (
    <div className="p-4  pt-12">
      <APIRequestComponent 
      tabId={tabId}
      method={method}
      url={url}
      queryParams={queryParams}
      jsonData={jsonData}
      headers={headers}
      response={response}
      loading={loading}
      error={error}
      activeTab={activeTab}
       />
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
