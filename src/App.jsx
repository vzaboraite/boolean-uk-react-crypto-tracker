import { useState, useEffect } from "react";

import MainDetail from "./components/MainDetail";
import SideListItem from "./components/SideListItem";

import { CRIPTO_LIST } from "./constants";

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(null);
  // state to store data from fetch
  const [cripto, setCrypto] = useState([])

  console.log("cripto: ", cripto)
  console.log("selectedCripto: ", selectedCripto)

  useEffect(()=>{
    fetch(`${CRIPTO_LIST}`)
      .then(res => res.json())
      .then(data => setCrypto(data))
    }, [])

  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCripto === id;
  }

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        {/* This is where the side list goes */}
        <ul>
          {cripto.map((item, index)=>{ 
            // console.log("Item inside cripto map: ", item);
          return(<SideListItem key={index} item={item} isSelectedCripto={isSelectedCripto} />)
          })}
        </ul>
      </aside>
      <main className="main-detail">
        {selectedCripto
          ? "Create the main detail component here"
          : "Select a coin bro!"}
        {/* News feed component needs to go here */}
      </main>
    </>
  );
}

export default App;
