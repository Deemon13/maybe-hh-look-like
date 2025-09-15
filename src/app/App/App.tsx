import { useEffect } from "react";
import { AppShell, Group, Pagination } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../processes/redux/hooks/redux";

import { fetchVacancies } from "../../processes/redux/reducers/VacanciesThunk";

import { setCurrentPage } from "../../processes/redux/reducers/vacanciesSlice";

import { Header, SearchBar, SkillBox, AreaSelect } from "../../widgets";

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
  const pages = useTypedSelector((state) => state.vacanciesReducer.pages);

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

        <SkillBox />

        <AreaSelect />

        <div>
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
            value={currentPage}
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
      </AppShell.Main>
    </AppShell>
  );
};
