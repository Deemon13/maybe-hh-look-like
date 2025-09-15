import { useEffect, useState } from "react";
import { AppShell, Group, Pagination, Select } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../processes/redux/hooks/redux";

import { fetchVacancies } from "../../processes/redux/reducers/VacanciesThunk";

import {
  setCurrentPage,
  selectArea,
} from "../../processes/redux/reducers/vacanciesSlice";

import { Header, SearchBar, SkillBox } from "../../widgets";

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

  const [areaInput, setAreaInput] = useState(currentArea);

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
  }, [areaInput, currentArea, currentPage, dispatch, searchText, skills]);

  const handleSelectArea = (evt: string | null) => {
    dispatch(selectArea(evt));
    setAreaInput(evt);
  };

  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <Header />

      <AppShell.Main className={styles.main}>
        <SearchBar />

        <SkillBox />

        <div>
          <Select
            data={["Все города", "Москва", "Санкт-Петербург"]}
            leftSectionPointerEvents="none"
            leftSection={"@"}
            value={areaInput}
            onOptionSubmit={handleSelectArea}
            onClear={() => handleSelectArea(null)}
            placeholder="Все города"
            clearable
          />
        </div>

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
