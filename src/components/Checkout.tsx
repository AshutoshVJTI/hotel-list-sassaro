import React from "react";
import { hotel } from "../types/@types";
import { useNavigate } from "react-router-dom";

interface CheckoutProps {
  items: hotel[];
  idCount: { id: number; count: number }[];
}

const Checkout = (props: CheckoutProps) => {
  const { items, idCount } = props;
  const navigate = useNavigate();

  const totalCost = items.reduce((acc, item) => {
    const { count } = idCount.find((ic) => ic.id === parseInt(item.id)) || {
      count: 0,
    };
    return acc + parseInt(item.price) * count;
  }, 0);

  const cartItems = items.map((item) => {
    const { count } = idCount.find((ic) => ic.id === parseInt(item.id)) || {
      count: 0,
    };
    const adjustedPrice = parseInt(item.price) * count;
    return (
      <div key={item.id} className="flex justify-between py-2">
        <span>{item.name}</span>
        <span>
          {count} x {parseInt(item.price)} = {adjustedPrice}
        </span>
      </div>
    );
  });

  const checkoutForm = (
    <form>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg">Name:</label>
        <input
          className="border border-gray-400 py-2 px-3 text-lg"
          type="text"
          name="name"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg">Email:</label>
        <input
          className="border border-gray-400 py-2 px-3 text-lg"
          type="email"
          name="email"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg">Address:</label>
        <input
          className="border border-gray-400 py-2 px-3 text-lg"
          type="text"
          name="address"
          required
        />
      </div>
      <button
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        type="submit"
      >
        Checkout
      </button>
      <button
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
    </form>
  );

  return (
    <div className="container mx-auto px-4 my-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="bg-white rounded-lg p-6 lg:p-8">
          <h2 className="text-xl font-bold mb-4">Cart</h2>
          <div className="space-y-4">{cartItems}</div>
          <div className="text-lg font-bold mt-2">Total: {totalCost}</div>
        </div>
        <div className="bg-white rounded-lg p-6 lg:p-8">
          <h2 className="text-xl font-bold mb-4">Checkout Form</h2>
          {checkoutForm}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
