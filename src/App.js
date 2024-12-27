import "./styles.css";
import { useState, useMemo, useRef } from "react";
import COUNTRIES from "./Countries";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [dataToShow, setDataToShow] = useState([]);
  const inputRef = useRef("");
  const onInputChange = (e) => {
    let value = COUNTRIES.filter((el) =>
      el.toLowerCase().includes(inputRef.current.value.toLowerCase())
    ).slice(0, 5);

    setDataToShow(value);
  };

  const setValueAndClear = () => {
    if (activeIndex !== -1) {
      setDataToShow([]);
    }
  };
  const handleKeyDown = (e) => {
    let newActiveindex;
    console.log("e", e);
    if (e.key === "ArrowDown") {
      newActiveindex = activeIndex === 4 ? 0 : activeIndex + 1;
      inputRef.current.value = dataToShow[newActiveindex];
      setActiveIndex(newActiveindex);
    }

    if (e.key === "ArrowUp") {
      newActiveindex = activeIndex === 0 ? 4 : activeIndex - 1;
      inputRef.current.value = dataToShow[newActiveindex];
      setActiveIndex(newActiveindex);
    }

    if (e.key === "Enter") {
      setValueAndClear();
    }
  };

  const onMouseEnter = (index) => {
    setActiveIndex(index);
    inputRef.current.value = dataToShow[index];
  };
  return (
    <div className="App">
      <h1>Type Ahead Mini Challenge</h1>
      <div className="type-ahead-container">
        <input
          type="search"
          className="input-container"
          placeholder="Search for country"
          ref={inputRef}
          onChange={(e) => onInputChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        {dataToShow && (
          <div className="results-container">
            {dataToShow.map((el, index) => {
              return (
                <div
                  className={`${index === activeIndex ? "active" : "result"}`}
                  key={index}
                  onMouseEnter={() => onMouseEnter(index)}
                  onClick={() => setValueAndClear()}
                >
                  {el}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
