import './homepage.js';
import './favorites.js';
const MD5 = require("crypto-js/md5");
const publicKey = 'fd3fc9ccfa4cfbc964b1c11146d0950d'; // Replace with your public key
const privateKey = '7d464d0ae30a358679b38112c504489c5b52f4f2'; // Replace with your private key

// Function to generate MD5 hash
function generateHash(ts) {
  return MD5(ts + privateKey + publicKey).toString();
}

// Function to fetch superheroes from the Marvel API
async function fetchSuperheroes(query) {
  const ts = new Date().getTime(); // Current timestamp
  const hash = generateHash(ts); // Generate hash using timestamp, private key, and public key
  const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  console.log(url);
  try {
    const response = await fetch(url); // Fetch data from Marvel API
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
    }
    const data = await response.json(); // Parse JSON response
    console.log(data);
    displaySuperheroes(data.data.results); // Display the fetched superheroes
  } catch (error) {
    console.error("Error fetching superheroes:", error); // Log errors to the console
  }
}

// Function to display superheroes in the DOM
function displaySuperheroes(heroes) {
  const superheroList = document.getElementById('superheroList');

  // Check if superheroList exists
  if (!superheroList) {
    console.error('Element with ID "superheroList" not found.');
    return;
  }

  superheroList.innerHTML = ''; // Clear previous results

  if (heroes.length === 0) {
    superheroList.innerHTML = '<p>No superheroes found.</p>'; // Display message if no superheroes found
    return;
  }

  heroes.forEach(hero => {
    const heroElement = document.createElement('div');
    heroElement.className = 'hero';
    heroElement.innerHTML = `
      <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}">
      <h3>${hero.name}</h3>
      <button class="btn btn-primary favorite-btn" data-id="${hero.id}">Add to Favorites</button>
    `;

    superheroList.appendChild(heroElement); // Add hero element to the DOM

    // Add event listener to the favorite button
    heroElement.querySelector('.favorite-btn').addEventListener('click', () => {
      event.stopPropagation();
      addToFavorites(hero);
    });

    // Add event listener to navigate to superhero details page
    heroElement.addEventListener('click', () => {
      window.location.href = `superherodetails.html?id=${hero.id}`;
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

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission
  const query = document.getElementById('searchInput').value.trim(); // Get search query from input
  if (query.length > 2) {
    fetchSuperheroes(query); // Fetch superheroes if query length is greater than 2
  } else {
    console.log('Query too short, please enter more than 2 characters.'); // Log message if query is too short
  }
});