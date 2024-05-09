import "./App.css";
import Landing from "./components/Landing";
import Main from "./components/Main.js";

function App() {
  function handleScrollBack() {
    const main = document.querySelector("main");
    main?.children[1].scrollIntoView();
  }
  return (
    <main>
      <Landing />
      <Main onSearch={handleScrollBack} />
    </main>
  );
}

export default App;
