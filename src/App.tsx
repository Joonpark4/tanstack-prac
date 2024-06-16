// import { Todo } from "./components/Todo";
import { ProjectComponent } from "./components/Projects";
import { TodoMutationComponent } from "./components/TodoMutation";
import { TodoList } from "./components/TodoQueries";

function App() {
  return (
    <>
      {/* <Todo /> */}
      <TodoMutationComponent />
      <TodoList />
      <ProjectComponent />
    </>
  );
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/todos")
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // return <>{JSON.stringify(data)}</>;
}

export default App;
