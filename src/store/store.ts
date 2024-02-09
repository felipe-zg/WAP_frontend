import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter';
import UserReducer from './slices/user';
import DeveloperReducer from './slices/developer';
import PublisherReducer from './slices/publisher';
import PlatformReducer from './slices/platform';
import GenreReducer from './slices/genre';
import GameReducer from './slices/game';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: UserReducer,
    developer: DeveloperReducer,
    publisher: PublisherReducer,
    platform: PlatformReducer,
    genre: GenreReducer,
    game: GameReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch