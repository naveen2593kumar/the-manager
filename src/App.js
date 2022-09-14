import "./App.css";
import { TimerView } from "./components/Timer/TimerView";
import { Todo } from "./components/Todos/Todo";

function App() {
  return (
    <div className="flex gap-2 h-screen p-2 bg-blue-100">
      <TimerView />
      <Todo />
    </div>
  );
}

export default App;
