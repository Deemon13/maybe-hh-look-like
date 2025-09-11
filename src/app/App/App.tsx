import { useEffect } from "react";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../processes/redux/hooks/redux";

import { fetchVacancies } from "../../processes/redux/reducers/VacanciesThunk";

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
    </div>
  );
};
