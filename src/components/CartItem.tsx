import React from "react";
import { hotel } from "../types/@types";

interface CartItemProps {
  item: hotel;
  count: number;
  onRemoveItem: (id: number) => void;
}

const CartItem = ({ item, count, onRemoveItem }: CartItemProps) => {
  const { id, name } = item;

  const handleRemoveItem = () => {
    onRemoveItem(parseInt(id));
  };

  return (
    <div className="flex flex-col md:flex-row items-center py-4 border-b">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <label htmlFor={`quantity_${id}`} className="mr-2">
            Days:
          </label>
          <input
            id={`quantity_${id}`}
            type="number"
            min="1"
            value={count}
            className="w-16 px-2 py-1 text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleRemoveItem}
            className="ml-4 text-sm text-red-500 focus:outline-none hover:text-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
