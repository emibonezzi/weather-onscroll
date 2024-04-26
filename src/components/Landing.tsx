import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { scrollIntoView } from "seamless-scroll-polyfill";

const Landing = () => {
  return (
    <div id="intro" className="full-page">
      <div>
        <h1>Welcome to Weather On Scroll. A minimal weather app.</h1>
      </div>
      <a
        onClick={() => {
          const element = document.querySelector("#current-location");
          scrollIntoView(element!!, {
            behavior: "smooth",
          });
        }}
      >
        <MdKeyboardDoubleArrowDown className="scroller" />
      </a>
    </div>
  );
};

export default Landing;
