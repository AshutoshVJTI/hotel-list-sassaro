import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { hotel } from "../types/@types";
import { addHotel } from "../utils/api";

interface HotelFormProps {
  setShowForm: (showForm: boolean) => void;
}

const HotelForm = (props: HotelFormProps) => {
  const { setShowForm } = props;
  const [hotelDetails, setHotelDetails] = useState<hotel>({
    name: "",
    address: "",
    rating: "0",
    description: "",
    createdAt: new Date().toISOString(),
    id: "",
    price: "",
  });
  const handleChange = (e: any) => {
    setHotelDetails({ ...hotelDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addHotel(hotelDetails);
    setShowForm(false);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter hotel name"
            name="name"
            value={hotelDetails.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter hotel address"
            name="address"
            value={hotelDetails.address}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicRating">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter hotel rating"
            name="rating"
            value={hotelDetails.rating}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter hotel description"
            name="description"
            value={hotelDetails.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter room price"
            name="price"
            value={hotelDetails.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default HotelForm;
