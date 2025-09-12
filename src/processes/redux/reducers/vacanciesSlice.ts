import { createSlice } from "@reduxjs/toolkit";

import { fetchVacancies } from "./VacanciesThunk";

export interface VacanciesType {
  id: number;
  name: string;
  area: {
    name: string;
  };
}

interface VacanciesState {
  vacancies: VacanciesType[];
  //   responce: {
  //     items: VacanciesType[];
  //     pages: number;
  //   };
  status: null | boolean;
  currentPage: number;
  currentArea: null | string;
  searchText: string;
  pages: number;
}

const initialState: VacanciesState = {
  vacancies: [],
  //   responce: {},
  status: null,
  currentPage: 1,
  currentArea: null,
  searchText: "",
  pages: 0,
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
        const { items, pages }: { items: VacanciesType[]; pages: number } =
          action.payload;
        // state.responce = action.payload;
        state.vacancies = items;
        state.pages = pages - 1;
      })
      .addCase(fetchVacancies.rejected, (state) => {
        state.status = false;
      });
  },
});

export const { setCurrentPage } = vacanciesSlice.actions;

export default vacanciesSlice.reducer;
