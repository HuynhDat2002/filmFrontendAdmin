'use client'

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as movieService from './movie.service'
import * as commentService from './comment.service'

export const getCommentByFilm = createAsyncThunk(
    "comment/getcommentbyfilm",

    async (data:{filmId:string},thunkAPI) => {
      try {
        return await commentService.getCommentByFilm(data);
      } catch (error) {
        throw thunkAPI.rejectWithValue(error);
      }
    }
  );


 


const initialState={
    comments: {
      message:"",
      status:200,
      metadata:[]
    },
    comment: {
      message:"",
      status:200,
      metadata:{}
    },
   
    isError: false,
    isLoading: false,
    isSuccess: false,
    isGetCommentByFilm:false,
    message: {}||"",
}


export const resetState = createAction("Reset_all");

export const comment = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCommentByFilm.pending, (state) => {
          state.isLoading = true;
          state.isGetCommentByFilm=false
        })
        .addCase(getCommentByFilm.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.isGetCommentByFilm=true
          state.comments = action.payload;
        })
        .addCase(getCommentByFilm.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.isGetCommentByFilm=true
          state.message = action.payload as any;
        })
        

       
    },
  });

export default comment.reducer