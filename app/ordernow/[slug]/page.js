"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const OrderNowPage = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState({ name: "", phone: "", address: "" });
  const [isClient, setIsClient] = useState(false); // SSR safe
  const router = useRouter();

  // Only run client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const order = JSON.parse(localStorage.getItem("orderDetails") || "{}");
      if (order.customerInfo) {
        setOrderDetails(order);
        setEditedInfo({
          name: order.customerInfo.name || "",
          phone: order.customerInfo.phone || "",
          address: order.customerInfo.address || "",
        });
      }
      setLoading(false);
    }
  }, [isClient]);

  const validateInputs = () => {
    const newErrors = { name: "", phone: "", address: "" };
    let isValid = true;

    if (!editedInfo.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!editedInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d+$/.test(editedInfo.phone.trim())) {
      newErrors.phone = "Phone number must contain only numbers";
      isValid = false;
    }
    if (!editedInfo.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveEdit = () => {
    if (!validateInputs()) return;

    const updatedOrderDetails = { ...orderDetails, customerInfo: { ...editedInfo } };
    setOrderDetails(updatedOrderDetails);
    if (isClient) localStorage.setItem("orderDetails", JSON.stringify(updatedOrderDetails));
    setIsEditing(false);
    setErrors({ name: "", phone: "", address: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({ ...editedInfo, [name]: value });
    setErrors({ ...errors, [name]: "" });
    if (name === "phone" && value && !/^\d+$/.test(value)) {
      setErrors((prev) => ({ ...prev, phone: "Phone number must contain only numbers" }));
    }
  };

  const handleConfirmOrder = async () => {
    if (!orderDetails || !isClient) return;

    setIsConfirming(true);
    const { cartItems, customerInfo, messageNote, total } = orderDetails;

    try {
      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          customerName: customerInfo.name,
          phone: customerInfo.phone,
          address: customerInfo.address,
          messageNote,
          total,
          timestamp: new Date().toLocaleString(),
        }),
      });

      const responseData = await response.json();
      if (response.ok && responseData.success) {
        setShowNotification(true);
        localStorage.removeItem("cart");
        localStorage.removeItem("orderDetails");
        setTimeout(() => router.push("/"), 3000);
      } else {
        setIsConfirming(false);
      }
    } catch (error) {
      setIsConfirming(false);
    }
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  if (loading)
    return (
      <div className="text-center text-gray-300 min-h-screen bg-gray-900 text-2xl font-bold flex items-center justify-center">
        Loading...
      </div>
    );

  if (!orderDetails)
    return (
      <div className="text-center text-gray-300 min-h-screen w-fit p-4 font-bold flex flex-col gap-3 mx-auto items-center justify-center">
        <span className="text-2xl">No order found..</span>
        <span className="text-2xl">Your Previous Order Delivered soon..</span>
        <Link href="/" className="text-white border bg-black px-4 py-2 rounded-2xl">
          Explore More Products
        </Link>
      </div>
    );

  const { cartItems, customerInfo, messageNote, total } = orderDetails;

  return (
    <div className="min-h-screen text-white p-4 md:p-10 relative">
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 animate-fade-in">
          <div className="text-center bg-gray-800 p-6 rounded-2xl shadow-lg transform animate-scale-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-400 mx-auto mb-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-2xl font-bold text-amber-50">Order Confirmed!</h2>
            <p className="text-gray-300">Thank you for your order. Redirecting to home...</p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center cursor-pointer">Order Summary</h1>
      <div className="max-w-4xl mx-auto">
        <div className="border rounded-2xl bg-black p-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border-b border-gray-700 py-4 cursor-pointer">
              <Image src={item.image} alt={item.title} width={80} height={80} className="object-cover rounded-lg" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-300">{item.productdetail}</p>
                <p className="text-gray-300">SKU: {item.sku}</p>
                {item.size != null && <p className="text-gray-300">Size: {item.size}No.</p>}
                <p className="text-green-400 font-bold">
                  ₹{item.price} x {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="text-xl font-bold text-green-400 cursor-pointer">Total: ₹{total}</p>
          </div>

          {/* Customer Details */}
          <div className="mt-4 flex flex-col md:flex-row md:items-start md:gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              {isEditing ? (
                <div className="flex flex-col gap-4 mt-2">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={editedInfo.name}
                      onChange={handleEditChange}
                      className={`border p-2 rounded-lg w-full bg-gray-800 text-white border-gray-300 ${errors.name ? "border-red-500" : ""} cursor-pointer`}
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={editedInfo.phone}
                      onChange={handleEditChange}
                      className={`border p-2 rounded-lg w-full bg-gray-800 text-white border-gray-300 ${errors.phone ? "border-red-500" : ""} cursor-pointer`}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <textarea
                      name="address"
                      placeholder="Delivery Address"
                      value={editedInfo.address}
                      onChange={handleEditChange}
                      className={`border p-2 rounded-lg w-full bg-gray-800 text-white border-gray-300 ${errors.address ? "border-red-500" : ""} cursor-pointer`}
                      rows="4"
                      required
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-xl shadow-md transition cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setErrors({ name: "", phone: "", address: "" });
                        setEditedInfo({
                          name: customerInfo.name,
                          phone: customerInfo.phone,
                          address: customerInfo.address,
                        });
                      }}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-gray-300">
                  <p>Name: {customerInfo.name}</p>
                  <p>Phone: {customerInfo.phone}</p>
                  <p>Address: {customerInfo.address}</p>
                  {messageNote && <p>Note: {messageNote}</p>}
                  <p className="text-xl font-bold text-red-500">Free Delivery on your order! Just shop for ₹20,000 or more!</p>
                </div>
              )}
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition cursor-pointer mt-2 md:mt-0"
              >
                Edit Details
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/cart"
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
          >
            Back to Cart
          </Link>
          <button
            onClick={handleConfirmOrder}
            disabled={isConfirming}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
          >
            {isConfirming ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-black"></div>
                <span>Confirming Order...</span>
              </div>
            ) : (
              "Confirm Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderNowPage;
