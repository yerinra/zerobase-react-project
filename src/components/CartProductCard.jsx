/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useCart } from "../context/CartContext";

const CartProductCard = ({ cartItem: item }) => {
  const { cart, setCart } = useCart();

  const navigate = useNavigate();
  const { id, title, price, description, category, image, rate, quantity } =
    item;
  const handleMinus = () => {
    if (quantity === 1) {
      setCart(cart.filter((cartItem) => cartItem.id !== id));
      return;
    }
    const reducedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });
    setCart(reducedCart);
  };
  const handlePlus = () => {
    // if (quantity === 10) {
    //   alert("10개까지만 살 수 있습니다.");
    //   return;
    // }
    const addedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
    setCart(addedCart);
  };
  return (
    <li className="flex flex-col md:flex-row rounded-lg shadow-md mb-3 gap-5 p-5">
      <div className="rounded-2xl flex justify-center bg-white">
        <img src={image} className="max-w-xs  shrink-0 px-10" />
      </div>
      <div className="flex flex-col items-start my-5 gap-3">
        <div className="text-base-content badge badge-ghost">{category}</div>
        <h2
          className="font-bold text-2xl"
          onClick={() => {
            console.log("clicked");
            navigate(`/product/${id}`, {
              state: item,
            });
          }}
        >
          {title}
        </h2>
        <h3 className="leading-5">{description}</h3>

        <div className="flex w-full items-center mt-2 ">
          <button
            className="text-xl font-extrabold btn btn-primary rounded-r-none"
            onClick={handleMinus}
          >
            <AiOutlineMinus />
          </button>
          <div className="bg-base-200 h-12 flex items-center justify-center text-xl w-1/3 text-base-content">
            {quantity}
          </div>
          <button
            className="btn btn-primary rounded-l-none text-xl font-extrabold"
            onClick={() => {
              console.log("clicked");
              handlePlus();
            }}
          >
            <AiOutlinePlus />
          </button>
          <div className="text-3xl ml-auto">{`$${price?.toLocaleString()}`}</div>
        </div>
      </div>
    </li>
  );
};

export default CartProductCard;
