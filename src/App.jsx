import List from "./components/List";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen">
      <div className="bg-main min-h-screen min-w-full bg-center bg-repeat fixed top-0 left-auto z-[-1]"></div>
      <Header />
      <List />
    </div>
  );
}

export default App;
