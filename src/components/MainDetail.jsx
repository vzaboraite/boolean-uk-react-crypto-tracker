import { useEffect, useState } from "react";
import { getCriptoUpdateUrl } from "../constants";

// This function give us the current time in seconds
function getCurrentTime() {
  return Math.round(Date.now() / 1000);
}

/*
  Use this function with the updated_at timestamp you get from each coin item in the API response
 */
function convertToSeconds(dateValue) {
  // This guard is needed due to the API discrepancies in handling dates
  return typeof dateValue === "string"
    ? Math.round(Date.parse(dateValue) / 1000)
    : dateValue;
}

// This function returns passed time in seconds
function getTimePassed(passedFrom) {
  return getCurrentTime() - convertToSeconds(passedFrom);
}

export default function MainDetail({ selectedCoin }) {
  // console.log("Inside MainDetail: ", selectedCoin);
  const { name, symbol, current_price, last_updated } = selectedCoin;

  // State stores passed time in seconds
  const [timePassed, setTimePassed] = useState(getTimePassed(last_updated));

  // console.log("State inside mainDetail: ", timePassed);

  // This useEffect is for creating `setInterval`, which will update `timePassed` state variable in seconds
  // Recourse for `setInterval`: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimePassed(getTimePassed(last_updated));
    }, 1000);
    // clean-up function to remove interval that was created previously
    // NOTE: previous effect is cleaned up before executing the next effect
    return () => {
      clearInterval(intervalId);
    };
  }, [last_updated]);
  return (
    <>
      <section className="main-detail__central">
        <div className="main-detail__update">
          {/* This part is for the challenge */}
        </div>
        <div className="main-detail__name">
          <h2>{name}</h2>
          <p>
            <span className="small">a.k.a </span>
            {symbol}
          </p>
        </div>
        <div className="main-detail__price">
          <p>£{current_price}</p>
          <p>Updated {timePassed} seconds ago</p>
        </div>
      </section>
    </>
  );
}
