import { useTodos, useTodosIds } from "../service/queries";
export const TodoList = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);
  return (
    <ul>
      {todosQueries?.map(({ data }, index) => (
        <li key={index}>
          <div>ID : {data?.id}</div>
          <span>
            <strong>Title : </strong>
            {data?.title} , <strong>Description : </strong>
            {data?.description} ,
          </span>
        </li>
      ))}
    </ul>
  );
};
