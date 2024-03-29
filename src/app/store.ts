import {
  Action,
  combineReducers,
  configureStore,
  PreloadedState,
  ThunkAction,
} from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import { castMembersApiSlice } from "../features/cast-members/CastMemberSlice";
import { categoriesApiSlice } from "../features/categories/categorySlice";
import { genresApiSlice } from "../features/genres/GenreSlice";
import { uploadReducer } from "../features/uploads/UploadSlice";
import { videosApiSlice } from "../features/videos/VideoSlice";
import { uploadQueue } from "../middlewares/uploadQueue";
import { authSlice } from "../features/auth/authSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [categoriesApiSlice.reducerPath]: apiSlice.reducer,
  [castMembersApiSlice.reducerPath]: apiSlice.reducer,
  [genresApiSlice.reducerPath]: apiSlice.reducer,
  [videosApiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice.reducer,
  uploadSlice: uploadReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
        .prepend(uploadQueue.middleware)
        .concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
