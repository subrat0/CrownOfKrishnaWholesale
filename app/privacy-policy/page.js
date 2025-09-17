"use client";
import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-500 mb-6 text-center">Privacy Policy</h1>
        
        {/* About CrownOfKrishna */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-amber-50 mb-4">About CrownOfKrishna</h2>
          <p className="text-gray-300 text-sm">
            Welcome to Crown of Krishna, founded by Subrat Ghosh. We are dedicated suppliers of Pagri, Poshak, Ghagra for Durga Mata Ji, and all essential devotional products for Krishna Ji. Our mission is to provide devotees with beautiful, high-quality items that bring divinity, tradition, and elegance together.
          </p>
          <p className="text-gray-300 text-sm mt-4">
            At Crown of Krishna, you will find everything from traditional poshaks to fancy pagris, along with a wide variety of devotional essentials. Each product is carefully chosen to ensure that your worship and devotion is surrounded by beauty, comfort, and authenticity. This website is exclusively designed for placing orders for these devotional products.
          </p>
          <p className="text-gray-300 text-sm mt-4">
            Subrat Ghosh is passionately working to take Crown of Krishna to greater heights, making it a trusted name for devotees across India. Whether you are looking for wholesale supply or personal purchases, Crown of Krishna is here to serve you. For inquiries, feel free to reach us at: <a href="mailto:crownofkrishna@gmail.com" className="text-yellow-500 hover:underline cursor-pointer">crownofkrishna@gmail.com</a>.
          </p>
        </section>

        {/* Privacy Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-amber-50 mb-4">Privacy Policy</h2>
          <p className="text-gray-300 text-sm">
            At CrownOfKrishna, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you place orders on our website.
          </p>
          <ul className="list-disc pl-5 text-gray-300 text-sm mt-4 space-y-2">
            <li><strong>Information Collection:</strong> We collect personal information such as your name, phone number, and delivery address solely for the purpose of processing and fulfilling your orders. This information is stored securely in your browser's local storage.</li>
            <li><strong>Use of Information:</strong> Your data is used to process orders, communicate order updates, and ensure timely delivery. We do not share your personal information with third parties except as necessary for order fulfillment (e.g., delivery services).</li>
            <li><strong>Data Security:</strong> While we use local storage for a seamless ordering experience, we recommend clearing your browser data after use to ensure privacy. We do not store your data on our servers unless explicitly required for order processing.</li>
            <li><strong>Contact:</strong> For any privacy-related concerns, contact us at <a href="mailto:crownofkrishna@gmail.com" className="text-yellow-500 hover:underline cursor-pointer">crownofkrishna@gmail.com</a>.</li>
          </ul>
        </section>

        {/* Refund Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-amber-50 mb-4">Refund Policy</h2>
          <p className="text-gray-300 text-sm">
            We strive to ensure customer satisfaction with every order. Our refund policy is as follows:
          </p>
          <ul className="list-disc pl-5 text-gray-300 text-sm mt-4 space-y-2">
            <li><strong>Eligibility:</strong> Refunds are available for defective or damaged products received. Requests must be made within 7 days of delivery.</li>
            <li><strong>Process:</strong> To initiate a refund, contact us at <a href="mailto:crownofkrishna@gmail.com" className="text-yellow-500 hover:underline cursor-pointer">crownofkrishna@gmail.com</a> with your order details and issue description. We may request images of the product for verification.</li>
            <li><strong>Non-Refundable:</strong> Custom-made products, such as specific sizes of Pagri or Poshak, are non-refundable unless defective. Personal purchases made in error are not eligible for refunds but may be exchanged at our discretion.</li>
            <li><strong>Refund Timeline:</strong> Approved refunds will be processed within 14 days of receiving the returned product, credited to the original payment method or as store credit.</li>
          </ul>
        </section>

        {/* Payment Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-amber-50 mb-4">Payment Policy</h2>
          <p className="text-gray-300 text-sm">
            CrownOfKrishna ensures a secure and seamless payment process for all orders.
          </p>
          <ul className="list-disc pl-5 text-gray-300 text-sm mt-4 space-y-2">
            <li><strong>Accepted Methods:</strong> We accept payments via UPI, credit/debit cards, and bank transfers. Payment details are provided during the order confirmation process.</li>
            <li><strong>Security:</strong> All payment transactions are processed through secure third-party gateways. We do not store your payment information on our website.</li>
            <li><strong>Order Confirmation:</strong> Orders are confirmed only after successful payment. For wholesale orders, advance payment may be required, which will be communicated via email or WhatsApp.</li>
            <li><strong>Contact:</strong> For payment-related issues, reach out to us at <a href="mailto:crownofkrishna@gmail.com" className="text-yellow-500 hover:underline cursor-pointer">crownofkrishna@gmail.com</a> or <a href="https://wa.me/7017714167" className="text-yellow-500 hover:underline cursor-pointer">WhatsApp</a>.</li>
          </ul>
        </section>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="text-blue-500 no-underline border-2 p-2 rounded-2xl my-2 hover:bg-black hover:text-white cursor-pointer"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;