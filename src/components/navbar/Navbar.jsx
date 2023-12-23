// Importing necessary dependencies and styles
import React, { Fragment, useState, useEffect, useContext } from "react";
import "./navbar.css";
import OverlayBox from "../overlay/Overlay";
import Total from "../cart/Total";
import CartItem from "../card/CartItem";
import foodItems from "../card/foodInfo";
import MyContext from "../context/UserContext";

// Navbar component definition
function Navbar({ cartState, cartIconClass, value }) {
  // State for the amount of each item added to the cart
  const [addedAmount, setAddAmount] = useState(
    value.filter((item) => item !== 0)
  );

  // State for controlling the visibility of the overlay
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // State for the total price of items in the cart
  const [totalPrice, setTotalPrice] = useState(null);

  // Context for managing the global cart value
  const { setCartValue } = useContext(MyContext);

  // Effect to update addedAmount state when the value prop changes

  // Function to increase the quantity of a specific item in the cart
  const Increase = (index) => {
    const newAmount = [...addedAmount];
    if (newAmount[index] === 10) {
      return;
    }
    newAmount[index] += 1;
    setAddAmount(newAmount);
    setCartValue(newAmount.reduce((acc, quantity) => acc + quantity, 0));
    value = newAmount;
  };

  // Function to decrease the quantity of a specific item in the cart
  const Decrease = (index) => {
    const newAmount = [...addedAmount];
    if (newAmount[index] === 0) {
      return;
    }
    newAmount[index] -= 1;
    setAddAmount(newAmount);
    setCartValue(newAmount.reduce((acc, quantity) => acc + quantity, 0));
    value = newAmount;
  };

  useEffect(() => {
    setAddAmount(value.filter((item) => item !== 0));
    console.log(value);
  }, [value]);
  // Filter items with non-zero quantities
  const addedItem = foodItems.filter((item, index) => value[index] !== 0);

  // Calculate the total price of items in the cart
  let totalPce = addedItem.reduce((acc, item, index = 0) => {
    return acc + item.price * addedAmount[index];
  }, 0);

  // Update total price when totalPce changes
  useEffect(() => {
    setTotalPrice(totalPce);
  }, [totalPce]);

  // Map items to CartItem components
  const items = addedItem.map((item, index) => (
    <CartItem
      key={item.id}
      imgSrc={item.img}
      foodName={item.name}
      staticPrice={`$${item.price}`}
      amount={addedAmount[index]}
      ClickDecrease={() => Decrease(index)}
      ClickIncrease={() => Increase(index)}
    />
  ));

  // Open overlay function
  const openOverlay = () => {
    setIsOverlayVisible(true);
  };

  // Close overlay function
  const closeOverlay = () => {
    setIsOverlayVisible(false);
  };

  // JSX structure for the Navbar component
  return (
    <Fragment>
      {isOverlayVisible && (
        <OverlayBox onClose={closeOverlay}>
          {items}
          <div className="cart-last">
            <Total calc={totalPrice} />
            <div className="cart-last-btns">
              <button onClick={closeOverlay}>Cancel</button>
              <button onClick={() => console.log(addedItem)}>Checkout</button>
            </div>
          </div>
        </OverlayBox>
      )}
      <div className="navbar">
        <div className="logo">
          Fo<span>ody</span>
        </div>
        <div className="btns">
          <button>Login</button>
          <div className={cartIconClass} onClick={openOverlay}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span>{cartState}</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// Exporting the Navbar component
export default Navbar;
