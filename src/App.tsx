import { useEffect, useRef, useState } from "react";
import "./App.css";
import Footer from "./components/Footer.js";
import Landing from "./components/Landing";
import { debounce } from "./utils/debounce.js";
import Main from "./components/Main.js";

function App() {
  const [indexScroll, setIndexScroll] = useState(0);
  const [indexHoriz, setIndexHoriz] = useState(0);

  function handleScrollBack() {
    const main = document.querySelector("#current-location");
    main?.children[0].scrollIntoView({ behavior: "smooth" });
    setIndexHoriz(0);
  }

  useEffect(() => {
    console.log("Current vertical index: ", indexScroll);

    // handle vertical scroll
    const handleScrolling = debounce((e: any) => {
      // get main element
      const main = document.querySelector("main");
      e.preventDefault();
      // if scrolling up
      if (e.wheelDelta <= 0) {
        // if we are not at the last div, scroll to next one
        if (indexScroll < main?.children.length!! - 1) {
          console.log("Scrolling up");
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
          console.log("You are at the first div, can't scroll back.");
        }
      }
    }, 50);

    // handle horiz scroll
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

    // if user is in div n°1 (current location) activate horizontal scrolling
    if (indexScroll === 1) {
      window.removeEventListener("mousewheel", handleScrolling);
      window.addEventListener("mousewheel", handleScrollingHoriz);
    } else {
      window.addEventListener("mousewheel", handleScrolling);
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
