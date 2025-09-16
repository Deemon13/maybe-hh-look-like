import type { VacanciesType } from "../../processes/redux/reducers/vacanciesSlice";

import styles from "./VacanciesList.module.css";
interface ItemsProps {
  items: VacanciesType[];
}

export const VacanciesList = ({ items }: ItemsProps) => {
  return (
    <ul className={styles["vacancies-list"]}>
      {items.map((item) => {
        return (
          <li key={item.id}>
            {item.name}: {item.area.name}
          </li>
        );
      })}
    </ul>
  );
};
