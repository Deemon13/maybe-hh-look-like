import { useState } from "react";

import { Title, Button, Group, TextInput } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../processes/redux/hooks/redux";

import {
  setCurrentPage,
  inputSearchText,
} from "../../processes/redux/reducers/vacanciesSlice";

export const SearchBar = () => {
  const dispatch = useTypedDispatch();

  const searchText = useTypedSelector(
    (state) => state.vacanciesReducer.searchText
  );

  const [searchInput, setSearchInput] = useState(searchText);

  const handleClickOnSearch = () => {
    dispatch(inputSearchText(searchInput));
    dispatch(setCurrentPage(1));
  };

  return (
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
  );
};
