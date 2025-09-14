import { useCallback, useEffect, useState } from "react";
import {
  Title,
  Button,
  Group,
  Pagination,
  ActionIcon,
  TextInput,
  Pill,
  InputBase,
  Select,
} from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../processes/redux/hooks/redux";

import { fetchVacancies } from "../../processes/redux/reducers/VacanciesThunk";

import {
  setCurrentPage,
  inputSearchText,
  addSkill,
  removeSkill,
  selectArea,
} from "../../processes/redux/reducers/vacanciesSlice";

import "./App.css";

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

  const [skillInput, setSkillInput] = useState("");
  const [areaInput, setAreaInput] = useState(currentArea);
  const [searchInput, setSearchInput] = useState(searchText);

  const addSkillPill = useCallback(() => {
    dispatch(addSkill(skillInput.trim()));
    setSkillInput("");
    dispatch(setCurrentPage(1));
  }, [dispatch, skillInput]);

  const skillPills = skills.map((pill) => (
    <Pill
      key={pill}
      withRemoveButton
      onRemove={() => {
        dispatch(setCurrentPage(1));
        dispatch(removeSkill(pill));
      }}
    >
      {pill}
    </Pill>
  ));

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

  useEffect(() => {
    const onEnter = (evt: { code: string }) => {
      if (!skillInput) {
        return;
      }

      if (evt.code === "Enter" || evt.code === "NumpadEnter") {
        addSkillPill();
      }
    };

    document.addEventListener("keydown", onEnter);
    return () => document.removeEventListener("keydown", onEnter);
  }, [addSkillPill, skillInput]);

  const handleClickOnAddSkill = () => {
    if (!skillInput) {
      return;
    }
    addSkillPill();
  };

  const handleSelectArea = (evt: string | null) => {
    dispatch(selectArea(evt));
    setAreaInput(evt);
  };

  const handleClickOnSearch = () => {
    dispatch(inputSearchText(searchInput));
  };

  return (
    <div>
      <h1>Hello React + Vite + TS + Redux</h1>

      <div>
        <Title>Список вакансий по профессии Frontend-разработчик</Title>
        <Group>
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={"&"}
            placeholder="Должность или название компании"
            value={searchInput}
            onChange={(evt) => setSearchInput(evt.currentTarget.value)}
          />
          <Button
            onClick={handleClickOnSearch}
            disabled={searchInput ? false : true}
          >
            Найти
          </Button>
        </Group>
      </div>

      <ul>
        {vacancies.map((item) => {
          return (
            <li key={item.id}>
              {item.name}: {item.area.name}
            </li>
          );
        })}
      </ul>

      <div>
        <Title>Ключевые навыки</Title>
        <Group>
          <TextInput
            placeholder="Навык"
            size="sm"
            value={skillInput}
            onChange={(evt) => setSkillInput(evt.currentTarget.value)}
          />
          <ActionIcon
            size="input-sm"
            variant="default"
            aria-label="ActionIcon the same size as inputs"
            onClick={handleClickOnAddSkill}
          >
            +
          </ActionIcon>
        </Group>
        <InputBase component="div" multiline>
          <Pill.Group>{skillPills}</Pill.Group>
        </InputBase>
      </div>

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
  );
};
