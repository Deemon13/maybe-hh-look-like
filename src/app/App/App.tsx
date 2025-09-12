import { useEffect } from "react";
import { Group, Pagination } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../processes/redux/hooks/redux";

import { fetchVacancies } from "../../processes/redux/reducers/VacanciesThunk";

import { setCurrentPage } from "../../processes/redux/reducers/vacanciesSlice";

import "./App.css";

export const App = () => {
  const dispatch = useTypedDispatch();

  const currentPage = useTypedSelector(
    (state) => state.vacanciesReducer.currentPage
  );
  const currentArea = useTypedSelector(
    (state) => state.vacanciesReducer.currentArea
  );
  const searchText = useTypedSelector(
    (state) => state.vacanciesReducer.searchText
  );

  const vacancies = useTypedSelector(
    (state) => state.vacanciesReducer.vacancies
  );

  const pages = useTypedSelector((state) => state.vacanciesReducer.pages);

  useEffect(() => {
    dispatch(
      fetchVacancies({ page: currentPage, text: searchText, area: currentArea })
    );
  }, [currentArea, currentPage, dispatch, searchText]);
  return (
    <div>
      <h1>Hello React + Vite + TS + Redux</h1>
      <ul>
        {vacancies.map((item) => {
          return (
            <li key={item.id}>
              {item.name}: {item.area.name}
            </li>
          );
        })}
      </ul>
      <Pagination.Root
        total={pages}
        onChange={(e) => dispatch(setCurrentPage(e))}
      >
        <Group gap={5} justify="center">
          <Pagination.First />
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
          <Pagination.Last />
        </Group>
      </Pagination.Root>
    </div>
  );
};
