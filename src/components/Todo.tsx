import { useIsFetching } from "@tanstack/react-query";
import { useTodosIds } from "../service/queries";

export const Todo = () => {
  /** 1번째 방법 */
  const todoIdsQuery = useTodosIds();
  const isFetching = useIsFetching();

  /** 다음 코드를 주석처리하여 fetchStatus, status, fetching 상태를 확인해보세요. */
  if (todoIdsQuery.isPending) {
    return <div>Loading...</div>;
  }
  if (todoIdsQuery.isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <p>Query function status:{todoIdsQuery.fetchStatus}</p>
      <p>Query data status: {todoIdsQuery.status}</p>
      <p>isFetching: {isFetching}</p>
      {todoIdsQuery.data?.map((id) => (
        <p key={id}>{id}</p>
      ))}
    </>
  );

  // 2번째 방법
  // 다음 코드는 주석처리하여도 fetchStatus, status, fetching 상태를 확인할 수가 없네요.
  // const { data, isLoading, isError, isFetching } = useTodosIds();
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (isError) {
  //   return <div>Error</div>;
  // }
  // if (isFetching) {
  //   return <div>Fetching...</div>;
  // }
  // return (
  //   <>
  //     {/*
  //     아래 코드는 먹히지 않습니다. 왜?
  //     <p>Query function status:{isLoading}</p>
  //     <p>Query data status: {isError}</p>
  //     <p>isFetching: {isFetching}</p> */}
  //     {data?.map((id) => (
  //       <p key={id}>{id}</p>
  //     ))}
  //   </>
  // );
};
