import React, { useState } from "react";
import HotelList from "../components/HotelList";
import Cart from "../components/Cart";
import NavBar from "../components/NavBar";
import { hotel } from "../types/@types";

interface HomepageProps {
  cartIds: number[];
  setCartIds: React.Dispatch<React.SetStateAction<number[]>>;
  hotels: hotel[];
}

const HomePage = (props: HomepageProps) => {
  const { cartIds, setCartIds, hotels } = props;
  const [showCartPage, setShowCartPage] = useState<boolean>(false);

  return (
    <div>
      <NavBar
        cartCount={new Set(cartIds).size}
        showCartPage={showCartPage}
        setShowCartPage={setShowCartPage}
      />

      {showCartPage ? (
        <Cart cartIds={cartIds} setCartIds={setCartIds} hotels={hotels} />
      ) : (
        <HotelList setCartIds={setCartIds} cartIds={cartIds} hotels={hotels} />
      )}
    </div>
  );
};

export default HomePage;
