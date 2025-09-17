"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import products from "@/data/products";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
const Page = () => {

  const params = useParams();
  const { productinfo } = params;
  const product = products.find((p) => p.id === productinfo);

  if (!product) return <div className="text-white text-4xl flex flex-col justify-center items-center border rounded-2xl mx-auto p-4 font-bold w-fit">Product not found
    <Link href="/" className="text-blue-500 no-underline border-2 p-2 rounded-2xl my-2 hover:bg-black hover:text-white">Go Back</Link>
  </div>;


  const [currentImage, setCurrentImage] = useState(0);

  // State for quantity
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const handleNext = () => {
    if (currentImage < product.images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const handlePrev = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  // ye functionality handle prev ke liye hai
  const [prevClicked, setPrevClicked] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);

  const handlePrevClick = () => {
    handlePrev();
    setPrevClicked(true);
    setTimeout(() => setPrevClicked(false), 4000); // 2 sec baad transparent
  };

  const handleNextClick = () => {
    handleNext();
    setNextClicked(true);
    setTimeout(() => setNextClicked(false), 4000);
  };


  // State to track selected size
  const [selectedSize, setSelectedSize] = useState(
    product.category === "posag" && product.sizes ? product.sizes[0] : null
  );

  // Handle size button click
  const handleSizeClick = (sizeObj) => {
    setSelectedSize(sizeObj);
    setQuantity(1);
  };


  // Function to calculate discount percentage
  const calculateDiscount = (mrp, price) => {
    return Math.round(((mrp - price) / mrp) * 100);
  };


  // Set default size (0No.) when product loads or changes
  useEffect(() => {
    if (product.category === "posag" || product.category === "pagri") {
      if (product.sizes && product.sizes.length > 0) {
        // Set first size (0No.) as default
        setSelectedSize(product.sizes[0]);
      } else {
        // Fallback if no sizes
        setSelectedSize(null);
      }
    } else {
      // For non-posag/pagri products, no size selection
      setSelectedSize(null);
    }
    setQuantity(1); // Reset quantity to 1 when product changes
  }, [product]); // Run when product changes


  // Handle quantity increment
  const handleIncrement = () => {
    if (selectedSize && quantity < selectedSize.quantity) {
      setQuantity(quantity + 1);
    } else if (!selectedSize && quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };


  // Handle quantity decrement
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    const cartItem = {
      productId: product.id,
      title: product.title,
      size: selectedSize ? selectedSize.size : null,
      quantity,
      price: selectedSize ? selectedSize.price : product.price,
      image: product.images[0],
      sku: product.sku,
      productdetail: product.productdetail,
    };
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...existingCart, cartItem]));
    setShowNotification(true);
    setIsAdding(false);
  };


  // Add useEffect to hide notification after 3 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 1000); // Hide after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [showNotification]);


  //router ka use krke next and previous product dikhana
  const router = useRouter();
  const currentIndex = products.findIndex((p) => p.id === productinfo);
  const prevProductId = products[currentIndex > 0 ? currentIndex - 1 : products.length - 1]?.id;
  const nextProductId = products[currentIndex < products.length - 1 ? currentIndex + 1 : 0]?.id;

  const [isLoadingPrev, setIsLoadingPrev] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  const handlePrevProduct = () => {
    setIsLoadingPrev(true);
    router.push(`/Product/${prevProductId}`);
  };

  const handleNextProduct = () => {
    setIsLoadingNext(true);
    router.push(`/Product/${nextProductId}`);
  };


  const [isLoadingViewCart, setIsLoadingViewCart] = useState(false); // New state for View Cart loading

  // Handler for View Cart button
  const handleViewCart = () => {
    setIsLoadingViewCart(true);
    router.push('/cart');
  };

  // Check if cart has items
  const [hasCartItems, setHasCartItems] = useState(false);

  // Check cart on mount and after adding to cart
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setHasCartItems(existingCart.length > 0);
  }, [showNotification]); // Update when notification changes (i.e., after adding to cart)

  return (
    <>
      {/* Previous Product Button */}
      {prevProductId && (
        <button
          onClick={handlePrevProduct}
          disabled={isLoadingPrev}
          className="cursor-pointer absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-2xl p-2 opacity-100 hover:bg-gray-200 transition"
          title="Previous Product"
        >
          {isLoadingPrev ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-black mx-auto"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              className="stroke-black"
            >
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
            </svg>
          )}
        </button>
      )}
      {/* Next Product Button */}
      {nextProductId && (
        <button
          onClick={handleNextProduct}
          disabled={isLoadingNext}
          className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-2xl p-2 opacity-100 hover:bg-gray-200 transition"
          title="Next Product"
        >
          {isLoadingNext ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-black mx-auto"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              className="stroke-black"
            >
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M13 6L19 12M19 12L13 18M19 12H5"></path>
            </svg>
          )}
        </button>
      )}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-black text-amber-50 p-4 rounded-2xl border border-gray-300 shadow-lg z-50 animate-fade-in">
          Item added to cart successfully!
        </div>
      )}
      <div className="md:h-fit mt-6 mb-10 bg-gray-900 text-white md:p-10 p-4 md:w-[60%] mx-auto rounded-2xl border-2 w-[90%] ">
        <div className="max-w-6xl h-fit mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Left Image Gallery */}
          <div className="flex flex-col items-center border border-white rounded-2xl p-2">

            <div className="w-full h-[400px] overflow-hidden rounded-4xl shadow-lg flex items-center justify-center relative  p-3 ">

              {currentImage > 0 && (
                <button onClick={handlePrevClick} className={`absolute cursor-pointer left-2 duration-300 scale-100 rounded-2xl border border-black bg-white
                    ${prevClicked ? "opacity-100" : "opacity-30"} hover:opacity-100`}
                  title="Go Back">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" className="stroke-black">
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
                  </svg>
                </button>
              )}

              <Image
                src={product.images[currentImage]}
                alt={product.title}
                width={500}
                height={500}
                className="object-contain rounded-3xl border-red-600 cursor-pointer"
              />

              {currentImage < product.images.length - 1 && (
                <button onClick={handleNextClick} className={`absolute cursor-pointer right-2 duration-300 scale-100 rounded-2xl border border-black bg-white
                    ${nextClicked ? "opacity-100" : "opacity-30"} hover:opacity-100`}
                  title="Go Forward">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" className="stroke-black">
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M13 6L19 12M19 12L13 18M19 12H5"></path>
                  </svg>
                </button>
              )}
            </div>

            {/* This code is for mobile phone in future*/}
            {/* <div className="flex flex-col items-center border border-yellow-500 rounded-2xl p-2"> */}
            {/* Horizontal Scrollable Gallery */}
            {/* <div
              className="w-full h-[400px] flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-4xl shadow-lg relative p-3 scrollbar-hide"
            >
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full h-full flex items-center justify-center snap-center"
                >
                  <Image
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    width={500}
                    height={500}
                    className="object-contain rounded-3xl border-red-600"
                  />
                </div>
              ))}
            </div>
          </div> */}

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto max-w-full pb-2 scrollbar-hide">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={` w-20 h-20 flex-shrink-0 cursor-pointer  rounded-lg overflow-hidden ${index === currentImage ? "border-2 border-yellow-500" : "border-transparent"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full "
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Details */}
          <div className="flex flex-col">
            {/* Product Title */}
            <h1 className="text-3xl font-bold mb-4 cursor-pointer">{product.title}</h1>

            {/* Price, MRP, and Discount */}
            <div className="flex items-center gap-4 mb-4 cursor-pointer">
              <span className="text-2xl font-bold text-green-400 cursor-pointer">
                ₹{selectedSize ? selectedSize.price : product.price}
              </span>
              <span className="line-through text-gray-400">
                ₹{selectedSize ? selectedSize.mrp : product.mrp}
              </span>
              <span className="text-red-400 text-lg">
                {selectedSize
                  ? calculateDiscount(selectedSize.mrp, selectedSize.price)
                  : calculateDiscount(product.mrp, product.price)}
                % OFF
              </span>
            </div>

            {/* Product Description */}
            <p className="text-gray-300 mb-6 cursor-pointer">{product.desc}</p>
            <div className="gap-5 flex flex-col ">
              {/* Numbers Div - Show only for posag or pagri */}
              {(product.category === "posag" || product.category === "pagri") &&
                product.sizes && (
                  <div className="Numbers p-3 text-amber-50 bg-black gap-4 rounded-2xl flex flex-wrap cursor-pointer">
                    {product.sizes.map((sizeObj) => (
                      <button
                        key={sizeObj.size}
                        onClick={() => handleSizeClick(sizeObj)}
                        className={`border px-3 py-1 rounded-2xl hover:bg-gray-300 hover:text-black cursor-pointer hover:font-bold ${selectedSize?.size === sizeObj.size
                          ? "bg-gray-300 text-black font-bold"
                          : ""
                          }`}
                      >
                        {sizeObj.size}No.
                      </button>
                    ))}
                  </div>
                )}

              {/* Quantity Selector */}
              <div className="quantity flex items-center gap-4">
                <label htmlFor="quantity" className="text-gray-300 font-semibold cursor-pointer">
                  Quantity:
                </label>
                <div className="flex items-center bg-black rounded-2xl border border-gray-300 p-2 cursor-pointer">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="px-3 py-1 text-amber-50 hover:bg-gray-300 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 text-amber-50 font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= product.quantity}
                    className="px-3 py-1 text-amber-50 hover:bg-gray-300 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-400 text-sm cursor-pointer">
                  {selectedSize ? `(Available: ${selectedSize.quantity})` : `(Available: ${product.quantity || 0})`}
                </span>

              </div>
              <div className="productdetail">
                <p className="font-bold text-sm  bg-black rounded-2xl p-4  text-white cursor-pointer"> {product.productdetail}</p>
              </div>
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
              >
                {isAdding ? "Adding..." : "Add to Cart"}
              </button>
              {hasCartItems && (
                <button
                  onClick={handleViewCart}
                  disabled={isLoadingViewCart}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
                >
                  {isLoadingViewCart ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white mx-auto"></div>
                  ) : (
                    "View Cart"
                  )}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Page;