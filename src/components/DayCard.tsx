import { icons } from "../utils/icons";

interface Props {
  dayName: number;
  weatherIcon: string;
  weatherMain: string;
  weatherTemp: number;
}

const DayCard = (props: Props) => {
  return (
    <div className="card">
      <p className="day-name">
        {new Date(props.dayName * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        })}
      </p>
      <span className="icon">
        {icons.find((icon) => icon?.name === props.weatherMain)?.icon}
      </span>
      <h1>{props.weatherMain}</h1>
      <span className="temp">{props.weatherTemp.toFixed(0)}°</span>
    </div>
  );
};

export default DayCard;
