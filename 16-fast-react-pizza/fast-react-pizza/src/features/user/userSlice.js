import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function (_, thunkAPI) {
    try {
      // 1) We get the user's geolocation position
      const positionObj = await getPosition();
      console.log(positionObj);

      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
      const addressObj = await getAddress(position);
      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

      // 3) Then we return an object with the data that we are interested in
      return { position, address };
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  },
);

const initialState = {
  username: '',
  position: {},
  address: '',
  status: 'idle',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: {
    [fetchAddress.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchAddress.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.position = action.payload.position;
      state.address = action.payload.address;
    },
    [fetchAddress.rejected]: (state, action) => {
      console.log(action);
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const { updateName } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
