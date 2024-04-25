import useGeo from "../hooks/useGeo";
import DayCard from "./DayCard";

const CurrentLocation = () => {
  const { geoData, uniqueDays, geoLoading, weatherLoading } = useGeo();

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
          <br /> The current weather is {
            uniqueDays[0].weather[0].description
          }{" "}
          with a temperature of {uniqueDays[0].main.temp.toFixed(0)}°F.
        </h1>
      </div>
      <div id="forecast" className="grid-child">
        {uniqueDays?.slice(1).map((day) => (
          <DayCard
            dayName={day.dt}
            weatherMain={day.weather[0].main}
            weatherIcon={day.weather[0].icon}
            weatherTemp={day.main.temp}
          />
        ))}
      </div>
      <div className="grid-child">SEARCH LOCATION</div>
    </div>
  );
};

export default CurrentLocation;
