import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useGeo from "../hooks/useGeo";

const CurrentLocation = () => {
  const queryClient = useQueryClient();
  const { weatherData, geoLoading, weatherLoading } = useGeo();

  if (geoLoading || weatherLoading)
    return (
      <div id="current-location" className="grid">
        <p>Loading data</p>
      </div>
    );

  return (
    <div id="current-location" className="grid">
      <div className="grid-child">
        It looks like you're in {weatherData.city.name}. The current weather is{" "}
        {weatherData.list[0].weather[0].description}.
      </div>
      <div className="grid-child">FORECAST 5 DAYS</div>
      <div className="grid-child">SEARCH LOCATION</div>
    </div>
  );
};

export default CurrentLocation;
