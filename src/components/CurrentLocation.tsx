import useGeo from "../hooks/useGeo";

const CurrentLocation = () => {
  const { geoData, weatherData, geoLoading, weatherLoading } = useGeo();

  if (geoLoading || weatherLoading)
    return (
      <div id="current-location" className="grid">
        <p>Loading data</p>
      </div>
    );

  return (
    <div id="current-location" className="grid">
      <div className="grid-child">
        <h1>
          It looks like you're in {geoData.city}, {geoData.state_prov}.
          <br /> The current weather is{" "}
          {weatherData.list[0].weather[0].description} with a temperature of{" "}
          {weatherData.list[0].main.temp.toFixed(0)}°F.
        </h1>
      </div>
      <div className="grid-child">
        <h1>FORECAST</h1>
      </div>
      <div className="grid-child">SEARCH LOCATION</div>
    </div>
  );
};

export default CurrentLocation;
