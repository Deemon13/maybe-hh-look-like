import { createSlice } from "@reduxjs/toolkit";

import { fetchVacancies } from "./VacanciesThunk";

const initialState = {
  vacancies: [],
  responce: [],
  status: null,
  currentPage: 1,
  currentArea: null,
  searchText: "",
  pages: null,
};

export const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.status = false;
        state.responce = action.payload;
        state.vacancies = state.responce.items;
        state.pages = state.responce.pages -= 1;
      })
      .addCase(fetchVacancies.rejected, (state) => {
        state.status = false;
      });
  },
});

export const { setCurrentPage } = vacanciesSlice.actions;

export default vacanciesSlice.reducer;
