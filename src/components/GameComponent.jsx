import { useState, useEffect } from "react";
import GridComponent from "./GridComponent";
import "./GameComponent.css";
export default function GameComponent() {
  const [table, setTable] = useState(Array(21).fill());

  const classActive = "grid-active";
  const classEmpty = "grid-empty";
  const initialPositions = {
    grid_active: "",
    grid_empty: "",
  };
  const [positions, setPositions] = useState(initialPositions);

  const fillTable = (principalTable, classEmpty) => {
    const lastPositionTable = principalTable.length - 1;
    const classEmptyDiv = "p-5";
    const newTable = principalTable.map((value, index) => {
      if (lastPositionTable == index) return { classEmpty, classEmptyDiv };

      return {
        image: `/img/game-${index + 1}.jpg`,
        alt: "Imagen del rompecabezas",
      };
    });
    setTable(newTable);
  };

  const newOrderGrids = (table) => {
    const set = new Set([]);
    const lengthTable = table.length - 1;

    while (true) {
      //Include 1 to lengthTable - 1
      const randomNumber = Math.round(Math.random() * (lengthTable - 1)) + 1;
      set.add(randomNumber);
      if (set.size == lengthTable) break;
    }
    return set;
  };

  const changeTableOrder = (table) => {
    const newOrderTable = newOrderGrids(table);
    
    const newTable = [...table];
    let index = 0;

    newOrderTable.forEach((order) => {
      if (newTable[index].image){
        newTable[index].image = newTable[index].image.replace(/\d+/, order);
      } 
      
      index++;
    });

    setTable(newTable);
  };

  const savePosition = (e, index) => {
    const $element =
      e.target.tagName != "DIV" ? e.target.parentElement : e.target;

    const newPositions = { ...positions };

    newPositions.grid_active = $element.classList.contains(classActive)
      ? index
      : newPositions.grid_active;
    newPositions.grid_empty = $element.classList.contains(classEmpty)
      ? index
      : newPositions.grid_empty;

    setPositions(newPositions);
  };

  const validateMovement = (indexActive, indexEmpty) => {
    return indexActive + 1 == indexEmpty ||
      indexActive - 1 == indexEmpty ||
      indexActive + 4 == indexEmpty ||
      indexActive - 4 == indexEmpty
      ? true
      : false;
  };

  const cleanPositions = () => {
    setPositions(initialPositions);
  };

  const doMovement = (indexActive, indexEmpty) => {
    const $gridActive = table[indexActive];
    const newTable = [...table];
    newTable[indexActive] = table[indexEmpty];
    newTable[indexEmpty] = $gridActive;
    setTable(newTable);
    cleanPositions();
  };

  const handleClick = () => {
    changeTableOrder(table);
  };

  useEffect(() => {
    fillTable(table, classEmpty);
  }, []);

  useEffect(() => {
    const indexActive = positions.grid_active;
    const indexEmpty = positions.grid_empty;
    if (indexActive && indexEmpty) {
      if (validateMovement(indexActive, indexEmpty))
        doMovement(indexActive, indexEmpty);
      else cleanPositions();
    }
  }, [positions]);

  return (
    <div className="container-grid">
      <div className="w-50">
        <img
          className="img-fluid"
          src="/img/game-original.jpg"
          alt="Imagen original"
        />
      </div>
      <div className="content-grid">
        {table.map((content, index) => (
          <GridComponent
            key={index}
            index={index}
            content={content}
            savePosition={savePosition}
            classActive={classActive}
            classEmpty={classEmpty}
          />
        ))}
      </div>
      <button onClick={handleClick} className="btn btn-primary btn-lg">
        Cambiar orden
      </button>
    </div>
  );
}
