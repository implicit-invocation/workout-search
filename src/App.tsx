import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { WorkoutInfo, getAllWorkoutIds, getWorkoutInfo } from "./util/workout";

function App() {
  const [ids, setIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [highlighted, setHighlighted] = useState<string | undefined>(undefined);
  const [highlightedInfo, setHighlightedInfo] = useState<
    WorkoutInfo | undefined
  >(undefined);

  const filteredIds = useMemo(() => {
    if (!filter) return [];
    return ids.filter((id) => id.includes(filter));
  }, [ids, filter]);

  useEffect(() => {
    getAllWorkoutIds().then(setIds);
  }, []);

  useEffect(() => {
    if (!highlighted) return;
    setHighlightedInfo(undefined);
    getWorkoutInfo(highlighted).then(setHighlightedInfo);
  }, [highlighted]);

  return (
    <div className="h-full w-full flex flex-col gap-2 justify-start items-center p-3">
      <div className="w-full max-w-screen-sm flex flex-col justify-start items-start gap-3 overflow-hidden">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          className="w-full p-3 bg-gray-700 text-white"
          placeholder="Search..."
        />
        {filteredIds.length === 0 && (
          <p className="text-white italic text-sm">
            Try to search for something
          </p>
        )}
        <div className="flex-1 w-full flex flex-col gap-2 overflow-auto">
          {filteredIds.map((id) => (
            <div key={id}>
              <button
                className="cursor-pointer p-3 bg-gray-500 text-gray-200 w-full"
                onClick={() => setHighlighted(id)}
              >
                {id}
              </button>
              {highlighted === id && (
                <div className="p-3">
                  <div>{highlightedInfo?.instructions}</div>
                  <div className="w-full flex flex-row justify-center items-center gap-2">
                    {highlightedInfo?.images.map((img) => (
                      <div className="flex-1" key={img}>
                        <img
                          key={img}
                          src={img}
                          alt={img}
                          className="w-full object-contain h-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
