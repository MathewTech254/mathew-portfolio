// Vercel serverless function: PAYSTACK_SECRET_KEY never reaches the browser.
module.exports = async (request, response) => {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ message: 'Method not allowed.' });
  }

  const { email, amount } = request.body || {};
  const numericAmount = Number(amount);
  const validEmail = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const allowedAmounts = [100, 250, 500];
  if (!validEmail || !allowedAmounts.includes(numericAmount)) {
    return response.status(400).json({ message: 'Choose an amount and enter a valid email.' });
  }
  if (!process.env.PAYSTACK_SECRET_KEY) {
    return response.status(500).json({ message: 'Payment service is not configured yet.' });
  }

  try {
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, amount: Math.round(numericAmount * 100), currency: 'KES', metadata: { purpose: 'Portfolio support' } }),
    });
    const payload = await paystackResponse.json();
    if (!paystackResponse.ok || !payload.status) throw new Error(payload.message || 'Paystack did not initialise the transaction.');
    return response.status(200).json({ authorization_url: payload.data.authorization_url });
  } catch (error) {
    return response.status(502).json({ message: error.message || 'Unable to contact payment service.' });
  }
};
