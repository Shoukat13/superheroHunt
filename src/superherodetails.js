document.addEventListener('DOMContentLoaded', () => {
    // Extract superhero ID from the URL query string
    const params = new URLSearchParams(window.location.search);
    const heroId = params.get('id');
  
    if (heroId) {
      fetchSuperheroDetails(heroId); // Fetch superhero details using the ID
    } else {
      console.error('No superhero ID provided in the URL.');
    }
  });
  
  // Function to fetch superhero details by ID
  async function fetchSuperheroDetails(heroId) {
    const MD5 = require("crypto-js/md5"); // Assuming you're bundling crypto-js with Webpack
    const publicKey = 'fd3fc9ccfa4cfbc964b1c11146d0950d'; 
    const privateKey = '7d464d0ae30a358679b38112c504489c5b52f4f2';
  
    // Generate MD5 hash
    function generateHash(ts) {
      return MD5(ts + privateKey + publicKey).toString();
    }
  
    const ts = new Date().getTime();
    const hash = generateHash(ts);
    const url = `https://gateway.marvel.com/v1/public/characters/${heroId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      displaySuperheroDetails(data.data.results[0]); // Assuming data is returned correctly
    } catch (error) {
      console.error('Error fetching superhero details:', error);
    }
  }
  
  // Function to display superhero details in the DOM
  function displaySuperheroDetails(hero) {
    document.getElementById('heroName').textContent = hero.name;
    document.getElementById('heroImage').src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
    
    // Displaying additional details
    document.getElementById('heroDetails').innerHTML = `
        <p>${hero.description ? hero.description : 'No description available.'}</p>
        <p><strong>Comics:</strong> ${hero.comics.available} available</p>
        <p><strong>Series:</strong> ${hero.series.available} available</p>
        <p><strong>Events:</strong> ${hero.events.available} available</p>
        <p><strong>Stories:</strong> ${hero.stories.available} available</p>
        <a href="${hero.urls[0] ? hero.urls[0].url : '#'}" target="_blank">More Info</a>
    `;
  }