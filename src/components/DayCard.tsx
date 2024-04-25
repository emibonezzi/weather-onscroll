interface Props {
  dayName: number;
  weatherIcon: string;
  weatherMain: string;
  weatherTemp: number;
}

const DayCard = (props: Props) => {
  return (
    <div className="card">
      <h1>
        {new Date(props.dayName * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        })}
      </h1>
      <img
        src={`https://openweathermap.org/img/wn/${props.weatherIcon.replace(
          "n",
          "d"
        )}@2x.png`}
      />
      <p>{props.weatherMain}</p>
      <h1>{props.weatherTemp.toFixed(0)}°</h1>
    </div>
  );
};

export default DayCard;
