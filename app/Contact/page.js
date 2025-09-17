"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // WhatsApp Redirect
    const whatsappUrl = `https://wa.me/917017714167?text=Name:%20${formData.name}%0AContact:%20${formData.contact}%0AMessage:%20${formData.message}`;
    window.open(whatsappUrl, "_blank");

    // TODO: EmailJS integration (for email send)
    alert("Your details have been sent to WhatsApp.");
  };

  return (
    <section className=" text-white py-12 px-6" id="contact">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Contact <span className="text-amber-400">Crown of Krishna</span>
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-amber-400"
          />
          <input
            type="text"
            name="contact"
            placeholder="Phone or Email"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-amber-400"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-amber-400"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-amber-400 text-black font-semibold py-3 rounded-lg hover:bg-amber-500 transition-all duration-300 cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

