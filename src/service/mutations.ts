import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, updateTodo } from "./api";
import { Todo } from "../types/todo";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    // onMutate는 mutation이 시작되기 전에 호출됩니다.
    onMutate: () => {
      console.log("onMutate");
    },
    // onError는 mutation이 실패하면 호출됩니다.
    onError: () => {
      console.log("onError");
    },
    // onSuccess는 mutation이 성공하면 호출됩니다.
    onSuccess: () => {
      console.log("onSuccess");
    },
    // onSettled는 mutation이 성공하거나 실패하거나 상관없이 호출됩니다.
    onSettled: async (_, error) => {
      console.log("onSettled");
      if (error) {
        console.log("error : ", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),

    onSettled: async (_, error, variables) => {
      if (error) {
        console.log("error : ", error);
      } else {
        // 아래 주석을 해제하면 모든 todos를 다시 불러오게 됩니다.
        // await queryClient.invalidateQueries({ queryKey: ["todos"] });
        await queryClient.invalidateQueries({
          queryKey: ["todos", { id: variables.id }],
        });
      }
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),

    onSettled: async (_, error) => {
      if (error) {
        console.log("error : ", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}
