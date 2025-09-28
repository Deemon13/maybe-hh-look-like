import { fireEvent, screen } from "@testing-library/react";
import { expect, it, describe, beforeAll, vi } from "vitest";
import { Provider } from "react-redux";
import { setupStore } from "../../processes/redux/store/store";
import { render } from "../../processes/test-utils/render";

import { AreaSelect } from "./AreaSelect";
// import { Select } from "@mantine/core";

beforeAll(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});

describe("AreaSelect component", function () {
  const mockedAreaValue = "Москва";

  it("change area from selected option", () => {
    const dispatchSpy = vi.spyOn(setupStore, "dispatch");

    render(
      <Provider store={setupStore}>
        <AreaSelect />
      </Provider>
    );

    const selectArea = screen.getByRole("textbox");
    fireEvent.click(selectArea);
    fireEvent.click(screen.getByText(mockedAreaValue));

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "vacancies/selectArea",
      payload: mockedAreaValue,
    });
  });
});

// describe("", () => {
//   let mockedAreaValue: string | null = "Москва";
//   const mockClearArea = vi.fn(() => (mockedAreaValue = null));

//   //   const mockedAreaValue = "Москва";

//   it("", () => {
//     render(
//       <Provider store={setupStore}>
//         {/* <AreaSelect /> */}
//         <Select
//           onClear={mockClearArea}
//           data={["Все города", "Москва", "Санкт-Петербург"]}
//           defaultValue={mockedAreaValue}
//           clearable
//         />
//       </Provider>
//     );

//     // const clearButton = screen.getByText("Москва").previousElementSibling;
//     // clearButton?.addEventListener("click", mockClearArea);
//     // fireEvent.click(clearButton);
//     // // console.log(clearButton);

//     const selectArea = screen.getByRole("textbox");
//     fireEvent.click;
//     // expect(screen.getByText("Москва"));
//     // fireEvent(node: selectArea, event: onClear);
//   });
// });
