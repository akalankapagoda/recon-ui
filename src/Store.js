import { configureStore } from '@reduxjs/toolkit';
import sourceFileUploadSlice from './dashboard/fileupload/SourceFileUploadSlice';
import targetFileUploadSlice from './dashboard/fileupload/TargetFileUploadSlice';
import dashboardSlice from './dashboard/DashboardSlice';

export default configureStore({
  reducer: {
    sourceFileUpload: sourceFileUploadSlice,
    targetFileUpload: targetFileUploadSlice,
    dashboard: dashboardSlice
  },
})