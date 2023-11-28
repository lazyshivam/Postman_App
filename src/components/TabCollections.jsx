// TabCollections.js
import React from "react";
import APITab from "./APITab";
import { useSelector, useDispatch } from "react-redux";
import {
  addTab,
  removeTab,
  switchTab,
  selectTabs,
  selectActiveTab,
} from "../services/tabsSlice";
const TabCollections = () => {
  const dispatch = useDispatch();
  const tabs = useSelector(selectTabs);
  const activeTab = useSelector(selectActiveTab);

  const handleAddTab = () => {
    dispatch(addTab());
  };

  const handleRemoveTab = (tabId) => {
    dispatch(removeTab(tabId));
  };

  const handleSwitchTab = (index) => {
    dispatch(switchTab(index));
  };
  return (
    <div className="m-4 h-screen">
      <div className="flex mb-4">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="mr-2">
            <button
              className={`bg-blue-500 text-white p-2 rounded-md ${
                activeTab === index ? "bg-blue-700" : ""
              }`}
              onClick={() => handleSwitchTab(index)}
            >
              Tab {tab.id}
            </button>
          </div>
        ))}
        <button
          className="bg-green-500 text-white p-2 rounded-md"
          onClick={handleAddTab}
        >
          +
        </button>
      </div>

      {tabs.length === 0 ? (
        <div className="text-center text-gray-500">
          No tabs open. Click the '+' button to add a new tab.
        </div>
      ) : (
        tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`tab-content ${index === activeTab ? "" : "hidden"}`}
          >
            <APITab onClose={() => handleRemoveTab(tabs[activeTab].id)} />
          </div>
        ))
      )}
    </div>
  );
};

export default TabCollections;
