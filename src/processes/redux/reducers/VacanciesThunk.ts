import { createAsyncThunk } from "@reduxjs/toolkit";
import ky from "ky";

const url = "https://api.hh.ru/vacancies";

// const searchParams = new URLSearchParams({
//   industry: 7,
//   professional_role: 96,
// });

export const fetchVacancies = createAsyncThunk(
  "vacancies/fetchVacancies",
  async function ({ page = 0, text = "", area = null }) {
    try {
      const response = await ky.get(url, {
        searchParams: {
          industry: 7,
          professional_role: 96,
          page,
          per_page: 10,
          text,
          ...(area && { area }),
        },
      });

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
);
