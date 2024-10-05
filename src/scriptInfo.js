// // script.js



// // Function to display star information
// function displayStarInfo(starData) {
//     const starInfoDiv = document.getElementById('starInfo');
//     starInfoDiv.innerHTML = `
//         <h2>Star Information</h2>
//         <p><strong>Name:</strong> ${starData.pl_name}</p>
//         <p><strong>Host Name:</strong> ${starData.hostname}</p>
//         <p><strong>Discovery Method:</strong> ${starData.discoverymethod}</p>
//         <p><strong>Discovery Year:</strong> ${starData.disc_year}</p>
//         <p><strong>Orbital Period:</strong> ${starData.pl_orbper}</p>
//         <p><strong>Distance:</strong> ${starData.sy_dist}</p>
//     `;
// }

// // Fetch and process the JSON file
// fetch('Exoplanets.json')
//     .then(response => response.json())
//     .then(data => {
//         // Display information for the first star as an example
//         displayStarInfo(data[0]);
//     })
//     .catch(error => console.error('Error fetching the JSON file:', error));