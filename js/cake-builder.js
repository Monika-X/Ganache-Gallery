/* ==========================================================================
   GANACHE GALLERY - INTERACTIVE FLAVOR & FILLING BUILDER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initFlavorStudio();
});

function initFlavorStudio() {
  const spongeOptions = document.querySelectorAll('.sponge-card');
  const fillingOptions = document.querySelectorAll('.filling-card');
  const previewSpongeName = document.getElementById('preview-sponge-name');
  const previewFillingName = document.getElementById('preview-filling-name');
  const previewPairingNotes = document.getElementById('preview-pairing-notes');

  let selectedSponge = { name: 'Dark Belgian Chocolate', note: 'Rich 70% Valrhona ganache base with velvet crumb' };
  let selectedFilling = { name: 'Raspberry Rose Compote', note: 'Tart wild raspberries infused with organic damask rose water' };

  if (spongeOptions.length) {
    spongeOptions.forEach(card => {
      card.addEventListener('click', () => {
        spongeOptions.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        selectedSponge = {
          name: card.getAttribute('data-name'),
          note: card.getAttribute('data-note')
        };
        updatePreview();
      });
    });
  }

  if (fillingOptions.length) {
    fillingOptions.forEach(card => {
      card.addEventListener('click', () => {
        fillingOptions.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        selectedFilling = {
          name: card.getAttribute('data-name'),
          note: card.getAttribute('data-note')
        };
        updatePreview();
      });
    });
  }

  function updatePreview() {
    if (previewSpongeName) previewSpongeName.textContent = selectedSponge.name;
    if (previewFillingName) previewFillingName.textContent = selectedFilling.name;
    if (previewPairingNotes) {
      previewPairingNotes.textContent = `A harmonious pairing: ${selectedSponge.note} combined with ${selectedFilling.note}. Handcrafted with organic Madagascar vanilla bean syrup.`;
    }
  }
}
