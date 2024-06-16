import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getProduct,
  getProducts,
  getProjects,
  getTodo,
  getTodosIds,
} from "./api";
import { Product } from "../types/product";

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
      queryKey: ["todos", { id }],
      // id가 undefined라면 getTodo를 호출하지 않습니다.
      queryFn: () => getTodo(id!),
    })),
  });
}

// 프로젝트 불러오기
// 페이지네이션에 대해 알아보기
/**
 * - placeholderData는 이전 데이터를 캐시해두어 다음에 데이터를 불러올 때 빠르게 렌더링할 수 있게 합니다.
 *
 *
 */
export function useProjects(page: number) {
  return useQuery({
    queryKey: ["projects", { page }],
    queryFn: () => getProjects(page),
    // placeholderData: keepPreviousData,
    placeholderData: keepPreviousData,
  });
}

// 프로덕트들 모두 불러오기
export function useProducts() {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPagePram) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPagePram + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
}

// 특정 프로덕트 불러오기
export function useProduct(id: number | null) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProduct(id!),
    enabled: !!id,
    placeholderData: () => {
      const cachedProducts = (
        queryClient.getQueryData(["products"]) as {
          pages: Product[] | undefined;
        }
      )?.pages?.flat(2);
      if (cachedProducts) {
        return cachedProducts.find((item) => item.id === id);
      }
    },
  });
}
