import { useCreateTodo } from "../service/mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { Todo } from "../types/todo";

export const TodoMutationComponent = () => {

  const createTodoMutation = useCreateTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handlerCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handlerCreateTodoSubmit)}>
        <h4>New Todo : </h4>
        <input placeholder="Title" {...register("title")} />
        <br />
        <input placeholder="Description" {...register("description")} />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};
