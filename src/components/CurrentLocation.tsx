import { useEffect } from "react";

const CurrentLocation = () => {
  return (
    <div id="current-location" className="grid">
      <div className="grid-child">CURRENT LOCATION</div>
      <div className="grid-child">FORECAST 5 DAYS</div>
      <div className="grid-child">SEARCH LOCATION</div>
    </div>
  );
};

export default CurrentLocation;
