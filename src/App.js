import { format } from "date-fns";
import preval from "preval.macro";
import "./App.css";
import { TimerView } from "./components/Timer/TimerView";
// import { TodoView } from "./components/Todo/TodoView";

const buildTime = preval`module.exports = Date.now();`;

function App() {
  const buildTimeFormatted = format(buildTime, "dd-MMM-yyyy hh:mm:ss a");
  return (
    <div className="wrapper bg-blue-100">
      <div className="text-center text-sm">
        Build Time: {buildTimeFormatted}
      </div>
      <div className="flex gap-2 h-screen p-2">
        <TimerView />
        {/* <TodoView /> */}
      </div>
    </div>
  );
}

export default App;
