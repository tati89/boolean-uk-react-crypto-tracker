import { useState, useEffect } from "react";

import MainDetail from "./components/MainDetail";
import SideListItem from "./components/SideListItem";

import { CRIPTO_LIST } from "./constants";

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(null);
  const [criptoList, setCriptoList] = useState([]);

  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCripto === id;
  }

  useEffect(() => {
    fetch(CRIPTO_LIST)
      .then((response) => response.json())
      .then((criptoList) => setCriptoList(criptoList));
  }, []);

  function findCriptoObject(selectedCripto) {
    return criptoList.find((eachCripto) => eachCripto.id === selectedCripto.id);
  }

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        <ul>
          {criptoList.map((item) => (
            <SideListItem
              key={item.id}
              item={item}
              selectCripto={setSelectedCripto}
              isSelectedCripto={isSelectedCripto}
            />
          ))}
        </ul>
      </aside>
      <main className="main-detail">
        {selectedCripto ? (
          // ? "Create the main detail component here"
          <MainDetail
          // selectedCripto={selectedCripto}
          // setSelectedCripto={setSelectedCripto}
          />
        ) : (
          "Select a coin bro!"
        )}
        {/* News feed component needs to go here */}
      </main>
    </>
  );
}

export default App;
