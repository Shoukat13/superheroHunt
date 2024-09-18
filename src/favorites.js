document.addEventListener('DOMContentLoaded', () => {
  displayFavorites(); // Load and display favorite superheroes
});

// Display favorite superheroes from localStorage
function displayFavorites() {
  const favoriteList = document.getElementById('favoriteList');

  // Check if the element with ID 'favoriteList' exists
  if (!favoriteList) {
    console.error('Element with ID "favoriteList" not found.');
    return;
  }

  // Clear previous list content to prevent duplication
  favoriteList.innerHTML = '';

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    favoriteList.innerHTML = '<p>No favorites added yet.</p>';
    return;
  }

  favorites.forEach(hero => {
    const heroElement = document.createElement('div');
    heroElement.className = 'hero';
    heroElement.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" class="card-img-top" alt="${hero.name}">
        <div class="card-body">
          <h5 class="card-title">${hero.name}</h5>
          <button class="btn btn-danger remove-btn" data-id="${hero.id}">Remove from Favorites</button>
        </div>
      </div>
    `;
    favoriteList.appendChild(heroElement);

    // Add event listener to remove button
    heroElement.querySelector('.remove-btn').addEventListener('click', () => {
      event.stopPropagation();
      removeFromFavorites(hero.id);
    });
    heroElement.addEventListener('click', () => {
      window.location.href = `superherodetails.html?id=${hero.id}`;
    });
  });
}

// Remove superhero from favorites in localStorage
function removeFromFavorites(heroId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Optional: Add a confirmation prompt before removing
  if (confirm('Are you sure you want to remove this superhero from favorites?')) {
    favorites = favorites.filter(hero => hero.id !== heroId); // Remove hero with the matching id
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites(); // Refresh the favorites list
  }
}