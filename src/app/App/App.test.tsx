import { screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { Provider } from "react-redux";
import { setupStore } from "../../processes/redux/store/store";
import { render } from "../../processes/test-utils/render";

import { App } from "./App";

describe("App component", function () {
  it("should render component App", () => {
    render(
      <Provider store={setupStore}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Список вакансий/i));
  });
});
