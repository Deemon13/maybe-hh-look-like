import styles from "./VacancyCard.module.css";

interface VacancyCardProps {
  item: {
    name: string;
    area: {
      name: string;
    };
    salary: {
      from?: number;
      to?: number;
      currency?: string;
    };
    experience: {
      name: string;
    };
    employer: {
      name: string;
    };
    schedule: {
      name: string;
    };
  };
}

export const VacancyCard = ({ item }: VacancyCardProps) => {
  return (
    <li className={styles["vacancy-card__item"]}>
      <p>{item.name}</p>
      <span>{item.salary && item.salary.from}</span> -{" "}
      <span>{item.salary && item.salary.to}</span>{" "}
      {item.salary && item.salary.currency}
      <p>{item.experience.name}</p>
      <p>{item.employer.name}</p>
      <p>{item.schedule.name} - ?</p>
      <p>{item.area.name}</p>
      <div>
        <button>Смотреть вакансию</button>
        <button>Откликнуться</button>
      </div>
    </li>
  );
};
