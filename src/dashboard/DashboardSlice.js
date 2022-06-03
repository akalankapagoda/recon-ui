import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { reconAPI } from '../api/ReconAPI';

export const startReconciliation = createAsyncThunk(
    'reconRequest',
    async (filenames) => {
        const response = await reconAPI(filenames[0], filenames[1]);
        return response;
    }
  )

export const dashboardSlice = createSlice({
  name: 'sourceFileUpload',
  initialState: {
      filename: null,
      reconStatus : 'NONE',

  },
  reducers: {
    updateReconStatus: (state, action) => {
      state.reconStatus = action.payload
    },
  },
  extraReducers: {
    [startReconciliation.pending]: (state) => {
        state.reconStatus = 'SENDING';
    },
    [startReconciliation.fulfilled]: (state, { payload }) => {
      state.reconStatus = 'STARTED';
    },
    [startReconciliation.rejected]: (state) => {
        state.reconStatus = 'FAIL';
    },
  },
})

export const { dashboardReducer, updateReconStatus } = dashboardSlice.actions

export default dashboardSlice.reducer