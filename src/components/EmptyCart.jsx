import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center gap-7">
      <div className="text-lg">There’s nothing in your bag yet.</div>
      <div
        className="btn btn-primary text-slate-100"
        onClick={() => navigate("/")}
      >
        Go Shop
      </div>
    </section>
  );
};

export default EmptyCart;
