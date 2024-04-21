import { debounce } from "./debounce";

// wrap the function that "scrolls" into debounce
export const handleScrolling = debounce((e) => {
  if (e.wheelDelta <= 0) {
    indexScroll++;
    console.log("FORWARD", indexScroll);

    if (indexScroll < hero.children.length) {
      hero.children[indexScroll].scrollIntoView({ behavior: "smooth" });
    } else {
      indexScroll = 0;
      hero.children[indexScroll].scrollIntoView({ behavior: "smooth" });
    }
  } else {
    indexScroll--;
    console.log("BACKWARD", indexScroll);

    if (indexScroll >= 0) {
      hero.children[indexScroll].scrollIntoView({ behavior: "smooth" });
    } else {
      indexScroll = 0;
    }
  }
}, 50);
