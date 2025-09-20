import { screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { Provider } from "react-redux";
import { setupStore } from "../../processes/redux/store/store";
import { render } from "../../processes/test-utils/render";

import { SearchBar } from "./SearchBar";

describe("SearchBar component", function () {
  it("should render component SearchBar", () => {
    render(
      <Provider store={setupStore}>
        <SearchBar />
      </Provider>
    );
    expect(screen.getByText(/Список вакансий/i));
    expect(screen.getByText(/по профессии Frontend-разработчик/i));
    expect(screen.findAllByPlaceholderText("Должность или название компании"));
  });
});
