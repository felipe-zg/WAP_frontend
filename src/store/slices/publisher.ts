import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from 'axios';

interface IPublisher extends Identifiable {
  name: string;
}

interface ICreatePublisher extends ErrorHandlers {
  name: string;
}

interface IUpdatePublisher extends Identifiable, ErrorHandlers {
  name: string;
}

interface IDeletePublisher extends Identifiable, ErrorHandlers {}

interface PublisherState {
  publishers: IPublisher[];
}

const initialState: PublisherState = {
  publishers: [],
}

export const PublisherSlice = createSlice({
  name: 'publisher',
  initialState,
  reducers: {
    setPublishers: (state, action: PayloadAction<IPublisher[]>) => {
      state.publishers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createPublisher.fulfilled, (state, action) => {});
    builder.addCase(createPublisher.rejected, (state, action) => {});
  },
})

export const createPublisher = createAsyncThunk('/publishers', async (payload: ICreatePublisher, { dispatch }) => {
  const { name, onSuccess, onError } = payload;
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_api_url}/publishers`, { name });
    const { publisher } = data;
    onSuccess && onSuccess({id: publisher.id, name: publisher.name});
  } catch (error) {
    console.log('log ~ createPublisher error', error);
    onError && onError();
  }
});

export const updatePublisher = createAsyncThunk('/publishers', async (payload: IUpdatePublisher, { dispatch }) => {
  const {id, name, onSuccess, onError } = payload;
  try {
    const response = await axios.put(`${process.env.REACT_APP_api_url}/publishers/${id}`, { name });
    const { publisher } = response.data;
    onSuccess && onSuccess(publisher);
  } catch (error) {
    console.log('log ~ updatePublisher error', error);
    onError && onError();
  }
});

export const deletePublisher = createAsyncThunk('/publishers', async (payload: IDeletePublisher, { dispatch }) => {
  const {id, onSuccess, onError } = payload;
  try {
    const response = await axios.delete(`${process.env.REACT_APP_api_url}/publishers/${id}`);
    console.log('log ~ deletePublisher response', response);
    const { publisher } = response.data;
    onSuccess && onSuccess({id, ...publisher});
  } catch (error) {
    console.log('log ~ deletePublisher error', error);
    onError && onError();
  }
});

export const getPublishers = createAsyncThunk('/publishers', async (payload: ErrorHandlers, { dispatch }) => {
  const { onSuccess, onError } = payload;
  try {
    const response = await axios.get(`${process.env.REACT_APP_api_url}/publishers`);
    const { publishers } = response.data;
    const publisherArr = publishers.map((pub: IPublisher) => ({
      id: pub.id,
      name: pub.name
    }));
    dispatch(setPublishers(publisherArr));
    onSuccess && onSuccess(response.data);
  } catch (error) {
    console.log('log ~ getPublishers error', error);
    onError && onError();
  }
});


export const { setPublishers } = PublisherSlice.actions

export const selectPublisher = (state: RootState) => state.publisher.publishers;

export default PublisherSlice.reducer