import { Badge } from "@mantine/core";

import type { VacanciesType } from "../../../processes/redux/reducers/vacanciesSlice";

import styles from "./VacancyCard.module.css";

interface VacancyCardProps {
  item: VacanciesType;
}

const getWorkFormat = (data: [{ id: string }] | [] | null) => {
  if (data?.length === 0 || !data) {
    return null;
  }

  let workFormat = "";
  let color = "";

  return data.map((item) => {
    switch (item.id) {
      case "ON_SITE":
        workFormat = "Офис";
        color = "rgba(15, 15, 16, 0.5)";
        break;
      case "REMOTE":
        workFormat = "Можно удалённо";
        color = "#4263eb";
        break;
      case "FIELD_WORK":
        workFormat = "Разъездной";
        color = "rgba(15, 15, 16, 0.2)";
        break;
      case "HYBRID":
        workFormat = "Гибрид";
        color = "#0f0f10";
        break;

      default:
        break;
    }

    return (
      <Badge radius={2} color={color} key={item.id}>
        {workFormat}
      </Badge>
    );
  });
};

export const VacancyCard = ({ item }: VacancyCardProps) => {
  return (
    <li className={styles["vacancy-card__item"]}>
      <h2 className={styles["vacancy-card__title"]}>{item.name}</h2>
      <div className={styles["vacancy-card__salary-currency-experience"]}>
        <div className={styles["vacancy-card__salary-container"]}>
          <span className={styles["vacancy-card__salary"]}>
            {item.salary && item.salary.from}
          </span>{" "}
          -{" "}
          <span className={styles["vacancy-card__salary"]}>
            {item.salary && item.salary.to}
          </span>{" "}
          {item.salary && <span>{item.salary.currency}</span>}
        </div>
        <p className={styles["vacancy-card__experience"]}>
          {item.experience.name}
        </p>
      </div>

      <p className={styles["vacancy-card__employer"]}>{item.employer.name}</p>
      <div className={styles["vacancy-card__work-format"]}>
        {getWorkFormat(item.work_format)}
      </div>
      <p className={styles["vacancy-card__area"]}>{item.area.name}</p>
      <div className={styles["vacancy-card__actions"]}>
        <button
          type="button"
          className={styles["vacancy-card__action--showme"]}
        >
          Смотреть вакансию
        </button>
        <button
          type="button"
          className={styles["vacancy-card__action--respond"]}
        >
          Откликнуться
        </button>
      </div>
    </li>
  );
};
