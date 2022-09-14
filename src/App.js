import "./App.css";
import { TimerView } from "./components/Timer/TimerView";
// import { TodoView } from "./components/Todo/TodoView";

function App() {
  return (
    <div className="wrapper flex gap-2 h-screen p-2 bg-blue-100">
      <TimerView />
      {/* <TodoView /> */}
    </div>
  );
}

export default App;
