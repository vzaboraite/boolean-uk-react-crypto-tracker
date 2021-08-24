import { useState, useEffect } from "react";

import MainDetail from "./components/MainDetail";
import SideListItem from "./components/SideListItem";

import { CRIPTO_LIST } from "./constants";

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  // state to store data from fetch
  const [coins, setCoins] = useState([])
  // foundCoin{} stores selected coin's data
  const selectedCoin = coins.find(coin => selectedCoinId === coin.id)

  // console.log("coins: ", coins)
  // console.log("selectedCripto: ", selectedCryptoId)

  useEffect(()=>{
    fetch(CRIPTO_LIST)
      .then(res => res.json())
      .then(data => setCoins(data))
    }, [])

  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCoinId === id;
  }

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        {/* This is where the side list goes */}
        <ul>
          {coins.map((coin, index)=>{ 
            // console.log("Item inside cripto map: ", item);
          return(<SideListItem key={index} item={coin} isSelectedCripto={isSelectedCripto} selectCripto={setSelectedCoinId} />)
          })}
        </ul>
      </aside>
      <main className="main-detail">
        {selectedCoin
          ? <MainDetail selectedCoin={selectedCoin}/>
          : "Select a coin bro!"}
        {/* News feed component needs to go here */}
      </main>
    </>
  );
}

export default App;
