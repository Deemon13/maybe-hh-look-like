import { useCallback, useEffect, useState } from "react";
import {
  Title,
  Group,
  Pagination,
  ActionIcon,
  TextInput,
  Pill,
  InputBase,
} from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../processes/redux/hooks/redux";

import { fetchVacancies } from "../../processes/redux/reducers/VacanciesThunk";

import {
  setCurrentPage,
  addSkill,
  removeSkill,
} from "../../processes/redux/reducers/vacanciesSlice";

import "./App.css";

export const App = () => {
  const [skillInput, setSkillInput] = useState("");

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

  const addSkillPill = useCallback(() => {
    dispatch(addSkill(skillInput.trim()));
    setSkillInput("");
  }, [dispatch, skillInput]);

  const skillPills = skills.map((pill) => (
    <Pill
      key={pill}
      withRemoveButton
      onRemove={() => dispatch(removeSkill(pill))}
    >
      {pill}
    </Pill>
  ));

  useEffect(() => {
    const searchSkills = skills.join(" AND ");
    const searchParams = `${searchSkills}`;

    dispatch(
      fetchVacancies({
        page: currentPage,
        text: searchParams,
        area: currentArea,
      })
    );
  }, [currentArea, currentPage, dispatch, searchText, skills]);

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
