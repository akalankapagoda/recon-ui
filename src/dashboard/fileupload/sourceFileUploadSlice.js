import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { uploadFileAPI } from '../../api/ReconAPI';

export const uploadFile = createAsyncThunk(
    'sourceFileUpload',
    async (file) => {
        const response = await uploadFileAPI(file.name, file);
        return response;
    }
  )

export const sourceFileUploadSlice = createSlice({
  name: 'sourceFileUpload',
  initialState: {
      filename: null,
      uploadStatus : 'NONE',

  },
  reducers: {
    setFilename: (state, action) => {
      state.filename = action.payload
    },
    updateUploadStatus: (state, action) => {
      state.uploadStatus = action.payload
    },
  },
  extraReducers: {
    [uploadFile.pending]: (state) => {
        state.uploadStatus = 'UPLOADING';
    },
    [uploadFile.fulfilled]: (state, { payload }) => {
      state.uploadStatus = 'UPLOADED';
    },
    [uploadFile.rejected]: (state) => {
        state.uploadStatus = 'ERROR';
    },
  },
})

export const { sourceFileUploadReducer, setFilename, updateUploadStatus } = sourceFileUploadSlice.actions

export default sourceFileUploadSlice.reducer