'use client'

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as tvService from './tv.service'


export const getAllTV = createAsyncThunk(
    "tv/get-tvshows",

    async (_,thunkAPI) => {
      try {
        return await tvService.getAllTV();
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    }
  );


const initialState={
    tvs: {
      message:"",
      status:200,
      metadata:[]
    },
    tv: {
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

export const tv = createSlice({
    name: "tv",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllTV.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllTV.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.tvs = action.payload;
        })
        .addCase(getAllTV.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error.message as string;
        })
        
         .addCase(resetState, () => initialState);
    },
  });

export default tv.reducer