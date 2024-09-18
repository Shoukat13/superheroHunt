const MD5 = require("crypto-js/md5"); // Importing MD5 correctly for use in this file
const publicKey = 'fd3fc9ccfa4cfbc964b1c11146d0950d'; 
const privateKey = '7d464d0ae30a358679b38112c504489c5b52f4f2';

// Function to generate MD5 hash
function generateHash(ts) {
  return MD5(ts + privateKey + publicKey).toString();
}

// Fetch superheroes and display on homepage
async function fetchSuperheroes() {
  const ts = new Date().getTime(); 
  const hash = generateHash(ts);
  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=20`; // Fetch 20 heroes for homepage

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displaySuperheroes(data.data.results);
  } catch (error) {
    console.error("Error fetching superheroes:", error);
  }
}

// Display superheroes on the homepage
function displaySuperheroes(heroes) {
  const superheroList = document.getElementById('superheroList');
  
  if (!superheroList) {
    console.error('Element with id "superheroList" not found.');
    return;
  }

  superheroList.innerHTML = '';

  if (heroes.length === 0) {
    superheroList.innerHTML = '<p>No superheroes found.</p>';
    return;
  }

  heroes.forEach(hero => {
    const heroElement = document.createElement('div');
    heroElement.className = 'hero';
    heroElement.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" class="card-img-top" alt="${hero.name}">
        <div class="card-body">
          <h5 class="card-title">${hero.name}</h5>
          <button class="btn btn-primary favorite-btn" data-id="${hero.id}">Add to Favorites</button>
        </div>
      </div>
    `;

    superheroList.appendChild(heroElement);

    // Add event listener to favorite button
    heroElement.querySelector('.favorite-btn').addEventListener('click', () => {
      addToFavorites(hero);
    });

    // Add event listener to navigate to superhero details page
    heroElement.addEventListener('click', (event) => {
      // Check if the click is not on the favorite button
      if (!event.target.classList.contains('favorite-btn')) {
        window.location.href = `superherodetails.html?id=${hero.id}`;
      }
    });
  });
}

// Add hero to favorites in localStorage
function addToFavorites(hero) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  if (!favorites.some(favHero => favHero.id === hero.id)) {
    favorites.push(hero);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(`${hero.name} added to favorites!`);
  } else {
    alert(`${hero.name} is already in your favorites.`);
  }
}

// Initialize the fetching of superheroes when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchSuperheroes(); // Fetch superheroes for homepage
});