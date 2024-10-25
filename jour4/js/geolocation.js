export function getCoords() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            resolve(position.coords); 
        }, error => {
            reject(error);
        });
    });
}

/**---Recuperer les coordonée de l'adresse envoyé--- */
export function getCoordsFromAddress(address) {
    // URL de l'API Nominatim pour effectuer une recherche par adresse
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}&limit=1`;
    // Effectuer la requête HTTP GET
    return fetch(url).then(response => {
            return response.json();
        }).then(result => {
            // Récupérer les coordonnées 
            return {latitude: (result[0].lat), longitude: (result[0].lon)};
        })
        .catch(error => {
            console.error('Erreur:', error.message);
        });
}