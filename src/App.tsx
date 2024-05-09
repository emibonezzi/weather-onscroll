import "./App.css";
import Landing from "./components/Landing";
import Main from "./components/Main.js";

function App() {
  function handleScrollBack() {
    const main = document.querySelector("#current-location");
    main?.children[0].scrollIntoView();
  }
  return (
    <main>
      <Landing />
      <Main onSearch={handleScrollBack} />
    </main>
  );
}

export default App;
