import { createSlice } from '@reduxjs/toolkit';

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: {
    tabs: [{ id: 1 }],
    activeTab: 0,
  },
  reducers: {
    addTab: (state) => {
      const newTabId = state.tabs.length + 1;
      state.tabs.push({ id: newTabId });
      state.activeTab = state.tabs.length - 1;
    },
    removeTab: (state, action) => {
      state.tabs = state.tabs.filter((tab) => tab.id !== action.payload);
      state.activeTab = Math.max(0, state.activeTab - 1);
    },
    switchTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { addTab, removeTab, switchTab } = tabsSlice.actions;
export const selectTabs = (state) => state.tabs.tabs;
export const selectActiveTab = (state) => state.tabs.activeTab;

export default tabsSlice.reducer;
