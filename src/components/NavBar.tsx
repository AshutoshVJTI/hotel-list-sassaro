import { GiShoppingCart } from "react-icons/gi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HotelForm from "./HotelForm";
import { Modal } from "react-bootstrap";

interface NavBarProps {
  cartCount: number;
  showCartPage: boolean;
  setShowCartPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ cartCount, showCartPage, setShowCartPage }: NavBarProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleCartClick = () => {
    setShowCartPage(!showCartPage);
    setIsMenuOpen(false);
  };
  const handleHotelsClick = () => {
    setShowCartPage(false);
    setIsMenuOpen(false);
  };
  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);
  const handleAddHotel = () => {
    setShowForm(!showForm);
  };

  return (
    <nav className="bg-gray-600 py-4 mb-6">
      <div className="container flex justify-between items-center">
        <button
          className="text-2xl font-bold text-white"
          onClick={() => navigate("/")}
        >
          Saasaro
        </button>
        <div className="flex items-center">
          <button
            className="block md:hidden mr-4 text-white"
            onClick={handleMenuClick}
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 6h16v2H4v-2zm16 4H4v-2h16v2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 6h18v2H3V6zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
                />
              )}
            </svg>
          </button>
          <div
            className={`${isMenuOpen ? "" : "hidden"} md:flex md:items-center`}
          >
            <button
              className="px-2 py-1 text-lg font-medium text-white rounded-lg hover:bg-white hover:text-black transition-all underline md:mx-4"
              onClick={handleHotelsClick}
            >
              Hotels
            </button>
            <button
              className="relative px-3 py-2 text-lg font-medium text-white rounded-md bg-gray-900 hover:bg-white hover:text-black transition-all md:mx-4"
              onClick={handleCartClick}
            >
              <GiShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 px-2 text-xs text-white bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={handleAddHotel}
              className="bg-white p-2 rounded ml-4"
            >
              Add Hotel
            </button>
          </div>
        </div>
      </div>
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HotelForm setShowForm={setShowForm} />
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default NavBar;
