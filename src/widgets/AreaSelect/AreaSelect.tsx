import { useState } from "react";
import { Select } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../processes/redux/hooks/redux";

import { selectArea } from "../../processes/redux/reducers/vacanciesSlice";

export const AreaSelect = () => {
  const dispatch = useTypedDispatch();

  const currentArea = useTypedSelector(
    (state) => state.vacanciesReducer.currentArea
  );

  const [areaInput, setAreaInput] = useState(currentArea);

  const handleSelectArea = (evt: string | null) => {
    dispatch(selectArea(evt));
    setAreaInput(evt);
  };

  return (
    <div>
      <Select
        data={["Все города", "Москва", "Санкт-Петербург"]}
        leftSectionPointerEvents="none"
        leftSection={"@"}
        value={areaInput}
        onOptionSubmit={handleSelectArea}
        onClear={() => handleSelectArea(null)}
        placeholder="Все города"
        clearable
      />
    </div>
  );
};
