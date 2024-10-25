export function getAddressFromCoords(latitude, longitude) {
    return fetch(`https://api-adresse.data.gouv.fr/reverse/?lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(response => {
            if (response.features.length == 0) {
                throw new Error("No matching address for this lat and lon");
            }
            
            return response.features[0].properties.label;
        });
}

 /**---Trouver le nom et l'adresse de tout les ciné */
 export function findCine({ latitude: lat, longitude: lon }, range) {
    const url = `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=within_distance(geolocalisation%2C%20geom%27POINT(${lon}%20${lat})%27%2C%20${range}km)&limit=100`;
    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(response => {
            // Parcourir la réponse pour extraire uniquement le nom et l'adresse
            const listCine = response.results.map(record => {
                return {
                    nom: record.nom,
                    adresse: record.adresse
                };
            });
            // Afficher le résultat filtré
            console.log(listCine);
            return listCine;
        })
        .catch(error => {
            console.error('Erreur:', error.message);
        });
}