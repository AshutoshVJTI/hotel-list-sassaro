import { hotel } from "../types/@types";

const endPointURL = "https://641b466d9b82ded29d4eadd2.mockapi.io/hotels";

export const getHotels = async () => {
  const response = await fetch(endPointURL);
  const data = await response.json();
  return data;
};

export const addHotel = (hotel: hotel) => {
  return fetch(endPointURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hotel),
  });
};
