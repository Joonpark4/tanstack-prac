import { useCreateTodo } from "../service/mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { Todo } from "../types/todo";
// import {useUpdateTodo} from "../service/mutations";

export const TodoMutationComponent = () => {
  const createTodoMutation = useCreateTodo();
  // const updateTodoMutation = useUpdateTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handlerCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  // const handlerMarkAsDoneSubmit: SubmitHandler<Todo> = (data) => {
  //   updateTodoMutation.mutate({ ...data, checked: true });
  // };
  return (
    <div>
      <form onSubmit={handleSubmit(handlerCreateTodoSubmit)}>
        <h4>New Todo : </h4>
        <input placeholder="Title" {...register("title")} />
        <br />
        <input placeholder="Description" {...register("description")} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating..." : "Create Todo"}
        />
      </form>
    </div>
  );
};
