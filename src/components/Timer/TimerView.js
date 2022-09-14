import { useEffect, useState } from "react";
import { AppConstants } from "../../contants";
import { Timer } from "./Timer";
import { TimerForm } from "./TimerForm";

export function TimerView() {
  const [timers, setTimers] = useState([]);
  const [selectedTimer, setSelectedTimer] = useState({});

  useEffect(() => {
    try {
      const timersRaw = localStorage.getItem(AppConstants.TIMERS);
      const timersData = JSON.parse(timersRaw);
      if (Array.isArray(timersData)) {
        setTimers(timersData.sort((a, b) => a.time - b.time));
      }
    } catch (err) {
      console.error("Err: ", err);
    }
  }, []);

  const handleSaveTimer = (newTimer) => {
    let newTimerState = timers;
    if (newTimer.id) {
      // Update
      newTimerState = timers.map((time) => {
        return time.id === newTimer.id
          ? {
              ...time,
              ...newTimer,
            }
          : time;
      });
    } else {
      // Add
      newTimerState = [...timers, { ...newTimer, id: Date.now() }];
    }
    // newTimerState = newTimerState.filter((item) => item.time > Date.now());
    newTimerState.sort((a, b) => a.time - b.time);
    localStorage.setItem(AppConstants.TIMERS, JSON.stringify(newTimerState));
    setTimers(newTimerState);
  };

  const deleteTimer = (toBeDeleted, soft) => {
    console.log("Delete Triggered", { toBeDeleted, soft });
    let newTimerState = timers;
    if (toBeDeleted.id) {
      if (soft) {
        newTimerState = timers.map((time) => {
          return time.id === toBeDeleted.id
            ? {
                ...time,
                deleted: true,
              }
            : time;
        });
      } else {
        newTimerState = timers.filter((item) => item.id !== toBeDeleted.id);
      }
      setTimers(newTimerState);
      localStorage.setItem(AppConstants.TIMERS, JSON.stringify(newTimerState));
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-2 bg-purple-600 rounded p-2">
      <TimerForm timer={selectedTimer} saveTimer={handleSaveTimer} />
      <div className="flex justify-center font-bold text-white">Timers</div>
      {timers.map((timer) => (
        <Timer
          key={timer.id}
          setSelectedTimer={setSelectedTimer}
          timer={timer}
          deleteTimer={deleteTimer}
        />
      ))}
    </div>
  );
}
