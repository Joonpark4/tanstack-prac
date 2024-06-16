import { useQueries, useQuery } from "@tanstack/react-query";
import { getTodo, getTodosIds } from "./api";

export function useTodosIds() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosIds,
    refetchOnWindowFocus: false,
  });
}

// 첫번째 방법
// export function useTodos(id: number) {
//   return useQuery({
//     queryKey: ["todos", id],
//     queryFn: () => getTodo(id),
//   });
// }

// 두번째 방법
export function useTodos(ids: (number | undefined)[] | undefined) {
  return useQueries({
    // 만약 ids가 undefined라면 빈 배열을 반환합니다.
    queries: (ids ?? []).map((id) => ({
      queryKey: ["todos", id],
      // id가 undefined라면 getTodo를 호출하지 않습니다.
      queryFn: () => getTodo(id!),
    })),
  });
}
