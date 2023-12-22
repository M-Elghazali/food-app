import "./stylesCart.css";

function CartItem(props) {
  return (
    <div className="card-item">
      <div className="item-cart-container">
        <div className="item item-cart">
          <div className="img-bg">
            <img className="item-img-cart" src={props.imgSrc} alt="food" />
          </div>
          <h4 className="item-name">{props.foodName}</h4>
          <h5 className="item-name">{props.price}</h5>
          <h5 className="item-name">{props.staticPrice}</h5>
        </div>
        <button>{`x ${props.amount}`}</button>
      </div>
      <div className="item-amount cart-amount">
        <button className="btn btn-amount" onClick={props.ClickIncrease}>
          +
        </button>
        <button className="btn btn-amount" onClick={props.ClickDecrease}>
          -
        </button>
      </div>
    </div>
  );
}

export default CartItem;
