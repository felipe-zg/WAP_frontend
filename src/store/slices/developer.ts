import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from 'axios';

interface IDeveloper {
  id: string;
  name: string;
}

interface ErrorHandlers {
  onSuccess?: (data: any) => void;
  onError?: () => void;
}

interface ICreateDeveloper {
  name: string;
  onSuccess?: (data: any) => void;
  onError?: () => void;
}

interface IUpdateDeveloper {
  id: string;
  name: string;
  onSuccess?: (data: any) => void;
  onError?: () => void;
}

interface IDeleteDeveloper {
  id: string;
  onSuccess?: (data: any) => void;
  onError?: () => void;
}

interface DeveloperState {
  developers: IDeveloper[];
}

const initialState: DeveloperState = {
  developers: [],
}

export const DeveloperSlice = createSlice({
  name: 'developer',
  initialState,
  reducers: {
    setDevelopers: (state, action: PayloadAction<IDeveloper[]>) => {
      state.developers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createDeveloper.fulfilled, (state, action) => {
    });
    builder.addCase(createDeveloper.rejected, (state, action) => {
      // Handle login failure if needed
    });
  },
})

export const createDeveloper = createAsyncThunk('/developers', async (payload: ICreateDeveloper, { dispatch }) => {
  const { name, onSuccess, onError } = payload;
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_api_url}/developers`, { name });
    const { developer } = data;
    onSuccess && onSuccess({id: developer.id, name: developer.name});
  } catch (error) {
    console.log('log ~ createDeveloper error', error);
    onError && onError();
  }
});

export const updateDeveloper = createAsyncThunk('/developers', async (payload: IUpdateDeveloper, { dispatch }) => {
  const {id, name, onSuccess, onError } = payload;
  try {
    const { data } = await axios.put(`${process.env.REACT_APP_api_url}/developers/${id}`, { name });
    const { developer } = data;
    onSuccess && onSuccess(developer);
  } catch (error) {
    console.log('log ~ updateDeveloper error', error);
    onError && onError();
  }
});

export const deleteDeveloper = createAsyncThunk('/developers', async (payload: IDeleteDeveloper, { dispatch }) => {
  const {id, onSuccess, onError } = payload;
  try {
    const { data } = await axios.delete(`${process.env.REACT_APP_api_url}/developers/${id}`);
    const { developer } = data;
    onSuccess && onSuccess({id, ...developer});
  } catch (error) {
    console.log('log ~ deleteDeveloper error', error);
    onError && onError();
  }
});

export const getDevelopers = createAsyncThunk('/developers', async (payload: ErrorHandlers, { dispatch }) => {
  const { onSuccess, onError } = payload;
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_api_url}/developers`);
    const developers = data.developers.map((developer: IDeveloper) => ({
      id: developer.id,
      name: developer.name
    }));
    dispatch(setDevelopers(developers));
    onSuccess && onSuccess(data.developers);
  } catch (error) {
    console.log('log ~ getDevelopers error', error);
    onError && onError();
  }
});


export const { setDevelopers } = DeveloperSlice.actions

export const selectDeveloper = (state: RootState) => state.developer.developers;

export default DeveloperSlice.reducer