// import { SubmitHandler } from "react-hook-form";
import { useTodos, useTodosIds } from "../service/queries";
import { useDeleteTodo, useUpdateTodo } from "../service/mutations";
import { Todo } from "../types/todo";
export const TodoList = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  const updateTodoMutation = useUpdateTodo();
  const handlerMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: !data.checked });
    }
  };

  const deleteTodoMutation = useDeleteTodo();
  // const handlerDeleteSubmit = (id: number) => {
  //   deleteTodoMutation.mutate(id);
  // };
  
  // 아래 함수가 위 함수와 다른점은
  // deleteTodoMutation.mutateAsync(id)가 끝날 때까지 기다립니다.
  const handlerDeleteSubmit = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id);
    console.log("deleteTodoMutation.mutateAsync(id) : ", id);
  };
  return (
    <ul>
      {todosQueries?.map(({ data }) => (
        <li key={data?.id}>
          <div>ID : {data?.id}</div>
          <span>
            <strong>Title : </strong>
            {data?.title} , <strong>Description : </strong>
            {data?.description} ,
          </span>
          <div style={{ display: "flex", gap: 5 }}>
            <button onClick={() => handlerMarkAsDoneSubmit(data)}>
              {data?.checked ? "Done" : "Mark ad done"}
            </button>
            {data && data.id && (
              <button onClick={() => handlerDeleteSubmit(data.id!)}>
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
