import "./navbar.css";
import React, { Fragment, useState, useEffect, useContext } from "react";
import OverlayBox from "../overlay/Overlay";
import Total from "../cart/Total";
import CartItem from "../card/CartItem";
import foodItems from "../card/foodInfo";
import MyContext from "../context/UserContext";

function Navbar({ cartState, cartIconClass, value }) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);

  const { setCartValue } = useContext(MyContext);

  const totalItemsInCart = value.reduce((acc, quantity) => acc + quantity, 0);
  const openOverlay = () => {
    setIsOverlayVisible(true);
  };

  let totalPce = foodItems.reduce(
    (acc, item, index) => acc + item.price * value[index],
    0
  );

  useEffect(
    () => {
      setTotalPrice(totalPce);
      setCartValue(totalItemsInCart);
    },
    [totalPce],
    [totalItemsInCart]
  );

  const closeOverlay = () => {
    setIsOverlayVisible(false);
  };

  const addedItem = foodItems.filter((item, index) => value[index] > 0);
  const [addedAmount, setAddamount] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setAddamount(value);
  }, [value]);

  const Decrease = (index) => {
    const updatedItems = [...addedAmount];
    if (updatedItems[index] > 0) {
      updatedItems[index] -= 1;
      setAddamount(updatedItems);
      value[index] -= 1;
    }
    if (value[index] <= 0) {
      value[index] = 0;
    }
  };

  const Increase = (index) => {
    // index here is the index of the item of foodItems
    const updatedItems = [...addedAmount];
    if (updatedItems[index] < 10) {
      updatedItems[index] += 1;
    }
    setAddamount(updatedItems);
    if (value[index] < 10) {
      value[index] += 1;
    }
  };

  const items = addedItem.map((item, index) => {
    return (
      <CartItem
        key={item.id}
        imgSrc={item.img}
        foodName={item.name}
        staticPrice={`$${item.price}`}
        amount={addedAmount[index]}
        ClickDecrease={() => Decrease(index)}
        ClickIncrease={() => Increase(index)}
      />
    );
  });
  return (
    <Fragment>
      {isOverlayVisible && (
        <OverlayBox onClose={closeOverlay}>
          {items}
          <div className="cart-last">
            <Total calc={totalPrice} />
            <div className="cart-last-btns">
              <button onClick={closeOverlay}>Cancel</button>
              <button onClick={() => console.log("Checkout")}>Checkout</button>
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

export default Navbar;
