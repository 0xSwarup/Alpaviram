// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getFeaturedProductList } from "../features/featuredProducts/product-actions";
// import ProductCard from "../components/Product/ProductCard";
// import Banner from "../components/Product/Banner";

// const Products = () => {
//   const dispatch = useDispatch();
//   const featuredProductList = useSelector((state) => state.featuredProductList);

//   useEffect(() => {
//     dispatch(getFeaturedProductList());
//   }, [dispatch]);

//   if (!featuredProductList || featuredProductList.loading) {
//     return <p>Loading...</p>;
//   }

//   if (featuredProductList.error) {
//     return <p>Error: {featuredProductList.error.message}</p>;
//   }

//   if (!Array.isArray(featuredProductList.products) || featuredProductList.products.length === 0) {
//     return <p>No products found.</p>;
//   }

//   return (
//     <>
//       <Banner />
//       <div className="px-6 py-6 max-w-screen-2xl mx-auto">
//         <div className="title flex justify-center py-2">
//           <span className="font-medium text-xl uppercase md:text-2xl px-4 tracking-wide">
//             Featured Products
//           </span>
//         </div>

//         <div className="flex flex-wrap justify-evenly px-4">
//           {featuredProductList.products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Products;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedProductList } from "../features/featuredProducts/product-actions";
import ProductCard from "../components/Product/ProductCard";
import Banner from "../components/Product/Banner";

const Products = () => {
  const dispatch = useDispatch();
  const featuredProductList = useSelector((state) => state.featuredProductList);

  useEffect(() => {
    dispatch(getFeaturedProductList());
  }, [dispatch]);

  if (!featuredProductList || featuredProductList.loading) {
    return <p>Loading...</p>;
  }

  if (featuredProductList.error) {
    return <p>Error: {featuredProductList.error.message}</p>;
  }

  if (!Array.isArray(featuredProductList.products) || featuredProductList.products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <>
      <Banner />
      <div className="px-6 py-6 max-w-screen-2xl mx-auto">
        <div className="title flex justify-center py-2">
          <span className="font-medium text-xl uppercase md:text-2xl px-4 tracking-wide">
            Featured Products
          </span>
        </div>

        <div className="flex flex-wrap justify-evenly px-4">
          {featuredProductList.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
