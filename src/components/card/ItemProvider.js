import React, { Fragment, useState, useContext } from "react";
import foodItems from "./foodInfo";
import CardItem from "./CardItem";
import MyContext from "../context/UserContext";

const ItemProvider = () => {
  const { setCartValue, setIsBumpActive, setimporter } = useContext(MyContext);

  const initialQuantities = Array(foodItems.length).fill(0);
  const [quantities, setQuantities] = useState(initialQuantities);
  const [likeInputs, setLikeInputs] = useState([]);

  const handleQuantityChange = (index, newQuantity) => {
    newQuantity = isNaN(newQuantity) ? 0 : newQuantity;

    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = newQuantity;
      setLikeInputs(updatedQuantities);
      return updatedQuantities;
    });

    const isDanger = newQuantity > 10;
    const elements = document.querySelectorAll(".item-amount input");

    if (isDanger) {
      const element = elements[index];

      element.classList.add("danger");

      setTimeout(() => {
        element.value = "10";
        element.classList.remove("danger");
        handleQuantityChange(index, 10);
      }, 1000);
    } else {
      elements[index].classList.remove("danger");
    }
  };

  const handleAddToCart = () => {
    const totalItemsInCart = quantities.reduce(
      (acc, quantity) => acc + quantity,
      0
    );
    setimporter(likeInputs);
    setCartValue(totalItemsInCart);
    setIsBumpActive(true);

    setTimeout(() => {
      setIsBumpActive(false);
    }, 500);
  };

  const items = foodItems.map((item, index) => (
    <CardItem
      key={index}
      imgSrc={item.img}
      onClickBtn={handleAddToCart}
      foodName={item.name}
      price={
        quantities[index] > 10
          ? "Not Available"
          : `Amount : $${item.price * quantities[index]}`
      }
      staticPrice={`$${item.price}`}
      onChangeNum={(e) =>
        handleQuantityChange(index, parseInt(e.target.value, 10))
      }
    />
  ));

  return <Fragment>{items}</Fragment>;
};

export default ItemProvider;
