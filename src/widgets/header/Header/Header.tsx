import { AppShell } from "@mantine/core";

import { Logo } from "../../../shared";

import styles from "./Header.module.css";

export const Header = () => {
  return (
    <AppShell.Header className={styles.header}>
      <Logo />

      <div>
        <ul>
          <li>
            <a href="#">Вакансии FE</a>
          </li>
          <li>
            <a href="#">Обо мне</a>
          </li>
        </ul>
      </div>
    </AppShell.Header>
  );
};
