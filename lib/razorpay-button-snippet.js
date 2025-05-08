
const handleRazorpay = async (formData) => {
  const res = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 499 }),
  });
  const { orderId } = await res.json();

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: 49900,
    currency: 'INR',
    name: 'Soulmate Sketch',
    description: 'Receive your AI-generated soulmate sketch & report',
    order_id: orderId,
    handler: async function () {
      alert('Payment Successful! Creating your soulmate sketch...');
      await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    },
    prefill: {
      name: formData.name,
      email: formData.email,
      contact: formData.mobile,
    },
    theme: { color: '#F37254' },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
export default handleRazorpay;
