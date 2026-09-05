document.getElementById('year').textContent = new Date().getFullYear();

const supportForm = document.getElementById('support-form');
const supportStatus = document.getElementById('support-status');

supportForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = supportForm.querySelector('button');
  const formData = new FormData(supportForm);
  const email = formData.get('email');
  const amount = Number(formData.get('amount'));

  button.disabled = true;
  supportStatus.textContent = 'Preparing secure checkout…';
  try {
    const response = await fetch('/api/paystack/initialize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, amount }),
    });
    const result = await response.json();
    if (!response.ok || !result.authorization_url) throw new Error(result.message || 'Unable to start checkout.');
    window.location.assign(result.authorization_url);
  } catch (error) {
    supportStatus.textContent = error.message || 'Something went wrong. Please try again.';
    button.disabled = false;
  }
});
