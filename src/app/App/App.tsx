import { useEffect } from "react";
import { AppShell } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../processes/redux/hooks/redux";

import { fetchVacancies } from "../../processes/redux/reducers/VacanciesThunk";

import { VacanciesList } from "../../pages";

import {
  Header,
  SearchBar,
  SkillBox,
  AreaSelect,
  PaginationUI,
} from "../../widgets";

import styles from "./App.module.css";

export const App = () => {
  const dispatch = useTypedDispatch();

  const vacancies = useTypedSelector(
    (state) => state.vacanciesReducer.vacancies
  );

  const currentPage = useTypedSelector(
    (state) => state.vacanciesReducer.currentPage
  );
  const currentArea = useTypedSelector(
    (state) => state.vacanciesReducer.currentArea
  );
  const searchText = useTypedSelector(
    (state) => state.vacanciesReducer.searchText
  );
  const skills = useTypedSelector((state) => state.vacanciesReducer.skill_set);

  useEffect(() => {
    const searchSkills = skills.join(" AND ");
    const searchParams = searchText
      ? `${searchText} AND ${searchSkills}`
      : `${searchSkills}`;

    dispatch(
      fetchVacancies({
        page: currentPage,
        text: searchParams,
        area: currentArea,
      })
    );
  }, [currentArea, currentPage, dispatch, searchText, skills]);

  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <Header />

      <AppShell.Main className={styles.main}>
        <SearchBar />
        <div>
          <div>
            <SkillBox />

            <AreaSelect />
          </div>

          <div>
            <VacanciesList items={vacancies} />

            <PaginationUI />
          </div>
        </div>
      </AppShell.Main>
    </AppShell>
  );
};
