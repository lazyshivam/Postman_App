// tabsSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load tabs state from local storage if available
const initialState = localStorage.getItem('tabsState')
  ? JSON.parse(localStorage.getItem('tabsState'))
  : {
      tabs: [],
      activeTab: 0,
    };

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    // for adding new tabs to tabsSlice
    addTab: (state) => {
      const newTab = {
        id: state.tabs.length + 1,
        data: {
          method: 'GET',
          url: '',
          queryParams: [{ key: '', value: '' }],
          jsonData: '',
          headers: [{ key: '', value: '' }],
          response: '',
          loading: false,
          error: null,
          activeTab: 'queryParams',
        },
      };
      state.tabs.push(newTab);
      state.activeTab = newTab.id-1;
      saveStateToLocalStorage(state);
    },
    // for removing new tabs
    removeTab: (state, action) => {
      state.tabs = state.tabs.filter((tab) => tab.id !== action.payload);
      state.activeTab = state.tabs.length >0 ? state.tabs[0].id : null;
      saveStateToLocalStorage(state);
    },
    //for switching the tabs
    switchTab: (state, action) => {
      state.activeTab = action.payload;
      saveStateToLocalStorage(state);
    },
    // Additional reducers for updating tab-specific data
    updateTabData: (state, action) => {
      const { tabId, data } = action.payload;
      const tab = state.tabs.find((tab) => tab.id === tabId);
      if (tab) {
        tab.data = { ...tab.data, ...data };
        saveStateToLocalStorage(state);
      }
    },
  },
});

// Helper function to save state to local storage
const saveStateToLocalStorage = (state) => {
  localStorage.setItem('tabsState', JSON.stringify(state));
};

export const { addTab, removeTab, switchTab, updateTabData } = tabsSlice.actions;
export const selectTabs = (state) => state.tabs.tabs;
export const selectActiveTab = (state) => state.tabs.activeTab;

export default tabsSlice.reducer;
