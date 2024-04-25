import useFindCity from "../hooks/useFindCity";
import useGeo from "../hooks/useGeo";
import useNewCityWeather from "../hooks/useNewCityWeather";
import useNewCityStore from "../state-management/new-city/store";
import useSelectedCityStore from "../state-management/selected-city/store";
import DayCard from "./DayCard";

const CurrentLocation = () => {
  const { geoData, ipLocationForecast, geoLoading, weatherLoading } = useGeo();
  const { newCity, setNewCity } = useNewCityStore();
  const { cities, isLoading, error } = useFindCity();
  const { setSelectedCity } = useSelectedCityStore();
  const { city, selectedCityWeather, isLoadingNewWeather } =
    useNewCityWeather();

  if (geoLoading || weatherLoading)
    return (
      <div id="current-location" className="grid">
        <p>Loading weather data from IP.</p>
      </div>
    );

  // if new city is searched
  if (newCity) {
    // if new city is being loaded
    if (isLoadingNewWeather) {
      return <p>Loading new forecast</p>;
    }

    return (
      <div id="current-location" className="grid">
        <div className="grid-child">
          <h1>
            You searched for {city.name}.
            <br /> The current weather is{" "}
            {selectedCityWeather!![0].weather[0].description} with a temperature
            of {selectedCityWeather!![0].main.temp.toFixed(0)}°F.
          </h1>
        </div>
        <div id="forecast" className="grid-child">
          <h1>
            This is how it's going to look in the next five days in {city.name}.
          </h1>
          <div className="cards">
            {selectedCityWeather?.slice(1).map((day) => (
              <DayCard
                dayName={day.dt}
                weatherMain={day.weather[0].main}
                weatherIcon={day.weather[0].icon}
                weatherTemp={day.main.temp}
              />
            ))}
          </div>
        </div>
        <div id="search" className="grid-child">
          <h1>Want to look elsewhere?</h1>
          <input
            onChange={(e) => {
              setNewCity(e.target.value);
            }}
          />
          {cities
            ? cities.map((city) => (
                <button
                  onClick={() => {
                    setSelectedCity({
                      lat: city.lat,
                      lon: city.lon,
                    });
                  }}
                >
                  {city.name}
                </button>
              ))
            : ""}
        </div>
      </div>
    );
  }

  return (
    <div id="current-location" className="grid">
      <div className="grid-child">
        <h1>
          It looks like you're in {geoData.city}, {geoData.state_prov}.
          <br /> The current weather is{" "}
          {ipLocationForecast!![0].weather[0].description} with a temperature of{" "}
          {ipLocationForecast!![0].main.temp.toFixed(0)}°F.
        </h1>
      </div>
      <div id="forecast" className="grid-child">
        <h1>
          This is how it's going to look in the next five days in {geoData.city}
          .
        </h1>
        <div className="cards">
          {ipLocationForecast?.slice(1).map((day) => (
            <DayCard
              dayName={day.dt}
              weatherMain={day.weather[0].main}
              weatherIcon={day.weather[0].icon}
              weatherTemp={day.main.temp}
            />
          ))}
        </div>
      </div>
      <div id="search" className="grid-child">
        <h1>Want to look elsewhere?</h1>
        <input
          onChange={(e) => {
            setNewCity(e.target.value);
          }}
        />
        {cities
          ? cities.map((city) => (
              <button
                onClick={() => {
                  setSelectedCity({
                    lat: city.lat,
                    lon: city.lon,
                  });
                }}
              >
                {city.name}
              </button>
            ))
          : ""}
      </div>
    </div>
  );
};

export default CurrentLocation;
