import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from 'axios';

interface IGenre extends Identifiable {
  name: string;
}

interface ICreateGenre extends ErrorHandlers {
  name: string;
}

interface IUpdateGenre extends Identifiable, ErrorHandlers {
  name: string;
}

interface IDeleteGenre extends Identifiable, ErrorHandlers {}

interface GenreState {
  genres: IGenre[];
}

const initialState: GenreState = {
  genres: [],
}

export const GenreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<IGenre[]>) => {
      state.genres = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createGenre.fulfilled, (state, action) => {});
    builder.addCase(createGenre.rejected, (state, action) => {});
  },
})

export const createGenre = createAsyncThunk('/genres', async (payload: ICreateGenre, { dispatch }) => {
  const { name, onSuccess, onError } = payload;
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_api_url}/genres`, { name });
    const { genre } = data;
    onSuccess && onSuccess({id: genre.id, name: genre.name});
  } catch (error) {
    console.log('log ~ createGenre error', error);
    onError && onError();
  }
});

export const updateGenre = createAsyncThunk('/genres', async (payload: IUpdateGenre, { dispatch }) => {
  const {id, name, onSuccess, onError } = payload;
  try {
    const response = await axios.put(`${process.env.REACT_APP_api_url}/genres/${id}`, { name });
    const { genre } = response.data;
    onSuccess && onSuccess(genre);
  } catch (error) {
    console.log('log ~ updateGenre error', error);
    onError && onError();
  }
});

export const deleteGenre = createAsyncThunk('/genres', async (payload: IDeleteGenre, { dispatch }) => {
  const {id, onSuccess, onError } = payload;
  try {
    const response = await axios.delete(`${process.env.REACT_APP_api_url}/genres/${id}`);
    const { genre } = response.data;
    onSuccess && onSuccess({id, ...genre});
  } catch (error) {
    console.log('log ~ deleteGenre error', error);
    onError && onError();
  }
});

export const getGenres = createAsyncThunk('/genres', async (payload: ErrorHandlers, { dispatch }) => {
  const { onSuccess, onError } = payload;
  try {
    const response = await axios.get(`${process.env.REACT_APP_api_url}/genres`);
    const { genres } = response.data;
    const genresArr = genres.map((genre: IGenre) => ({
      id: genre.id,
      name: genre.name
    }));
    dispatch(setGenres(genresArr));
    onSuccess && onSuccess(genres);
  } catch (error) {
    console.log('log ~ getGenres error', error);
    onError && onError();
  }
});


export const { setGenres } = GenreSlice.actions

export const selectGenre = (state: RootState) => state.genre.genres;

export default GenreSlice.reducer