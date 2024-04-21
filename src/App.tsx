import { useEffect, useRef, useState } from "react";
import "./App.css";
import CurrentLocation from "./components/CurrentLocation";
import Landing from "./components/Landing";
import { debounce } from "./utils/debounce.js";
import Footer from "./components/Footer.js";

function App() {
  const indexScroll = useRef(0);

  useEffect(() => {
    // define parameters of intersections
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    // function that will be called when "current location" is detected in viewport
    let callback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          // remove event listener
          window.removeEventListener("mousewheel", handleScrolling);
        } else {
          // add event listener
          window.addEventListener("mousewheel", handleScrolling, {
            passive: false,
          });
        }
      }
    };
    // define observer and target to observe, "current-location"
    let observer = new IntersectionObserver(callback, options);
    let target = document.querySelector("#current-location");
    observer.observe(target!!);
    // get main element
    const main = document.querySelector("main");
    // handle scroll
    const handleScrolling = debounce((e: any) => {
      e.preventDefault();
      if (e.wheelDelta <= 0) {
        if (indexScroll.current < main?.children.length!! - 1) {
          indexScroll.current = indexScroll.current + 1;
          console.log(indexScroll.current);
          main?.children[indexScroll.current].scrollIntoView({
            behavior: "smooth",
          });
        } else {
          indexScroll.current = 0;
          main?.children[0].scrollIntoView({
            behavior: "smooth",
          });
        }
      } else {
        if (indexScroll.current > 0) {
          indexScroll.current = indexScroll.current - 1;
          console.log(indexScroll.current);
          main?.children[indexScroll.current].scrollIntoView({
            behavior: "smooth",
          });
        } else {
          indexScroll.current = 0;
        }
      }
    }, 50);

    return () => {
      window.removeEventListener("mousewheel", handleScrolling);
    };
  }, [indexScroll]);

  return (
    <main>
      <Landing />
      <CurrentLocation />
      <Footer />
    </main>
  );
}

export default App;
