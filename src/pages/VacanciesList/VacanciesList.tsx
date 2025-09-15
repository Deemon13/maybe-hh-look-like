import type { VacanciesType } from "../../processes/redux/reducers/vacanciesSlice";

interface ItemsProps {
  items: VacanciesType[];
}

export const VacanciesList = ({ items }: ItemsProps) => {
  return (
    <ul>
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
