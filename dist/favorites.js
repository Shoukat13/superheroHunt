/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/favorites.js":
/*!**************************!*\
  !*** ./src/favorites.js ***!
  \**************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', () => {\r\n  displayFavorites(); // Load and display favorite superheroes\r\n});\r\n\r\n// Display favorite superheroes from localStorage\r\nfunction displayFavorites() {\r\n  const favoriteList = document.getElementById('favoriteList');\r\n\r\n  // Check if the element with ID 'favoriteList' exists\r\n  if (!favoriteList) {\r\n    console.error('Element with ID \"favoriteList\" not found.');\r\n    return;\r\n  }\r\n\r\n  // Clear previous list content to prevent duplication\r\n  favoriteList.innerHTML = '';\r\n\r\n  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];\r\n\r\n  if (favorites.length === 0) {\r\n    favoriteList.innerHTML = '<p>No favorites added yet.</p>';\r\n    return;\r\n  }\r\n\r\n  favorites.forEach(hero => {\r\n    const heroElement = document.createElement('div');\r\n    heroElement.className = 'hero';\r\n    heroElement.innerHTML = `\r\n      <div class=\"card\" style=\"width: 18rem;\">\r\n        <img src=\"${hero.thumbnail.path}.${hero.thumbnail.extension}\" class=\"card-img-top\" alt=\"${hero.name}\">\r\n        <div class=\"card-body\">\r\n          <h5 class=\"card-title\">${hero.name}</h5>\r\n          <button class=\"btn btn-danger remove-btn\" data-id=\"${hero.id}\">Remove from Favorites</button>\r\n        </div>\r\n      </div>\r\n    `;\r\n    favoriteList.appendChild(heroElement);\r\n\r\n    // Add event listener to remove button\r\n    heroElement.querySelector('.remove-btn').addEventListener('click', () => {\r\n      removeFromFavorites(hero.id);\r\n    });\r\n    heroElement.addEventListener('click', () => {\r\n      window.location.href = `superherodetails.html?id=${hero.id}`;\r\n    });\r\n  });\r\n}\r\n\r\n// Remove superhero from favorites in localStorage\r\nfunction removeFromFavorites(heroId) {\r\n  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];\r\n\r\n  // Optional: Add a confirmation prompt before removing\r\n  if (confirm('Are you sure you want to remove this superhero from favorites?')) {\r\n    favorites = favorites.filter(hero => hero.id !== heroId); // Remove hero with the matching id\r\n    localStorage.setItem('favorites', JSON.stringify(favorites));\r\n    displayFavorites(); // Refresh the favorites list\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/favorites.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/favorites.js"]();
/******/ 	
/******/ })()
;