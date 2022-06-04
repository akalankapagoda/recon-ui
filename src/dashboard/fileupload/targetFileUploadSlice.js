/*
* Note that this is a duplicate of sourceFileUploadSlice.
* We need to use namespaces to differentiate statuses of similar components if we want to reuse the same component with redux.
*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { uploadFileAPI } from '../../api/ReconAPI';

export const uploadFile = createAsyncThunk(
  'targetFileUpload',
  async (file) => {
      const response = await uploadFileAPI(file.name, file);
      return response;
  }
)

export const targetFileUploadSlice = createSlice({
  name: 'targetFleUpload',
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

// Action creators are generated for each case reducer function
export const { targetFileUploadReducer, setFilename, updateUploadStatus } = targetFileUploadSlice.actions

export default targetFileUploadSlice.reducer