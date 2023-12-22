import React from "react";
import MyContext from "../context/UserContext";
import { useContext } from "react";
function Total({ calc }) {
  return <p className="total-amount">Total Amount : {`$${calc}`}</p>;
}

export default Total;
