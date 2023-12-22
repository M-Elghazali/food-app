import "./styles.css";
import React, { useEffect } from "react";

function CardItem(props) {
  return (
    <div className="card-item">
      <div className="item">
        <div className="img-bg">
          <img className="item-img" src={props.imgSrc} alt="food" />
        </div>
        <h4 className="item-name">{props.foodName}</h4>
        <h5 className="item-name">{props.price}</h5>
        <h5 className="item-name">{props.staticPrice}</h5>
      </div>
      <div className="item-amount">
        <input
          type="number"
          min={0}
          max={10}
          placeholder="0"
          onChange={props.onChangeNum}
          className=""
        />
        <button className={props.btnClass} onClick={props.onClickBtn}>
          Add
        </button>
      </div>
    </div>
  );
}

export default CardItem;
