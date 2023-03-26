import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import { useState, useEffect } from "react";
import { hotel } from "./types/@types";
import { getHotels } from "./utils/api";

function App() {
  const [cartIds, setCartIds] = useState<number[]>([]);
  const [items, setItems] = useState<hotel[]>([]);
  const [hotels, setHotels] = useState<hotel[]>();
  const [idCount, setIdCount] = useState<{ id: number; count: number }[]>([]);

  useEffect(() => {
    getHotels().then((hotels) => {
      setHotels(hotels);
    });
  }, []);

  useEffect(() => {
    if (!hotels) return;
    const filteredItems = hotels.filter((hotel) =>
      cartIds.includes(parseInt(hotel.id))
    );
    setItems(filteredItems);

    const countIdValues = cartIds.reduce<{ id: number; count: number }[]>(
      (acc, id) => {
        const existingIndex = acc.findIndex((item) => item.id === id);
        if (existingIndex !== -1) {
          acc[existingIndex].count++;
        } else {
          acc.push({ id, count: 1 });
        }
        return acc;
      },
      []
    );
    setIdCount(countIdValues);
  }, [cartIds, hotels]);
  if (!hotels) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              cartIds={cartIds}
              setCartIds={setCartIds}
              hotels={hotels}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              items={items}
              idCount={idCount}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
