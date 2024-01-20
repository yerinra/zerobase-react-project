import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiSun, BiMoon, BiShoppingBag } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";

const categories = ["women", "men", "jewelery"];

const NavBar = ({ showMenu, setShowMenu }) => {
  const navigate = useNavigate("");
  const [keyword, setKeyword] = useState("");
  const { allProducts, error, isLoading } = useProducts();
  const [list, setList] = useState([]);
  const [theme, setTheme] = useState("light");
  const { cart } = useCart();

  const handleChange = (e) => {
    setKeyword(e.target.value);
    setList(
      allProducts.filter(
        (product) =>
          product.category !== "electronics" &&
          product.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  };
  const handleSelect = (item) => {
    navigate(`/product/${item.id}`, { state: item });
    setKeyword("");
  };
  // useEffect(() => console.log(list, keyword), [showMenu]);
  useEffect(
    () => document.querySelector("html").setAttribute("data-theme", theme),
    [theme]
  );
  const toggleDark = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("light");
  };
  return (
    <section
      className={clsx({
        "flex justify-between items-center w-screen h-16 text-base-content text-xl p-2 shadow-md": true,
        "bg-base-300 ": theme === "light",
        "bg-neutral-900 text-neutral-200": theme === "dark",
      })}
    >
      <div className="flex items-center shrink-0">
        <div className="ml-2">
          <button
            className={"md:hidden block btn bg-inherit border-none"}
            onClick={() => setShowMenu(true)}
          >
            <FaBars />
          </button>
          {showMenu && (
            <ul
              tabIndex={0}
              className={clsx({
                "fixed left-0 top-0 p-3 z-20 bg-base-100 w-52 h-screen ": true,
                "-left-80": !showMenu,
                "left-0": showMenu,
              })}
            >
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => {
                    navigate(`/${cat}`);
                    setShowMenu(false);
                  }}
                  className="flex items-center justify-start btn btn-ghost cursor-pointer hover:font-bold"
                >
                  {cat.toUpperCase()}
                </li>
              ))}
            </ul>
          )}
        </div>
        <h1
          className="font-bold tracking-tight mr-3 text-2xl cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          React Shop
        </h1>
      </div>
      <ul className="hidden md:flex gap-3">
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => navigate(`/${cat}`)}
            className="btn btn-ghost normal-case text-md"
          >
            {cat.toUpperCase()}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center mr-4 text-2xl">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" id="input" />
            <BiSun className="swap-on" onClick={toggleDark} />
            <BiMoon className="swap-off" onClick={toggleDark} />
          </label>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={handleChange}
            className="text-lg bg-base-100 p-2 rounded-lg w-full max-w-xs outline-none"
          />
        </form>
        {list && keyword && (
          <ul className="fixed right-[66px] top-[64px] py-3z-20 bg-base-100 shadow-md w-52">
            {list.map((item) => (
              <li
                key={item.id}
                className="btn btn-ghost rounded-none flex justify-start truncate capitalize font-semibold text-md"
                onClick={() => {
                  handleSelect(item);
                }}
              >
                {item.title.slice(0, 20) + "..."}
              </li>
            ))}
          </ul>
        )}
        <button
          className="text-3xl px-3 pr-5"
          onClick={() => navigate("/cart")}
        >
          {/* btn btn-ghost  */}
          <BiShoppingBag />
          {cart && cart.length > 0 && (
            <div className="absolute top-5 flex items-center justify-center right-5 bg-secondary h-4 w-5 font-bold text-base-100 rounded-full text-[10px]">
              {cart.reduce((prev, curr) => prev + curr.quantity, 0)}
            </div>
          )}
        </button>
      </div>
    </section>
  );
};

export default NavBar;
