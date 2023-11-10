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
    <li className="card flex flex-col items-center justify-between md:flex-row rounded-lg shadow-lg gap-5 p-5 py-10 max-h-[600px]">
      <div className="flex justify-center items-center rounded-2xl my-auto p-10 w-[200px] h-full max-h-[400px] bg-white">
        <img src={image} className="" />
      </div>
      <div className="flex flex-col gap-3 w-full ">
        <div className="text-base-content badge badge-ghost capitalize">
          {category}
        </div>
        <h2
          className="font-bold text-2xl hover:underline cursor-pointer"
          onClick={() => {
            console.log("clicked");
            navigate(`/product/${id}`, {
              state: item,
            });
          }}
        >
          {title}
        </h2>

        <div className="flex w-full items-center justify-between mt-2 ">
          <div className="flex">
            <button
              className="text-xl font-extrabold btn btn-primary rounded-r-none w-18"
              onClick={handleMinus}
            >
              <AiOutlineMinus />
            </button>
            <div className="bg-base-200 h-12 flex items-center justify-center text-xl w-24 text-base-content">
              {quantity}
            </div>
            <button
              className="btn btn-primary rounded-l-none text-xl w-18 font-extrabold"
              onClick={() => {
                console.log("clicked");
                handlePlus();
              }}
            >
              <AiOutlinePlus />
            </button>
          </div>
          <div className="text-3xl pr-5">{`$${price?.toLocaleString()}`}</div>
        </div>
      </div>
    </li>
  );
};

export default CartProductCard;
