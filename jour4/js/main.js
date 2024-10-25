import { getCoords, getCoordsFromAddress } from './geolocation.js';
import { getAddressFromCoords, findCine } from './addressApi.js';

const elements = {
    geolocationBtn: document.querySelector('#geolocation-btn'),
    addressSearch: document.querySelector('#address-search'),
    distanceSlider: document.querySelector('#distance-slider'),
    cineList: document.querySelector('#cine-list'),
    findBtn: document.querySelector('#find-btn'),
    errorText: document.querySelector('#error-txt')
};

elements.geolocationBtn.addEventListener('click', () => {
    getCoords().then(({ latitude, longitude }) => getAddressFromCoords(latitude, longitude)).then(address => {
        elements.addressSearch.value = address;
        /**Gestion des erreurs */
    }).catch(error => {
        elements.errorText.textContent = `An error occured : ${error.message}`;
        elements.errorText.removeAttribute('hidden');

        waitFor(5).then(() => {
            elements.errorText.setAttribute('hidden', true);
        });
    });
});

elements.findBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //Je vide la liste
    elements.cineList.innerHTML = '';
    getCoordsFromAddress(elements.addressSearch.value).then(pos => {
        console.log(pos);
        findCine(pos, elements.distanceSlider.value).then(listeCine => {
            console.log(listeCine);
            listeCine.forEach(element => {
                console.log(element);
                const newCine = document.createElement('li');
                newCine.innerHTML = `${element.nom} , ${element.adresse}`;
                elements.cineList.append(newCine);
            });
        })
    }).catch(error => {
        elements.errorText.textContent = `An error occured : ${error.message}`;
        elements.errorText.removeAttribute('hidden');

        waitFor(5).then(() => {
            elements.errorText.setAttribute('hidden', true);
        });
    });
})


/**---Fonction d'attente --- */
function waitFor(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}




