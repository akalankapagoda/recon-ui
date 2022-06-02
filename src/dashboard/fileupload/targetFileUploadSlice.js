import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const uploadFile = createAsyncThunk(
    'targetFleUpload',
    async (identifier, file, thunkAPI) => {
        alert(file);
    //   const response = await userAPI.fetchById(userId)
    //   return response.data
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