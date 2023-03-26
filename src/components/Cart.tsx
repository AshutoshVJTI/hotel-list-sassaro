import React, { useEffect, useState } from "react";
import { hotel } from "../types/@types";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

interface CartProps {
  cartIds: number[];
  setCartIds: React.Dispatch<React.SetStateAction<number[]>>;
  hotels: hotel[];
}

const Cart = (props: CartProps) => {
  const { cartIds, setCartIds, hotels } = props;
  const [cartItems, setCartItems] = useState<hotel[]>([]);
  const [idCount, setIdCount] = useState<{ id: number; count: number }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredItems = hotels.filter((hotel) =>
      cartIds.includes(parseInt(hotel.id))
    );
    setCartItems(filteredItems);

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

  const onRemoveItem = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => parseInt(item.id) !== id)
    );
    setCartIds((prevCartIds) => prevCartIds.filter((cartId) => cartId !== id));
  };

  const checkoutButton =
    cartItems.length > 0 ? (
      <button
        onClick={() => {
          navigate("/checkout");
        }}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Checkout
      </button>
    ) : null;

  return (
    <div className="container">
    <div className="flex flex-col justify-start px-4 py-6 sm:px-6 lg:px-8 w-1/2 mx-auto">
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              count={
                idCount.find((count) => count.id === parseInt(item.id))
                  ?.count || 1
              }
              onRemoveItem={onRemoveItem}
            />
          ))}
          {checkoutButton}
        </>
      )}
    </div>
    </div>
  );
};

export default Cart;
