import styles from "./VacancyCard.module.css";

interface VacancyCardProps {
  item: {
    name: string;
    area: {
      name: string;
    };
  };
}

export const VacancyCard = ({ item }: VacancyCardProps) => {
  return (
    <li className={styles["vacancy-card__item"]}>
      {item.name}: {item.area.name}
    </li>
  );
};
