import { useState, useEffect } from "react";

import MainDetail from "./components/MainDetail";
import SideListItem from "./components/SideListItem";
import NewsCard from "./components/NewsCard";

import { CRIPTO_LIST, STATUS_UPDATES } from "./constants";

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  // state to store coins data from fetch
  const [coins, setCoins] = useState([]);
  // state to store news-feed from fetch
  const [newsfeed, setNewsFeed] = useState([]);

  // selectedCoin variable stores selected coin object
  const selectedCoin = coins.find((coin) => selectedCoinId === coin.id);

  // console.log("coins: ", coins)
  // console.log("selectedCripto: ", selectedCryptoId)

  useEffect(() => {
    fetch(CRIPTO_LIST)
      .then((res) => res.json())
      .then((cryptoData) => setCoins(cryptoData));
  }, []);

  useEffect(() => {
    fetch(STATUS_UPDATES)
      .then((res) => res.json())
      .then((newsData) => setNewsFeed(newsData.status_updates));
  }, []);
  console.log("news: ", newsfeed);

  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
  function isSelectedCoin(id) {
    return selectedCoinId === id;
  }

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        {/* This is where the side list goes */}
        <ul>
          {coins.map((coin, index) => {
            // console.log("Item inside cripto map: ", item);
            return (
              <SideListItem
                key={index}
                name={coin.name}
                isSelected={isSelectedCoin(coin.id)}
                onClick={() => setSelectedCoinId(coin.id)}
              />
            );
          })}
        </ul>
      </aside>
      <main className="main-detail">
        {selectedCoin ? (
          <MainDetail selectedCoin={selectedCoin} />
        ) : (
          "Select a coin bro!"
        )}
        {/* News feed component needs to go here */}
        <ul className="newsfeed">
          {newsfeed.map((newsItem, index) => (
            <NewsCard key={index} newsItem={newsItem} />
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
