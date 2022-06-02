import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const uploadFile = createAsyncThunk(
    'sourceFileUpload',
    async (identifier, file, thunkAPI) => {
        alert(file);
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