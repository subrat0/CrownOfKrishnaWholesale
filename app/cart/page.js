"use client";
import React, { useState, useEffect, useMemo } from "react";
import products from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [isProceeding, setIsProceeding] = useState(false);
  const [errors, setErrors] = useState({ name: "", phone: "", address: "" });
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [messageNote, setMessageNote] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // 🟢 Random ID generate only once
  const randomNum = useMemo(() => {
    function generateRandomId(length = 10) {
      return Math.random().toString(36).substring(2, length + 2);
    }
    return generateRandomId();
  }, []);

  // Fetch cart items and customer info from local storage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const savedInfo = JSON.parse(localStorage.getItem("customerInfo") || "{}");
    setCartItems(cart);
    setCustomerInfo({
      name: savedInfo.name || "",
      phone: savedInfo.phone || "",
      address: savedInfo.address || "",
    });
    setLoading(false);
  }, []);

  // Update quantity of an item
  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cartItems];
    const maxQuantity =
      updatedCart[index].size !== null
        ? products
            .find((p) => p.id === updatedCart[index].productId)
            ?.sizes.find((s) => s.size === updatedCart[index].size)?.quantity ||
          1
        : products.find((p) => p.id === updatedCart[index].productId)
            ?.quantity || 1;

    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      updatedCart[index].quantity = newQuantity;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Remove item from cart
  const handleRemoveItem = (index) => {
    if (confirm("Are you sure you want to remove this item?")) {
      const updatedCart = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Validate inputs
  const validateInputs = () => {
    const newErrors = { name: "", phone: "", address: "" };
    let isValid = true;

    if (!customerInfo.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d+$/.test(customerInfo.phone.trim())) {
      newErrors.phone = "Phone number must contain only numbers";
      isValid = false;
    }
    if (!customerInfo.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle Proceed to Order
  const handleProceedToOrder = () => {
    if (!validateInputs()) return;

    setIsProceeding(true);
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));

    const orderDetails = {
      cartItems,
      customerInfo,
      messageNote,
      total: calculateTotal(),
    };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    setShowNotification(true);
    router.push(`/ordernow/${randomNum}/`);
  };

  // Handle input changes
  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    if (name === "phone" && value && !/^\d+$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Phone number must contain only numbers",
      }));
    }
  };

  // Hide notification after 3 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <div className="min-h-screen text-white p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center cursor-pointer">
        Your Cart
      </h1>
      {showNotification && (
        <div className="fixed top-4 right-4 bg-black text-amber-50 p-4 rounded-2xl border border-gray-300 shadow-lg z-50 animate-fade-in cursor-pointer">
          Proceeding to order summary...
        </div>
      )}
      {loading ? (
        <div className="text-center text-gray-300 cursor-pointer">
          Loading...
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center text-gray-300 flex flex-col justify-center items-center cursor-pointer">
          <p>Your cart is empty.</p>
          <Link
            href="/"
            className="cursor-pointer bg-black text-blue-500 no-underline border-2 p-2 rounded-2xl my-2 hover:bg-black hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="border rounded-2xl bg-black p-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-gray-700 py-4 justify-between"
              >
                <div className="content flex items-center gap-4 cursor-pointer">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-cover rounded-lg w-20"
                  />
                  <div className="flex-1">
                    <h2 className="md:text-xl font-semibold text-[20px] cursor-pointer">
                      {item.title}
                    </h2>
                    <p className="text-gray-300 md:text-xl text-[15px] cursor-pointer">
                      {item.productdetail}
                    </p>
                    <p className="text-gray-300 md:text-xl text-[15px] cursor-pointer">
                      SKU: {item.sku}
                    </p>
                    {item.size !== null && (
                      <p className="text-gray-300 md:text-xl text-[15px] cursor-pointer">
                        Size: {item.size}No.
                      </p>
                    )}

                    <div className="flex items-center pt-1 gap-4 flex-col md:flex-row">
                      <div className="flex items-center bg-gray-800 rounded-2xl border border-gray-300 p-2 cursor-pointer">
                        <button
                          onClick={() =>
                            handleQuantityChange(index, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 text-amber-50 hover:bg-gray-300 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed "
                        >
                          −
                        </button>
                        <span className="px-4 py-1 text-amber-50 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(index, item.quantity + 1)
                          }
                          disabled={
                            item.quantity >=
                            (item.size !== null
                              ? products
                                  .find((p) => p.id === item.productId)
                                  ?.sizes.find((s) => s.size === item.size)
                                  ?.quantity
                              : products.find((p) => p.id === item.productId)
                                  ?.quantity)
                          }
                          className="px-3 py-1 text-amber-50 hover:bg-gray-300 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-green-400 font-bold md:text-2xl text-[15px]">
                        ₹{item.price} x {item.quantity} = ₹
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-400 hover:text-red-600 font-semibold border px-3 rounded-2xl py-2 hover:bg-gray-900 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4 text-right">
              <p className="text-xl font-bold text-green-400 cursor-pointer">
                Total: ₹{calculateTotal()}
              </p>
            </div>
          </div>

          {/* Customer Details */}
          <div className="mt-6">
            <div className="details flex flex-col gap-4 border bg-black p-3 rounded-2xl mb-6">
              <div className="detailhead text-2xl font-bold cursor-pointer">
                Your Address Detail
              </div>
              <div className="customer-info flex flex-col gap-4 mb-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={customerInfo.name}
                    onChange={handleCustomerInfoChange}
                    className={`border cursor-pointer p-2 rounded-lg w-full bg-gray-800 text-white border-gray-300 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={customerInfo.phone}
                    onChange={handleCustomerInfoChange}
                    className={`border cursor-pointer p-2 rounded-lg w-full bg-gray-800 text-white border-gray-300 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <textarea
                    name="address"
                    placeholder="Delivery Address"
                    value={customerInfo.address}
                    onChange={handleCustomerInfoChange}
                    className={`border cursor-pointer p-2 rounded-lg w-full bg-gray-800 text-white border-gray-300 ${
                      errors.address ? "border-red-500" : ""
                    }`}
                    rows="4"
                    required
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="message mb-2">
                  <input
                    type="text"
                    placeholder="Enter Any Note for order"
                    value={messageNote}
                    onChange={(e) => setMessageNote(e.target.value)}
                    className="border p-2 rounded-lg w-full bg-gray-800 text-white border-gray-300 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleProceedToOrder}
                disabled={isProceeding}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
              >
                {isProceeding ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-black mx-auto cursor-pointer"></div>
                ) : (
                  "Proceed to Order"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;