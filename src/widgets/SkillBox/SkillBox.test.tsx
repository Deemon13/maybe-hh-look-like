import { screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { Provider } from "react-redux";
import { setupStore } from "../../processes/redux/store/store";
import { render } from "../../processes/test-utils/render";

import { SkillBox } from "./SkillBox";

describe("SkillBox component", function () {
  it("should render component SkillBox", () => {
    render(
      <Provider store={setupStore}>
        <SkillBox />
      </Provider>
    );
    expect(screen.getByText(/Ключевые навыки/i));
    expect(screen.getByText(/TypeScript/i));
    expect(screen.getByText(/React/i));
    expect(screen.getByText(/Redux/i));
    expect(screen.findAllByPlaceholderText("Навык"));
    expect(screen.findAllByRole("button"));
  });
});
