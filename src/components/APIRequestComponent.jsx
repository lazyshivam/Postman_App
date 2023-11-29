import React, { useState } from "react";
import axios from "axios";
import { updateTabData } from "../services/tabsSlice";
import { useDispatch } from "react-redux";

const APIRequestComponent = ({
  method: tabMethod,
  url: tabUrl,
  queryParams: tabQueryParams,
  jsonData: tabJsonData,
  headers: tabHeaders,
  response: tabResponse,
  loading: tabLoading,
  error: tabError,
  activeTab: tabActiveTab,
  tabId,
}) => {
  const dispatch = useDispatch();
  // State for managing form inputs
  const [method, setMethod] = useState(tabMethod);
  const [url, setUrl] = useState(tabUrl);
  const [queryParams, setQueryParams] = useState(tabQueryParams);
  const [jsonData, setJsonData] = useState(tabJsonData);
  const [headers, setHeaders] = useState(tabHeaders);

  // State for managing API response
  const [response, setResponse] = useState(tabResponse);
  const [loading, setLoading] = useState(tabLoading);
  const [error, setError] = useState(tabError);

  // State for managing tabs
  const [activeTab, setActiveTab] = useState(tabActiveTab);

  // Function to handle the API request
  const handleSend = async () => {
    try {
      setLoading(true);
      setError(null);
      const startTime = performance.now();
      // Prepare the request configuration based on the selected method
      const config = {
        method,
        url,
        params: {}, // Initialize an empty object for params
        headers: {}, // Initialize an empty object for headers
        data: {}, // Initialize an empty object for data
      };

      // Populate params if there are query parameters
      if (queryParams.length > 0) {
        const paramsObject = {};
        queryParams.forEach((param) => {
          if (param.key && param.key.trim() !== "") {
            paramsObject[param.key] = param.value;
          }
        });
        config.params = paramsObject;
      }

      // Populate data if there is JSON data
      if (jsonData.length > 0 && jsonData.trim() !== "") {
        config.data = JSON.parse(jsonData);
        console.log(JSON.parse(jsonData));
      }

      // Populate headers if there are headers
      if (headers.length > 0) {
        const headersObject = {};
        headers.forEach((header) => {
          if (header.key && header.key.trim() !== "") {
            headersObject[header.key] = header.value;
          }
        });
        config.headers = headersObject;
      }

      const apiResponse = await axios(config);
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(config);
      setResponse({ ...apiResponse, duration });
      dispatch(updateTabData({ tabId, data: { response: { ...apiResponse, duration } } }));
      dispatch(updateTabData({ tabId, data: { error:null} }))
    } catch (error) {
      setError(error);
      dispatch(updateTabData({ tabId, data: { error: error } }))
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new query parameter
  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: "", value: "" }]);
  };

  // Function to add a new header
  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  // Function to handle changes in a query parameter key or value
  const handleQueryParamChange = (index, field, newValue) => {
    const updatedQueryParams = [...queryParams];
    updatedQueryParams[index] = {
      ...updatedQueryParams[index],
      [field]: newValue,
    };
    setQueryParams(updatedQueryParams);
    dispatch(
      updateTabData({ tabId, data: { queryParams: updatedQueryParams } })
    );
  };

  // Function to handle changes in a header key or value
  const handleHeaderChange = (index, field, newValue) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = {
      ...updatedHeaders[index],
      [field]: newValue,
    };
    setHeaders(updatedHeaders);
    dispatch(updateTabData({ tabId, data: { headers: updatedHeaders } }));
  };

  // Function to handle changes in method
  const handleMethodChange = (newValue) => {
    setMethod(newValue);
    dispatch(updateTabData({ tabId, data: { method: newValue } }));
  };

  // Function to handle changes in url
  const handleUrlChange = (newValue) => {
    setUrl(newValue);
    dispatch(updateTabData({ tabId, data: { url: newValue } }));
  };

  // Function to handle changes in jsonData
  const handleJsonDataChange = (newValue) => {
    setJsonData(newValue);
    dispatch(updateTabData({ tabId, data: { jsonData: newValue } }));
  };

  return (
    <div className="p-4 ">
      <div className="mb-4 flex flex-wrap  max-sm:flex-wrap ">
        <select
          className="border  focus:outline-none  focus:border-2  focus:border-gray-300 rounded-md p-2 mr-2"
          value={method}
          onChange={(e) => {
            handleMethodChange(e.target.value);
          }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input
          type="text"
          className="border w-96 focus:outline-none  focus:border-2  focus:border-gray-300 rounded-l-md p-2 flex-grow"
          placeholder="https://example.com/todos"
          value={url}
          onChange={(e) => {
            handleUrlChange(e.target.value);
          }}
        />
        <button
          className="bg-blue-500 rounded-r-md text-white p-2 px-3"
          onClick={handleSend}
        >
          Send
        </button>
      </div>

      {/* Tabs for Query Params, Headers, and JSON Body */}
      <div className="flex w-56 justify-start  mb-4">
        <button
          className={`flex-1 py-2 ${
            activeTab === "queryParams"
              ? "bg-blue-500 rounded-md text-white"
              : ""
          }`}
          onClick={() => setActiveTab("queryParams")}
        >
          Params
        </button>
        <button
          className={`flex-1 py-2 ${
            activeTab === "headers" ? "bg-blue-500 rounded-md text-white" : ""
          }`}
          onClick={() => setActiveTab("headers")}
        >
          Headers
        </button>
        <button
          className={`flex-1 py-2 ${
            activeTab === "jsonBody" ? "bg-blue-500 rounded-md text-white" : ""
          }`}
          onClick={() => setActiveTab("jsonBody")}
        >
          Body
        </button>
      </div>

      {/* Content based on the active tab */}
      {activeTab === "queryParams" && (
        <div className="border p-4 flex-1">
          <h3>Query Params</h3>

          {/* Render input fields for each query parameter */}
          {queryParams?.map((param, index) => (
            <div className="flex mb-2" key={index}>
              <input
                type="text"
                className="border focus:outline-none  focus:border-2  focus:border-gray-300 rounded-md w-20 p-2 mr-2"
                placeholder="Key"
                value={param.key}
                onChange={(e) =>
                  handleQueryParamChange(index, "key", e.target.value)
                }
              />
              <input
                type="text"
                className="border focus:outline-none  focus:border-2  focus:border-gray-300 rounded-md w-full p-2"
                placeholder="Value"
                value={param.value}
                onChange={(e) =>
                  handleQueryParamChange(index, "value", e.target.value)
                }
              />
              {/* Button to remove a query parameter */}
              <button
                className="border border-red-500 rounded-md hover:bg-red-500 hover:text-white text-red-500 p-2 ml-2"
                onClick={() => {
                  const updatedQueryParams = [...queryParams];
                  updatedQueryParams.splice(index, 1);
                  setQueryParams(updatedQueryParams);
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Button to add a new query parameter */}
          <button
            className="border border-green-500 rounded-md hover:bg-green-500 hover:text-white text-green-500 p-2"
            onClick={addQueryParam}
          >
            Add
          </button>
        </div>
      )}

      {activeTab === "headers" && (
        <div className="border p-4 flex-1">
          <h3>Headers</h3>

          {/* Render input fields for each header */}
          {headers?.map((header, index) => (
            <div className="flex mb-2" key={index}>
              <input
                type="text"
                className="border focus:outline-none  focus:border-2  focus:border-gray-300 w-20 rounded-md p-2 mr-2"
                placeholder="Key"
                value={header.key}
                onChange={(e) =>
                  handleHeaderChange(index, "key", e.target.value)
                }
              />
              <input
                type="text"
                className="border focus:outline-none  focus:border-2  focus:border-gray-300 rounded-md w-full p-2"
                placeholder="Value"
                value={header.value}
                onChange={(e) =>
                  handleHeaderChange(index, "value", e.target.value)
                }
              />
              {/* Button to remove a header */}
              <button
                className="border border-red-500 rounded-md hover:bg-red-500 hover:text-white text-red-500 p-2 ml-2"
                onClick={() => {
                  const updatedHeaders = [...headers];
                  updatedHeaders.splice(index, 1);
                  setHeaders(updatedHeaders);
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Button to add a new header */}
          <button
            className="border border-green-500 rounded-md hover:bg-green-500 hover:text-white text-green-500 p-2"
            onClick={addHeader}
          >
            Add
          </button>
        </div>
      )}

      {activeTab === "jsonBody" && (
        <div className="border p-4 flex-1">
          <h3>JSON Body</h3>
          <textarea
            rows={6}
            className="border focus:outline-none  focus:border-2  focus:border-gray-300 rounded-md p-2 w-full"
            placeholder='{"key": "value"}'
            value={jsonData}
            onChange={(e) => {
              handleJsonDataChange(e.target.value);
            }}
          />
        </div>
      )}

      {/* Response Section */}
      <div className="border p-4   bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">API Response</h3>

        {/* Show loading indicator */}
        {loading && <p className="text-blue-500">Loading...</p>}

        {/* Show error message if there's an error */}
        {error && <p className="text-red-500">Error: {error.message}</p>}

        {/* Show response data if available */}
        {response && (
          <div className="response-content  mt-4">
            <p className="text-sm text-gray-600">
              Status: {response.status} | Time: {response.duration}ms | Size:{" "}
              {(response.headers["content-length"] / 1024).toFixed(2)} kB
            </p>

            {/* Checking content type and render accordingly */}
            {response.headers["content-type"].includes("application/json") ? (
              <div className="mt-2 ">
                <h4 className="text-md font-semibold mb-1">JSON Response:</h4>
                <pre className="bg-gray-200 max-h-96 overflow-y-auto p-2 rounded">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            ) : response.headers["content-type"].includes("text/html") ? (
              <div className="mt-2">
                <h4 className="text-md font-semibold mb-1">HTML Response:</h4>
                {/* Render HTML using dangerouslySetInnerHTML */}
                <div
                  className="bg-gray-200 max-h-96 overflow-y-auto p-2 rounded"
                  dangerouslySetInnerHTML={{ __html: response.data }}
                ></div>
              </div>
            ) : (
              <div className="mt-2">
                <h4 className="text-md font-semibold mb-1">Other Response:</h4>
                <pre className="bg-gray-200 p-2 rounded">{response.data}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default APIRequestComponent;
