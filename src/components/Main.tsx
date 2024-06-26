import { SearchResult } from "../entities/SearchResult";
import useGeo from "../hooks/useGeo";
import useNewCityWeather from "../hooks/useNewCityWeather";
import useSearch from "../hooks/useSearch";
import useQueryStore from "../state-management/search-query/store";
import useSelectedCityStore from "../state-management/selected-city/store";
import DayCard from "./DayCard";

const Main = () => {
  const {
    geoData,
    ipLocationForecast,
    geoLoading,
    weatherLoading,
    geoError,
    weatherError,
  } = useGeo();
  const { query, setQuery } = useQueryStore();
  const { cities } = useSearch();
  const { selectedCity, setSelectedCity } = useSelectedCityStore();
  const { selectedCityWeather, isLoadingNewWeather, isErrorNewWeather } =
    useNewCityWeather();

  if (geoLoading || weatherLoading || isLoadingNewWeather)
    return (
      <div id="weather">
        <p>Loading weather data...</p>
      </div>
    );

  const forecast = query ? selectedCityWeather : ipLocationForecast;
  const intro = query ? "You searched for " : "It looks like you're in ";
  const cityName = query ? selectedCity.name : geoData?.city;
  const stateName = query ? selectedCity.state : geoData?.state_prov;
  const countryName = query ? selectedCity.country : geoData?.country_code2;

  return (
    <>
      <div id="weather">
        {geoError && <h1>There's been an error in fetching your IP data.</h1>}
        {weatherError && (
          <h1>There's been an error in fetching your location weather data.</h1>
        )}
        {isErrorNewWeather && (
          <h1>
            There's been an error in fetching your searched location weather
            data.
          </h1>
        )}
        <h1>
          {intro}
          {cityName}
          {stateName ? `, ${stateName}` : `, ${countryName}`}.
          <br /> The current weather is {
            forecast!![0].weather[0].description
          }{" "}
          with a temperature of {forecast!![0].main.temp.toFixed(0)}°F.
        </h1>
      </div>

      <div id="forecast">
        <div>
          <h1>
            This is how it's going to look in the next five days in {cityName}.
          </h1>
          <div className="cards">
            {forecast?.slice(1).map((day) => (
              <DayCard
                dayName={day.dt}
                weatherMain={day.weather[0].main}
                weatherIcon={day.weather[0].icon}
                weatherTemp={day.main.temp}
              />
            ))}
          </div>
        </div>
      </div>
      <div id="search">
        <div>
          <div className="search-container">
            <h1>Want to look elsewhere?</h1>
            <input
              id="search-bar"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </div>
          <div className="results">
            {cities
              ? cities.map((city: SearchResult) => (
                  <button
                    onClick={() => {
                      setSelectedCity({
                        name: city.name,
                        country: city.country,
                        state: city.state,
                        lat: city.lat,
                        lon: city.lon,
                      });
                    }}
                  >
                    <a href="#weather">
                      {city.name}
                      {city.state ? `, ${city.state}` : null} - {city.country}
                    </a>
                  </button>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
