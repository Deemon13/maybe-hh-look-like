import { useCallback, useEffect, useState } from "react";

import {
  Title,
  Group,
  ActionIcon,
  TextInput,
  Pill,
  InputBase,
} from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../processes/redux/hooks/redux";

import {
  setCurrentPage,
  addSkill,
  removeSkill,
} from "../../processes/redux/reducers/vacanciesSlice";

export const SkillBox = () => {
  const dispatch = useTypedDispatch();

  const [skillInput, setSkillInput] = useState("");

  const skills = useTypedSelector((state) => state.vacanciesReducer.skill_set);

  const addSkillPill = useCallback(() => {
    dispatch(addSkill(skillInput.trim()));
    setSkillInput("");
    dispatch(setCurrentPage(1));
  }, [dispatch, skillInput]);

  useEffect(() => {
    const onEnter = (evt: { code: string }) => {
      if (!skillInput) {
        return;
      }

      if (evt.code === "Enter" || evt.code === "NumpadEnter") {
        addSkillPill();
      }
    };

    document.addEventListener("keydown", onEnter);
    return () => document.removeEventListener("keydown", onEnter);
  }, [addSkillPill, skillInput]);

  const handleClickOnAddSkill = () => {
    if (!skillInput) {
      return;
    }
    addSkillPill();
  };

  const skillPills = skills.map((pill) => (
    <Pill
      key={pill}
      withRemoveButton
      onRemove={() => {
        dispatch(setCurrentPage(1));
        dispatch(removeSkill(pill));
      }}
    >
      {pill}
    </Pill>
  ));

  return (
    <div>
      <Title>Ключевые навыки</Title>
      <Group>
        <TextInput
          placeholder="Навык"
          size="sm"
          value={skillInput}
          onChange={(evt) => setSkillInput(evt.currentTarget.value)}
        />
        <ActionIcon
          size="input-sm"
          variant="default"
          aria-label="ActionIcon the same size as inputs"
          onClick={handleClickOnAddSkill}
        >
          +
        </ActionIcon>
      </Group>
      <InputBase component="div" multiline>
        <Pill.Group>{skillPills}</Pill.Group>
      </InputBase>
    </div>
  );
};
