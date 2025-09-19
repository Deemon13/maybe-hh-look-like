import type { VacanciesType } from "../../../processes/redux/reducers/vacanciesSlice";

import styles from "./VacancyCard.module.css";

interface VacancyCardProps {
  item: VacanciesType;
}

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
      <p className={styles["vacancy-card__schedule"]}>
        {item.schedule.name} - ?
      </p>
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
