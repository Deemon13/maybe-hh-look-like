import { screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { Provider } from "react-redux";
import { setupStore } from "../../../processes/redux/store/store";
import { render } from "../../../processes/test-utils/render";
import type { VacanciesType } from "../../../processes/redux/reducers/vacanciesSlice";

import { VacancyCard } from "./VacancyCard";

describe("VacancyCard component", function () {
  const mockItem: VacanciesType = {
    id: "125512027",
    name: "Senior frontend developer",
    area: { id: "1", name: "Москва" },
    employer: {
      name: "Ozon",
    },
    experience: { id: "between3And6" },
    work_format: [{ id: " REMOTE" }],
    salary: {
      from: 4000,
      to: 4700,
      currency: "RUR",
    },
  };

  it("should render component VacancyCard", () => {
    render(
      <Provider store={setupStore}>
        <VacancyCard item={mockItem} />
      </Provider>
    );
    expect(screen.getByText(/Senior frontend developer/i));
    expect(screen.getByText(/Ozon/i));
    expect(screen.getByText(/Опыт 3-6 лет/i));
    expect(screen.getByText(/4000 - 4700 RUR/i));
    expect(screen.findAllByRole("button"));
  });
});
