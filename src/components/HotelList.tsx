import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { hotel } from "../types/@types";

interface HotelListProps {
  cartIds: number[];
  setCartIds: React.Dispatch<React.SetStateAction<number[]>>;
  hotels: hotel[];
}

const HotelList = (props: HotelListProps) => {
  const { cartIds, setCartIds, hotels } = props;

  const handleAddToCartClick = (id: number) => {
    const selectedItem = hotels.find((hotel) => parseInt(hotel.id) === id);
    if (!selectedItem) {
      console.error(`Item with ID ${id} not found.`);
      return;
    }
    setCartIds([...cartIds, id]);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <ListGroup>
            {hotels.map((hotel) => (
              <ListGroupItem key={hotel.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{hotel.name}</h5>
                    <p>{hotel.address}</p>
                    <p>Rating: {hotel.rating}</p>
                    <p>{hotel.description}</p>
                  </div>
                  <div className="d-flex flex-column align-items-start">
                    <p>₹{hotel.price} per night</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCartClick(parseInt(hotel.id))}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
