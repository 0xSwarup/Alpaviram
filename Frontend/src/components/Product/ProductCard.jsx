
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cart-action";
import Rating from "./Rating";
export const apiUrl = import.meta.env.VITE_URL;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  console.log("Product in ProductCard:", product); 

  const { _id, name, price, image, numReviews, rating, size, category, colour, desc } = product;

  console.log("Product ID:", _id); 

  const addToCartHandler = () => {
    dispatch(
      addToCart({ product_id: _id, name, price, image, numReviews, rating, size, category, colour, desc })
    );
  };

  return (
    <Link to={`/products/${_id}`}>
      <div className="card border border-slate-300 shadow-2xl w-64 rounded-sm my-4 bg-[#F0F0F0] hover:scale-105 hover:duration-300 hover:ease-in-out mx-3">
        <div className="img border border-slate-300">
          <img
            src={`${apiUrl}${image}`}
            alt="Product"
            className="object-fill"
          />
        </div>

        <div className="px-4 py-2 space-y-2">
          <div className="title text-xl tracking-wide">{name}</div>

          <div className="rating">
            <Rating text={`${numReviews} reviews`} value={rating} />
          </div>

          <div className="price flex space-x-1">
            <div className="price text-xl">NPR {price} /-</div>
          </div>

          <div className="button">
            <button
              onClick={addToCartHandler}
              className="w-full py-2 border border-black rounded-sm hover:bg-neutral-700 hover:ease-linear hover:left- hover:text-white hover:opacity-90 hover:duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
