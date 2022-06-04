import { configureStore, combineReducers } from '@reduxjs/toolkit';
import sourceFileUploadSlice from './dashboard/fileupload/SourceFileUploadSlice';
import targetFileUploadSlice from './dashboard/fileupload/TargetFileUploadSlice';
import dashboardSlice from './dashboard/DashboardSlice';

const combinedReducer = combineReducers({
  sourceFileUpload: sourceFileUploadSlice,
  targetFileUpload: targetFileUploadSlice,
  dashboard: dashboardSlice
});

const rootReducer = (state, action) => {
  if (action.type === 'dashboard/resetDashboard') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
})