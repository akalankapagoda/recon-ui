/*
* Note that this is a duplicate of sourceFileUploadSlice.
* We need to use namespaces to differentiate statuses of similar components if we want to reuse the same component with redux.
*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { uploadFileAPI } from '../../api/ReconAPI';

export const uploadFile = createAsyncThunk(
    'targetFleUpload',
    async (file) => {
      const response = await uploadFileAPI('source', file);
      return response;
    }
  )

export const targetFileUploadSlice = createSlice({
  name: 'targetFleUpload',
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
export const { targetFileUploadReducer } = targetFileUploadSlice.actions

export default targetFileUploadSlice.reducer