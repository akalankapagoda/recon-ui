import { configureStore } from '@reduxjs/toolkit';
import sourceFileUploadSlice from './dashboard/fileupload/sourceFileUploadSlice';
import targetFileUploadSlice from './dashboard/fileupload/targetFileUploadSlice';

export default configureStore({
  reducer: {
    sourceFileUpload: sourceFileUploadSlice,
    targetFileUpload: targetFileUploadSlice
  },
})