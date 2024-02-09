import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from 'axios';


interface IGame extends ErrorHandlers, Game {}

interface GameState {
  games: Game[];
}

const initialState: GameState = {
  games: [],
}

export const GameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createGame.fulfilled, (state, action) => {});
    builder.addCase(createGame.rejected, (state, action) => {});
  },
})

export const createGame = createAsyncThunk('/games', async (payload: Omit<IGame, 'id'>, { dispatch }) => {
  const { 
    title, 
    description, 
    price, 
    rating, 
    releaseDate,
    image,
    platform, 
    publisher, 
    developer, 
    genre, 
    onSuccess, 
    onError 
  } = payload;
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_api_url}/games`, { 
      title, 
      description, 
      price, 
      rating, 
      releaseDate,
      image,
      platform, 
      publisher, 
      developer, 
      genre,  
    });
    const { game } = data;
    onSuccess && onSuccess(game);
  } catch (error) {
    console.log('log ~ createGame error', error);
    onError && onError();
  }
});

export const updateGame = createAsyncThunk('/games', async (payload: IGame, { dispatch }) => {
  const { 
    id,
    title, 
    description, 
    price, 
    rating, 
    releaseDate,
    image,
    platform, 
    publisher, 
    developer, 
    genre, 
    onSuccess, 
    onError 
  } = payload;
  try {
    const { data } = await axios.put(`${process.env.REACT_APP_api_url}/games/${id}`, { 
      title, 
      description, 
      price, 
      rating, 
      releaseDate,
      image,
      platform, 
      publisher, 
      developer, 
      genre,  
    });
    const { game } = data;
    onSuccess && onSuccess(game);
  } catch (error) {
    console.log('log ~ updatePlatform error', error);
    onError && onError();
  }
});

export const deleteGame = createAsyncThunk('/games', async (payload: Pick<IGame, 'id' | 'onSuccess' | 'onError'>, { dispatch }) => {
  const {id, onSuccess, onError } = payload;
  try {
    const response = await axios.delete(`${process.env.REACT_APP_api_url}/games/${id}`);
    const { game } = response.data;
    onSuccess && onSuccess(game);
  } catch (error) {
    console.log('log ~ deletePlatform error', error);
    onError && onError();
  }
});

export const getGames = createAsyncThunk('/games', async (payload: ErrorHandlers, { dispatch }) => {
  const { onSuccess, onError } = payload;
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_api_url}/games`);
    const { games } = data;
    dispatch(setGames(games));
    onSuccess && onSuccess(games);
  } catch (error) {
    console.log('log ~ getGames error', error);
    onError && onError();
  }
});


export const { setGames } = GameSlice.actions

export const selectGames = (state: RootState) => state.game.games;

export default GameSlice.reducer