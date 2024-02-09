import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from 'axios';

interface IPlatform extends Identifiable {
  name: string;
}

interface ICreatePlatform extends ErrorHandlers {
  name: string;
}

interface IUpdatePlatform extends Identifiable, ErrorHandlers {
  name: string;
}

interface IDeletePlatform extends Identifiable, ErrorHandlers {}

interface PlatformState {
  platforms: IPlatform[];
}

const initialState: PlatformState = {
  platforms: [],
}

export const PlatformSlice = createSlice({
  name: 'platform',
  initialState,
  reducers: {
    setPlatforms: (state, action: PayloadAction<IPlatform[]>) => {
      state.platforms = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createPlatform.fulfilled, (state, action) => {});
    builder.addCase(createPlatform.rejected, (state, action) => {});
  },
})

export const createPlatform = createAsyncThunk('/platforms', async (payload: ICreatePlatform, { dispatch }) => {
  const { name, onSuccess, onError } = payload;
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_api_url}/platforms`, { name });
    const { platform } = data;
    onSuccess && onSuccess({id: platform.id, name: platform.name});
  } catch (error) {
    console.log('log ~ createPlatform error', error);
    onError && onError();
  }
});

export const updatePlatform = createAsyncThunk('/platforms', async (payload: IUpdatePlatform, { dispatch }) => {
  const {id, name, onSuccess, onError } = payload;
  try {
    const response = await axios.put(`${process.env.REACT_APP_api_url}/platforms/${id}`, { name });
    const { platform } = response.data;
    onSuccess && onSuccess(platform);
  } catch (error) {
    console.log('log ~ updatePlatform error', error);
    onError && onError();
  }
});

export const deletePlatform = createAsyncThunk('/platforms', async (payload: IDeletePlatform, { dispatch }) => {
  const {id, onSuccess, onError } = payload;
  try {
    const response = await axios.delete(`${process.env.REACT_APP_api_url}/platforms/${id}`);
    const { platform } = response.data;
    onSuccess && onSuccess({id, ...platform});
  } catch (error) {
    console.log('log ~ deletePlatform error', error);
    onError && onError();
  }
});

export const getPlatforms = createAsyncThunk('/platforms', async (payload: ErrorHandlers, { dispatch }) => {
  const { onSuccess, onError } = payload;
  try {
    const response = await axios.get(`${process.env.REACT_APP_api_url}/platforms`);
    const { platforms } = response.data;
    const platformsArr = platforms.map((plat: IPlatform) => ({
      id: plat.id,
      name: plat.name
    }));
    dispatch(setPlatforms(platformsArr));
    onSuccess && onSuccess(platforms);
  } catch (error) {
    console.log('log ~ getPlatforms error', error);
    onError && onError();
  }
});


export const { setPlatforms } = PlatformSlice.actions

export const selectPlatform = (state: RootState) => state.platform.platforms;

export default PlatformSlice.reducer