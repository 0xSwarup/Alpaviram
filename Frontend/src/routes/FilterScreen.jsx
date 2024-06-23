import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/Product/ProductCard";

const FilterScreen = () => {
  const defaultFilter = {
    category_id: 0,
    brand_id: 0,
    rating: 6,
    range: 0,
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySearch = searchParams.get("category") || "";
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(defaultFilter);
  const [updatedList, setUpdatedList] = useState([]);

  const resetFilter = () => {
    setFilters(defaultFilter);
    fetchProducts();
  };

  const fetchProducts = async (filterParams = {}) => {
    const { data } = await axios.get("http://localhost:3001/api/v1/products", {
      params: filterParams,
    });
    setProducts(data.products);
    setUpdatedList(data.products);
  };

  const addFilter = (filter) => {
    const newFilters = { ...filters, ...filter };
    setFilters(newFilters);
    fetchProducts(newFilters);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get("http://localhost:3001/api/v1/categories");
      setCategories(data);
    };
    const fetchBrands = async () => {
      const { data } = await axios.get("http://localhost:3001/api/v1/brands");
      setBrands(data);
    };
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto pb-6">
        <div className="flex w-full justify-center items-center gap-8 bg-[#2C2C2C] opacity-90 rounded-sm">
          <h1 className="text-white text-xl font">Filter :</h1>
          <div className="flex flex-col py-4 items-center">
            <select
              required
              defaultValue={"0"}
              name="category_id"
              title="category_id"
              onChange={(e) => {
                addFilter({ category: e.target.value });
              }}
              className="px-4 py-2 border border-gray-500 rounded-md"
            >
              <option value="0">Choose Category</option>
              {categories.map((category) => (
                <option value={category.category_id} key={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col py-4 items-center">
            <select
              required
              defaultValue={"0"}
              name="brand_id"
              title="brand_id"
              className="px-4 py-2 border border-gray-500 rounded-md"
              onChange={(e) => {
                addFilter({ brand: e.target.value });
              }}
            >
              <option value="0">Choose Brand</option>
              {brands.map((brand) => (
                <option value={brand.brand_id} key={brand.brand_id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col py-4 items-center">
            <select
              required
              defaultValue={"0"}
              name="price"
              title="price"
              className="px-6 py-2 text-center border border-gray-500 rounded-md"
              onChange={(e) => {
                addFilter({ range: e.target.value });
              }}
            >
              <option value="0">Any Price</option>
              <option value="11-20">11 - 20</option>
              <option value="0-10">0 - 10</option>
            </select>
          </div>
          <div className="flex flex-col py-4 items-center">
            <select
              required
              defaultValue={"6"}
              name="rating"
              title="rating"
              className="px-6 py-2 text-center border border-gray-500 rounded-md"
              onChange={(e) => {
                addFilter({ rating: e.target.value });
              }}
            >
              <option value="6">Any Rating</option>
              <option value="5">5</option>
              <option value="4.5">4.5</option>
              <option value="4">4</option>
              <option value="3.5">3.5</option>
              <option value="3">3</option>
              <option value="2.5">2.5</option>
              <option value="2">2</option>
              <option value="1.5">1.5</option>
              <option value="1">1</option>
              <option value="0.5">0.5</option>
              <option value="0">Not rated</option>
            </select>
          </div>
          <p
            className="text-black px-5 py-2 bg-gray-200 rounded-md text-sm cursor-pointer"
            onClick={resetFilter}
          >
            Reset
          </p>
        </div>
        <div className="title flex justify-center py-2 my-4">
          <span className="font-medium text-xl uppercase md:text-2xl px-4 tracking-wide">
            All Products under category "{categorySearch || "All"}"
          </span>
        </div>
        <div className="flex flex-wrap justify-evenly px-4">
          {updatedList.map((product) => (
            <ProductCard product={product} key={product.product_id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterScreen;
