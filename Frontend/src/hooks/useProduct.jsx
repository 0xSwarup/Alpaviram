import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "", // Corrected to match your backend schema
    price: 0,
    description: "",
    imagePath: "",
    stockCount: 0, // Corrected to match your backend schema
    categoryId: "", // Corrected to match your backend schema
    brandId: "", // Corrected to match your backend schema
    isFeatured: false, // Corrected to match your backend schema
  });

  const [oldImagePath, setOldImagePath] = useState("");

  const {
    productName,
    price,
    description,
    imagePath,
    stockCount,
    categoryId,
    brandId,
    isFeatured,
  } = formData;

  const [update, setUpdate] = useState(false);

  const getImagePath = async (file) => {
    if (imagePath !== "" && imagePath !== oldImagePath) {
      await axios.post(
        "http://localhost:3001/api/v1/product/deleteImage",
        { imagePath: imagePath },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axios.post(
      "http://localhost:3001/api/v1/product/uploadImage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data.imagePath;
  };

  const handleChange = async (event) => {
    let updatedFormData = { ...formData };
    if (event.target.name === "image") {
      const files = event.target.files;

      updatedFormData.imagePath = await getImagePath(files[0]);
    } else if (event.target.name === "isFeatured") {
      updatedFormData.isFeatured = event.target.checked;
    } else {
      updatedFormData[event.target.name] = event.target.value;
    }
    setFormData(updatedFormData);
  };

  const { token } = useSelector((state) => state.auth.token);

  const addProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/v1/product/",
        {
          productName,
          price,
          description,
          imagePath,
          stockCount,
          categoryId,
          brandId,
          isFeatured,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Product added successfully", {
        position: "top-right",
        style: { backgroundColor: "black", color: "white" },
      });
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product", {
        position: "top-right",
        style: { backgroundColor: "black", color: "white" },
      });
      return false;
    }
  };

  const updateProduct = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/v1/product/${id}`,
        {
          productName,
          price,
          description,
          imagePath,
          stockCount,
          categoryId,
          brandId,
          isFeatured,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      await axios.post(
        "http://localhost:3001/api/v1/product/deleteImage",
        { imagePath: oldImagePath },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Product updated successfully", {
        position: "top-right",
        style: { backgroundColor: "black", color: "white" },
      });
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product", {
        position: "top-right",
        style: { backgroundColor: "black", color: "white" },
      });
      return false;
    }
  };

  const onSubmit = async (event, id) => {
    event.preventDefault();
    let success = false;
    if (id) {
      success = await updateProduct(id);
    } else {
      success = await addProduct();
    }
    if (success) {
      navigate("/products"); // Redirect to product list page or success route
    }
  };

  const resetForm = () => {
    setFormData({
      productName: "",
      price: 0,
      description: "",
      imagePath: "",
      stockCount: 0,
      categoryId: "",
      brandId: "",
      isFeatured: false,
    });
    setOldImagePath("");
    setUpdate(false);
  };

  return {
    productName,
    price,
    description,
    imagePath,
    stockCount,
    categoryId,
    brandId,
    isFeatured,
    onSubmit,
    handleChange,
    resetForm,
    setFormData,
    setUpdate,
    setOldImagePath,
  };
}
