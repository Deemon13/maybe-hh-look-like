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

import styles from "./SearchBar.module.css";

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
    <div className={styles["searchbar__container"]}>
      <div className={styles["searchbar__wrapper"]}>
        <Title className={styles["searchbar__title"]}>
          <span className={styles["searchbar__title--main"]}>
            Список вакансий
          </span>
          <span className={styles["searchbar__title--secondary"]}>
            по профессии Frontend-разработчик
          </span>
        </Title>
        <Group>
          <TextInput
            className={styles["searchbar__input"]}
            leftSectionPointerEvents="none"
            leftSection={"&"}
            placeholder="Должность или название компании"
            value={searchInput}
            onChange={(evt) => setSearchInput(evt.currentTarget.value)}
          />
          <Button
            className={styles["searchbar__btn"]}
            onClick={handleClickOnSearch}
            disabled={searchInput ? false : true}
          >
            Найти
          </Button>
        </Group>
      </div>
    </div>
  );
};
