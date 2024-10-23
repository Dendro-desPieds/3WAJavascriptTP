// Recuperation du select des region
const regionSct = document.querySelector('#region-select');
//Recuperation du select du department
const departmentSct = document.querySelector('#department-select');
//Recuperation du bouton d'affichage des commune
const communeBtn = document.querySelector('#commune-button');
//recuperation de l'element liste des communes
const communeList = document.querySelector('#commune-list');
const cityDetail = document.querySelector('#city-detail');
const baseUrl = 'https://geo.api.gouv.fr';
let communes;
let communeDetail;

//recuperation de la liste des regions depuis le serveur
fetch(`${baseUrl}/regions`).then(response => response.json()).then(response => {
    //On rempli le select de region en gardant le code comme value de l'option et en affichant le nom
    regionSct.innerHTML = response.map(region => {
        return `<option value='${region.code}'>${region.nom}</option>`;
    }).join(' ');
    console.log(regionSct.value);
})

regionSct.addEventListener('change', (e) => {
    //on recupere la liste de departement de la region depuis le serveur
    fetch(`${baseUrl}/regions/${regionSct.value}/departements `).then(response => response.json()).then(response => {
        //on rempli le select des department en gardant comme value le code et en affichant le nom
        departmentSct.innerHTML = response.map(departement => {
            return `<option value='${departement.code}'>${departement.nom}</option>`;
        }).join(' ');
    });
})

communeBtn.addEventListener('click', (e) => {
    //on recupere la liste des communes du department depuis le serveur
    fetch(`${baseUrl}/departements/${departmentSct.value}/communes`).then(response => response.json()).then(response => {
            // Convertir les communes en objets avec des propriétés claires
            const communes = response.map(commune => {
                return { nom: commune.nom, population: commune.population };
            });
            // Trier les communes par population en ordre décroissant
            communes.sort((a, b) => b.population - a.population); // Pour trier par ordre croissant, inverser les termes
            // Remplir la liste des communes
            communeList.innerHTML = communes.map(commune => {
                return `<li value='${commune.code}'>${commune.nom}</li>`;
            }).join('');
            // Afficher le tableau trié dans la console pour vérification
            communeDetail = document.querySelectorAll('li');
    })
})

for (let commune of communeDetail){
    commune.addEventListener('click'), (e)=>{
        fetch(`${baseUrl}/${commune.innerHTML}`).then(response => response.json()).then(response =>{
            cityDetail = response.map(city => {
                return `Nom : ${city.nom}<br>Population : ${city.population}<br>`;
            })
        })
    }
}





