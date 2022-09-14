import { format, isValid } from "date-fns";
import { useEffect, useRef } from "react";

export function TimerForm({ timer, saveTimer, deleteTimer }) {
  const titleRef = useRef();
  const timeRef = useRef();

  const handleFormSubmit = () => {
    const title = titleRef?.current?.value?.trim();
    const time = new Date(timeRef?.current?.value);
    if (title && isValid(time)) {
      saveTimer({
        ...(timer || {}),
        title,
        time: time.getTime(),
      });
      timeRef.current.value = "";
      titleRef.current.value = "";
    } else {
      alert(
        `Invalid values \n${JSON.stringify(
          { title, time, rawTime: timeRef?.current?.value },
          null,
          2
        )}`
      );
    }
  };

  useEffect(() => {
    if (timer && timer.id) {
      timeRef.current.value = format(
        new Date(timer.time),
        "yyyy-MM-dd'T'HH:mm"
      );
      titleRef.current.value = timer.title;
    }
  }, [timer]);

  return (
    <div className="rounded border-2 border-white p-2">
      <form
        className="flex gap-2 items-center"
        onSubmit={(evt) => {
          evt.preventDefault();
          handleFormSubmit();
        }}
      >
        <input
          maxLength={40}
          ref={titleRef}
          required
          className="p-1 shadow rounded w-3/5"
          placeholder="Title"
        />
        <input
          required
          ref={timeRef}
          min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
          className="p-1 shadow rounded"
          type="datetime-local"
        />
        <button
          type="submit"
          className="flex-1 flex justify-end text-white hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
        <button
          onClick={(evt) => {
            evt.preventDefault();
            timeRef.current.value = "";
            titleRef.current.value = "";
          }}
          className="flex-1 flex justify-end text-white hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
