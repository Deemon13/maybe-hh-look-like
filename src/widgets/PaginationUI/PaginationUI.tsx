import { Group, Pagination } from "@mantine/core";

import {
  useTypedDispatch,
  useTypedSelector,
} from "../../processes/redux/hooks/redux";

import { setCurrentPage } from "../../processes/redux/reducers/vacanciesSlice";

export const PaginationUI = () => {
  const dispatch = useTypedDispatch();

  const currentPage = useTypedSelector(
    (state) => state.vacanciesReducer.currentPage
  );

  const pages = useTypedSelector((state) => state.vacanciesReducer.pages);

  return (
    <Pagination.Root
      total={pages}
      value={currentPage}
      onChange={(e) => dispatch(setCurrentPage(e))}
    >
      <Group gap={5} justify="center">
        <Pagination.First />
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
        <Pagination.Last />
      </Group>
    </Pagination.Root>
  );
};
