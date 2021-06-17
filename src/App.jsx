import { useState, useEffect } from "react";

import MainDetail from "./components/MainDetail";
import SideListItem from "./components/SideListItem";
import NewsCard from "./components/NewsCard";

import { CRIPTO_LIST, STATUS_UPDATES } from "./constants";

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(null);
  const [criptoList, setCriptoList] = useState([]);
  const [statusUpdates, setstatusUpdates] = useState([]);

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

  useEffect(() => {
    fetch(STATUS_UPDATES)
      .then((response) => response.json())
      .then((news) => setstatusUpdates(news["status_updates"]));
  }, []);

  // STATUS_UPDATES

  const selectedCriptoObject = criptoList.find(
    (item) => item.id === selectedCripto
  );

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        <ul>
          {criptoList.map((item) => (
            <SideListItem
              key={item.id}
              item={item}
              setSelectedCripto={setSelectedCripto}
              isSelectedCripto={isSelectedCripto}
            />
          ))}
        </ul>
      </aside>
      <main className="main-detail">
        {selectedCripto ? (
          // ? "Create the main detail component here"
          <MainDetail selectedCriptoObject={selectedCriptoObject} />
        ) : (
          "Select a coin bro!"
        )}
        <ul className="newsfeed">
          {statusUpdates.map((status) => {
            return <NewsCard newsItem={status} />;
          })}
        </ul>
      </main>
    </>
  );
}

export default App;
