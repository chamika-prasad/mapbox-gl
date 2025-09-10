"use client";

import { log } from "console";
import { useState } from "react";

export default function PayHereCheckout({ bookingId }: { bookingId: string }) {
const [formData, setFormData] = useState({
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "+94771234567",
    address: "123 Main Street",
    city: "Colombo",
    country: "Sri Lanka",
    currency: "LKR",
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      // 1️⃣ Call your backend to create payment
      const res = await fetch("http://173.249.53.165/api/payments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          currency: formData.currency,
        }),
      });

     
      

      const { success,message,data } = await res.json();

       console.log(data.hash);

      // 2️⃣ Build payload for PayHere
      const payherePayload = {
        merchant_id : "1230360",
        return_url: "http://localhost:3000",
        cancel_url: "http://localhost:3000/payment/cancel",
        notify_url: "http://173.249.53.165/api/payments/update",
        order_id: data.paymentId, // use backend-generated paymentId
        items: "Booking Payment",
        currency: formData.currency,
        amount: data.amount,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        hash: data.hash,
      };

      // 3️⃣ Create a form dynamically and submit to PayHere
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://sandbox.payhere.lk/pay/checkout";

      Object.entries(payherePayload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "25px",
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.08)",
  }}
>
  <input
    name="first_name"
    placeholder="First Name"
    onChange={handleChange}
    style={{
      padding: "14px 16px",
      border: "2px solid #dee2e6",
      borderRadius: "8px",
      fontSize: "16px",
      transition: "all 0.3s ease",
    }}
    value={formData.first_name}
  />

  <input
    name="last_name"
    placeholder="Last Name"
    onChange={handleChange}
    style={{
      padding: "14px 16px",
      border: "2px solid #dee2e6",
      borderRadius: "8px",
      fontSize: "16px",
      transition: "all 0.3s ease",
    }}
    value={formData.last_name}
  />

  <input
    name="email"
    placeholder="Email"
    onChange={handleChange}
    style={{
      padding: "14px 16px",
      border: "2px solid #dee2e6",
      borderRadius: "8px",
      fontSize: "16px",
      transition: "all 0.3s ease",
    }}
    value={formData.email}
    type="email"
  />

  <input
    name="phone"
    placeholder="Phone"
    onChange={handleChange}
    style={{
      padding: "14px 16px",
      border: "2px solid #dee2e6",
      borderRadius: "8px",
      fontSize: "16px",
      transition: "all 0.3s ease",
    }}
    value={formData.phone}
    type="tel"
  />

  <input
    name="address"
    placeholder="Address"
    onChange={handleChange}
    style={{
      padding: "14px 16px",
      border: "2px solid #dee2e6",
      borderRadius: "8px",
      fontSize: "16px",
      transition: "all 0.3s ease",
    }}
    value={formData.address}
  />

  <input
    name="city"
    placeholder="City"
    onChange={handleChange}
    style={{
      padding: "14px 16px",
      border: "2px solid #dee2e6",
      borderRadius: "8px",
      fontSize: "16px",
      transition: "all 0.3s ease",
    }}
    value={formData.city}
  />

  <input
    name="country"
    placeholder="Country"
    onChange={handleChange}
    style={{
      padding: "14px 16px",
      border: "2px solid #dee2e6",
      borderRadius: "8px",
      fontSize: "16px",
      transition: "all 0.3s ease",
      marginBottom: "10px",
    }}
    value={formData.country}
  />

  <button
    onClick={handlePayment}
    style={{
      padding: "16px 24px",
      background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 6px rgba(37, 99, 235, 0.2)",
    }}
  >
    Pay Now
  </button>
</div>
  );
}
