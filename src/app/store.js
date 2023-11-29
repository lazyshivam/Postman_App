import { configureStore } from '@reduxjs/toolkit';
import tabsReducer from '../services/tabsSlice';


export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    
  },
});
