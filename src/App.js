import "./App.css";
import Card from "./components/card/Card";
import CardInfo from "./components/card/CardInfo";
import ItemProvider from "./components/card/ItemProvider";
import Main from "./components/card/Main";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import MyContext from "./components/context/UserContext";

function App() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartValue, setCartValue] = useState(0);
  const [isBumpActive, setIsBumpActive] = useState(false);
  const [importer, setimporter] = useState([0, 0, 0, 0]);

  return (
    <MyContext.Provider
      value={{
        totalPrice,
        setTotalPrice,
        cartValue,
        setCartValue,
        setIsBumpActive,
        setimporter,
      }}
    >
      <div className="App">
        <Navbar
          cartState={cartValue}
          value={importer}
          cartIconClass={`cart ${isBumpActive ? "bump" : ""}`}
        />
        <Main />
        <CardInfo />
        <Card>
          <ItemProvider />
        </Card>
      </div>
    </MyContext.Provider>
  );
}

export default App;
