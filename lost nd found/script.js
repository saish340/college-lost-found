document.getElementById('itemForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = this[0].value;
  const itemName = this[1].value;
  const type = this[2].value;
  const description = this[3].value;
  const fileInput = document.getElementById('imageInput');
  const file = fileInput.files[0];

  const itemCard = document.createElement('div');
  itemCard.className = 'item-card';

  let imageHTML = '';
  if (type === 'found' && file) {
    const imageURL = URL.createObjectURL(file);
    imageHTML = `<img src="${imageURL}" style="max-width: 100%; margin-top: 10px;">`;
  }

  itemCard.innerHTML = `
    <strong>${itemName}</strong> (${type.toUpperCase()})<br>
    <em>Reported by ${name}</em><br>
    <p>${description}</p>
    ${imageHTML}
  `;

  document.getElementById('itemsContainer')?.prepend(itemCard);
  this.reset();
  fileInput.value = '';
});
