"use client";
import { useState } from "react";


export default function SupportButton({ toUser, name }) {
  const [amount, setAmount] = useState(100);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    const res = await fetch("/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, to_user: toUser, amount, message }),
    });
    const data = await res.json();

    // Confirm the exact hosted checkout URL pattern from your dashboard —
    // it's typically something like this, tied to the tracker token
    window.location.href = `https://sandbox.getsafepay.com/embedded/${data.trackerToken}?redirect_url=${encodeURIComponent(
      `${window.location.origin}/pay/status?orderId=${data.orderId}`
    )}`;
  };

    return (
    <div>
      <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} />
      <input placeholder="Say something" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handlePay} disabled={loading}>
        {loading ? "Redirecting..." : `Support ${toUser}`}
      </button>
      <ToastProvider/>
    </div>
  );
}