import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { uploadFileAPI } from '../../api/ReconAPI';

export const uploadFile = createAsyncThunk(
    'sourceFileUpload',
    async (file) => {
        const response = await uploadFileAPI('source', file);
        return response;
    }
  )

export const sourceFileUploadSlice = createSlice({
  name: 'sourceFileUpload',
  initialState: {
      uploadStatus : 'NONE'

  },
  reducers: {
  },
  extraReducers: {
    [uploadFile.pending]: (state) => {
        state.uploadStatus = 'PENDING';
    },
    [uploadFile.fulfilled]: (state, { payload }) => {
      state.uploadStatus = 'SUCCESS';
      state.entities = payload;
    },
    [uploadFile.rejected]: (state) => {
        state.uploadStatus = 'FAIL';
    },
  },
})

// Action creators are generated for each case reducer function
export const { sourceFileUploadReducer } = sourceFileUploadSlice.actions

export default sourceFileUploadSlice.reducer