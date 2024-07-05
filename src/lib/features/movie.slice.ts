'use client'

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as movieService from './movie.service'


export const getMovies = createAsyncThunk(
    "movie/get-movies",

    async (_,thunkAPI) => {
      try {
        console.log('hiiii')
        return await movieService.getMovies();
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    }
  );


const initialState={
    movies: {
      message:"",
      status:200,
      metadata:[]
    },
    movie: {
      message:"",
      status:200,
      metadata:{}
    },
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    
}



export const resetState = createAction("Reset_all");

export const movie = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getMovies.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getMovies.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.movies = action.payload;
        })
        .addCase(getMovies.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error.message as string;
        })
        
         .addCase(resetState, () => initialState);
    },
  });

export default movie.reducer