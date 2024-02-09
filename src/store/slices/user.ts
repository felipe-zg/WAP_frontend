import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from 'axios';
import { redirect } from 'react-router-dom';

interface ILogin {
  email: string;
  password: string;
  rememberme: boolean;
  onSuccess?(data: any): void;
  onError?(): void;
}

interface User {
  name: string;
  username: string;
  email: string;
  isAuthenticated?: boolean;
  role?: 'admin' | 'user';
}

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    name: '',
    username: '',
    email: '',
    isAuthenticated: false,
    role: undefined,
  }
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        name: '',
        username: '',
        email: '',
        isAuthenticated: false,
        role: undefined,
      };
      localStorage.removeItem('token');
      redirect('/login');
    },
    signup: (state, action: PayloadAction<Omit<User, 'isAuthenticated' | 'role'>>) => {
      state.user = {...action.payload, isAuthenticated: true, role: 'user'};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {});
    builder.addCase(login.rejected, (state, action) => { });
  },
})

export const login = createAsyncThunk('user/login', async (payload: ILogin, { dispatch }) => {
  const { email, password, rememberme, onSuccess, onError } = payload;
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_api_url}/auth/login`, { email, password });
    const { token, user } = data;
    dispatch(setUser({
      name: user.name,
      username: user.username,
      email: user.email,
      isAuthenticated: true,
      role: user.role,
    }));
    rememberme && localStorage.setItem('token', token);
    onSuccess && onSuccess(user);
  } catch (error) {
    onError && onError();
  }
});


export const { logout, signup, setUser } = UserSlice.actions

export const selectUser = (state: RootState) => state.counter.value

export default UserSlice.reducer