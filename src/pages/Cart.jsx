import CartProductCard from "../components/CartProductCard";
import EmptyCart from "../components/EmptyCart";
import { useCart } from "../context/CartContext";

const DELIVERY_FEE = 15;
const Cart = () => {
  const { cart, setCart } = useCart();
  const totalPrice = cart.reduce(
    (prevItem, currItem) => prevItem + currItem.price * currItem.quantity,
    0
  );
  const showModal = () => {};
  return (
    <div className="flex flex-col px-10 py-10 gap-5 bg-base-100">
      <div className="text-3xl font-extrabold pb-5">SHOPPING BAG</div>
      {cart.length == 0 && <EmptyCart />}
      {cart && cart.length > 0 && (
        <ul className="flex flex-col gap-3">
          {cart.map((cartItem) => (
            <CartProductCard key={cartItem.id} cartItem={cartItem} />
          ))}
        </ul>
      )}

      {cart && cart.length > 0 && (
        <section className="flex flex-col justify-center items-start gap-2 px-3">
          <div className="text-xl">Summary</div>
          <div className="flex justify-between items-center w-full">
            <div>Subtotal</div>
            <div>{`$${totalPrice.toLocaleString()}`}</div>
          </div>
          <div className="flex justify-between w-full">
            <div>Delivery</div>
            <div>{`$${DELIVERY_FEE.toLocaleString()}`}</div>
          </div>
          <div className="divider" />
          <div className="flex items-center justify-between w-full">
            <div className="">Total</div>
            <div className="text-xl">{`$${(
              totalPrice + DELIVERY_FEE
            ).toLocaleString()}`}</div>
          </div>
        </section>
      )}

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary text-xl text-neutral-100"
        onClick={() => document.getElementById("my_modal_1").showModal()}
        disabled={!cart || cart.length == 0}
      >
        Go To Checkout
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you Sure?</h3>
          <p className="py-4">
            All of the items will be removed from the cart!
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-success" onClick={() => setCart([])}>
                Checkout
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Cart;
