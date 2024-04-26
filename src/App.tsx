import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer.js";
import Landing from "./components/Landing";
import { debounce } from "./utils/debounce";
import Main from "./components/Main.js";

function App() {
  // manage vertical and horizontal scroll state
  const [indexScroll, setIndexScroll] = useState(0);
  const [indexHoriz, setIndexHoriz] = useState(0);

  // handle vertical scroll for mousewheel
  const handleScrolling = debounce((e: any) => {
    // get main element
    const main = document.querySelector("main");
    e.preventDefault();
    // if scrolling up
    if (e.wheelDelta <= 0) {
      // if we are not at the last div, scroll to next one
      if (indexScroll < main?.children.length!! - 1) {
        setIndexScroll(indexScroll + 1);
        main?.children[indexScroll + 1].scrollIntoView({
          behavior: "smooth",
        });
      } else {
        // if last div, go back to the first one
        setIndexScroll(0);
        main?.children[0].scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      // if scrolling down
      // if we are not in the first div, scroll back
      if (indexScroll > 0) {
        setIndexScroll(indexScroll - 1);
        main?.children[indexScroll - 1].scrollIntoView({
          behavior: "smooth",
        });
      } else {
        // if we are at the first div, do nothing
      }
    }
  }, 50);

  // handle horiz scroll for mousewheel
  const handleScrollingHoriz = debounce((e: any) => {
    // get main element
    const main = document.querySelector("#current-location");
    e.preventDefault();
    // if scrolling up
    if (e.wheelDelta <= 0) {
      // if we are not at the last div, scroll to next one
      if (indexHoriz < main?.children.length!! - 1) {
        console.log("Scrolling up");
        setIndexHoriz(indexHoriz + 1);
        main?.children[indexHoriz + 1].scrollIntoView({
          behavior: "smooth",
        });
      } else {
        // if last div, go back to the first one
        setIndexHoriz(0);
        main?.children[0].scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      // if scrolling down
      // if we are not in the first div, scroll back
      if (indexHoriz > 0) {
        setIndexHoriz(indexHoriz - 1);
        main?.children[indexHoriz - 1].scrollIntoView({
          behavior: "smooth",
        });
      } else {
        // if we are at the first div, do nothing
        console.log("You are at the first div, can't scroll back.");
      }
    }
  }, 50);

  // handle vertical scroll for touchstart
  const handleScrollingTouch = debounce((e: any) => {
    if (e.cancelable) e.preventDefault();
    // get main element
    const main = document.querySelector("main");
    // if we are not at the last div, scroll to next one
    if (indexScroll < main?.children.length!! - 1) {
      setIndexScroll(indexScroll + 1);
      main?.children[indexScroll + 1].scrollIntoView({
        behavior: "smooth",
      });
    } else {
      // if last div, go back to the first one
      setIndexScroll(0);
      main?.children[0].scrollIntoView({
        behavior: "smooth",
      });
    }
  }, 50);

  const handleScrollingTouchHoriz = debounce((e: any) => {
    if (e.cancelable) e.preventDefault();
    // get main element
    const main = document.querySelector("#current-location");
    // if we are not at the last div, scroll to next one
    if (indexHoriz < main?.children.length!! - 1) {
      setIndexHoriz(indexHoriz + 1);
      main?.children[indexHoriz + 1].scrollIntoView({
        behavior: "smooth",
      });
    } else {
      // if last div, go back to the first one
      setIndexHoriz(0);
      main?.children[0].scrollIntoView({
        behavior: "smooth",
      });
    }
  }, 50);

  function handleScrollBack() {
    // function to send back user to the first child when he search for a city
    const main = document.querySelector("#current-location");
    main?.children[0].scrollIntoView({ behavior: "smooth" });
    setIndexHoriz(0);
  }

  // handle mousewheel event
  useEffect(() => {
    // if user is in div n°1 (short-info) activate horizontal scrolling
    if (indexScroll === 1) {
      window.removeEventListener("mousewheel", handleScrolling);
      window.addEventListener("mousewheel", handleScrollingHoriz);
    } else {
      window.addEventListener("mousewheel", handleScrolling);
    }
  }, [indexScroll, indexHoriz]);

  // handle touchstart event
  useEffect(() => {
    // if user is in div n°1 (short-info) activate horizontal scrolling
    if (indexScroll === 1) {
      window.removeEventListener("touchstart", handleScrollingTouch);
      window.addEventListener("touchstart", handleScrollingTouchHoriz);
    } else {
      window.addEventListener("touchstart", handleScrollingTouch);
    }
  }, [indexScroll, indexHoriz]);

  return (
    <main>
      <Landing />
      <Main onSearch={handleScrollBack} />
      <Footer />
    </main>
  );
}

export default App;
