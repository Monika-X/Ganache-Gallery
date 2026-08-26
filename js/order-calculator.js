/* ==========================================================================
   GANACHE GALLERY - CUSTOM ORDER ESTIMATOR & BRIEF GENERATOR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCustomOrderForm();
});

function initCustomOrderForm() {
  const form = document.getElementById('custom-order-wizard');
  if (!form) return;

  const eventTypeSelect = document.getElementById('event-type');
  const guestCountInput = document.getElementById('guest-count');
  const tiersSelect = document.getElementById('tier-count');
  const finishSelect = document.getElementById('finish-style');
  const estPriceEl = document.getElementById('estimated-price');
  const estLeadEl = document.getElementById('estimated-lead-time');

  function calculateEstimate() {
    let basePrice = 120;
    const guests = parseInt(guestCountInput ? guestCountInput.value : 20) || 20;
    const tiers = parseInt(tiersSelect ? tiersSelect.value : 1) || 1;
    const finishMultiplier = parseFloat(finishSelect ? finishSelect.value : 1.0) || 1.0;

    // Price formula
    let perGuestRate = 7.5;
    if (tiers >= 3) perGuestRate = 9.5;
    if (tiers >= 5) perGuestRate = 12.0;

    let calculated = (basePrice + (guests * perGuestRate) + (tiers * 85)) * finishMultiplier;
    
    // Lead time calculation based on tiers and guests
    let leadDays = 5;
    if (guests > 50 || tiers >= 3) leadDays = 14;
    if (guests > 150 || tiers >= 4) leadDays = 21;

    if (estPriceEl) estPriceEl.textContent = `$${Math.round(calculated)}`;
    if (estLeadEl) estLeadEl.textContent = `${leadDays} Business Days`;
  }

  if (guestCountInput) guestCountInput.addEventListener('input', calculateEstimate);
  if (tiersSelect) tiersSelect.addEventListener('change', calculateEstimate);
  if (finishSelect) finishSelect.addEventListener('change', calculateEstimate);
  if (eventTypeSelect) eventTypeSelect.addEventListener('change', calculateEstimate);

  // Form submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('client-name')?.value || 'Valued Client';
    const email = document.getElementById('client-email')?.value || '';
    
    alert(`Thank you ${name}! Your custom dessert atelier inquiry has been successfully submitted. Master Pastry Chef will review your brief within 24 hours. A copy has been dispatched to ${email}.`);
    form.reset();
    calculateEstimate();
  });

  calculateEstimate();
}
