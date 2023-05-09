import storage from "./storage.js";
//var projets;
let projets = [];
// Tout englober ds une fonction async et l'appeler à la fin
async function genererProjets() {
    // Récupération des projets depuis le fichier JSON
    //récupérer adresse http dans le swagger, onglet "works".
    //Fonction async donc pendant que l'on attend la réponse, on execute le code suivant.
    const reponse = await fetch('http://localhost:5678/api/works');
    projets = await reponse.json();

    //On récupère "projets" de la "function afficherProjets(projets)" pour pouvoir le rendre dispo ici pour pouvoir filter les boutons
    afficherProjets(projets);


    //Créations des filtres pour les boutons. On récupère tous les boutons de ".btn-filtres" grace à "querySelectorAll".
    const boutonsFiltres = document.querySelectorAll(".btn-filtres");

    //Pour les boutons de "boutonsFiltres" on ajoute un "addEventListener" avec un arg1 "click" et arg2 function(e)
    for (let btn of boutonsFiltres) {
        btn.addEventListener("click", function (e) {
            //On déclare categoryId en récupérant le "dataset.catégorie" (ref.HTML)
            let categoryId = e.target.dataset.categorie
            let projetsFiltres = projets;
            //Si la catégorie est différente de 0 (bouton tous) alors on applique la fonction suivante.
            if (categoryId != 0) {
                projetsFiltres = projets.filter(function (projet) {
                    return projet.categoryId == categoryId;
                });
            }
            //On appelle la fonction pour afficher les résultats.
            afficherProjets(projetsFiltres);
        });


    }
    //ajouter bouton pour ouvir la modale et faire apparaître les projets.
    const bntModifier = document.querySelector("#btn_modifier_gallery");

    bntModifier.addEventListener("click", function (e) {
        afficherGalleryModal(projets);
        modalContainer.classList.toggle("active");
        modalBody.classList.add('gallery');
        modalBody.classList.remove('work');

    })

}

// Apppler la fonction async
genererProjets()


//afficher les projets dans la page principale
function afficherProjets(projets) {

    const divGallery = document.querySelector("#gallery");
    //on efface les projets affichés
    divGallery.innerHTML = '';
    //On parcourt les projets
    for (let i = 0; i < projets.length; i++) {

        const id = projets[i];
        //Récupération de l'élément du DOM qui accueillera les projets

        const filtresProjetsElement = document.createElement("filtres-projets")
        filtresProjetsElement.dataset.projetId = id.id;
        const imageUrlElement = document.createElement("img");
        imageUrlElement.src = id.imageUrl;
        imageUrlElement.alt = id.title;
        const titleElement = document.createElement("p");
        titleElement.innerText = id.title;

        divGallery.appendChild(filtresProjetsElement);
        filtresProjetsElement.appendChild(imageUrlElement);
        filtresProjetsElement.appendChild(titleElement);
    }
}


// fonction pour afficher la galerie et les icones dans la modale.
function afficherGalleryModal(projets) {
    const modalGallery = document.querySelector("#modal_gallery");
    modalGallery.innerHTML = '';
    for (let i = 0; i < projets.length; i++) {
        const id = projets[i];

        //const sort_num = $('input[type="hidden"]:last').attr('id') + counter ;
        // counter ++;
        modalGallery.innerHTML += `
        <div class="image_icone modal_view_gallery" data-id="${id.id}">
        <i class="icone onDelete fa-solid fa-trash-can" ></i>
        <img class="img" src="${id.imageUrl}" alt="${id.title}">
        <button class="btn_editer">éditer</button>
        </div>`;
    }
    prepareDelete();
}




//Récupère les balises/éléments de la modale.
const modalContainer = document.querySelector(".modal-container");
modalContainer.style.display = "block";
const modalBody = document.querySelector(".modal");
const modalAddWork = document.querySelectorAll(".modal_add_work");

//Afficher/masquer les éléments pour ajouter un projet dans la modale
function afficherAjoutProjet() {
    modalBody.classList.remove('gallery');
    modalBody.classList.add('work');
    document.querySelector(".icon_retour").style.visibility = "visible";
    resetAjoutProjet();
}


//effacer les champs ajout projet
function resetAjoutProjet() {
    const beforeUpload = document.querySelectorAll(".before_upload");
    for (const element of beforeUpload) {
        element.style.display = "block"
    }
    document.querySelector('#champs_projet').value = "";
    document.querySelector('#categorie_projet').value = "0";
    const figure = document.getElementById('figure');
    if (figure) {
        figure.style.display = "none";
    }
    // document.getElementById('figure').style.display = "none";
}


//Bouton pour fermer la modale.
const btnModalClose = document.querySelector(".modal_close");
btnModalClose.addEventListener("click", function () {
    resetAjoutProjet();
    modalContainer.classList.toggle("active");
})
const overlayCloseModal = document.querySelector(".overlay");
overlayCloseModal.addEventListener("click", function () {
    resetAjoutProjet();
    modalContainer.classList.toggle("active");
})


//Bouton "ajouter une photo" : nouvelle fenêtre.
const btnAddWork = document.querySelector(".btn_ajout_photo");
btnAddWork.addEventListener("click", function (e) {
    resetAjoutProjet();
    afficherAjoutProjet();
})



const champsTitre = document.querySelector("#champs_projet");
const category = document.getElementById('categorie_projet');
let isTitleValid = false;
let isCategoryValid = false;

champsTitre.addEventListener('keyup', function () {
    if (champsTitre.value == "") {
        alert("Veuillez ajouter un titre.")
        isTitleValid = false;
    } else {
        isTitleValid = true
    }
    checkFormValidity();

})
category.addEventListener('change', function () {
    if (category.value == "0") {
        alert("Veuillez choisir une catégorie.")
        isCategoryValid = false;
    } if (category.value != "0") {
        isCategoryValid = true;
    }
    checkFormValidity();
});



function checkFormValidity() {
    const img = document.getElementById("image")
    let imgSrc = "";
    if (img) {
        imgSrc = img.getAttribute("src");
    }
    //;

    if ((isTitleValid) && (isCategoryValid) && (imgSrc !== "")) {
        formSendWork.removeAttribute('disabled');
        formSendWork.style.backgroundColor = "#1D6154";
    } else {
        formSendWork.setAttribute('disabled', "");
        formSendWork.style.backgroundColor = "#A7A7A7";
    }
}


//Bouton retour arrière
const btnRetour = document.querySelector("#icon_retour");
btnRetour.addEventListener("click", function () {
    modalBody.classList.remove('work');
    modalBody.classList.add('gallery');
    document.querySelector(".icon_retour").style.visibility = "hidden";
    resetAjoutProjet();
});


//Bouton pour ajouter un projet.
const inputImageProjet = document.querySelector("#image_projet")
const btonUpload = document.querySelector(".btn_upload");
btonUpload.addEventListener("click", function () {
    inputImageProjet.click();
})


//Télécharger une photo.
const inputUploadWork = document.querySelector("#image_projet");
inputUploadWork.addEventListener('change', previewFile);
function previewFile() {
    //stocker fichier dans une constante "file"
    const file = this.files[0];
    // contient l'instance de la class "fileReader"
    const fileReader = new FileReader();
    //methode "readAsDataURL" pour lire fichier dans "file"
    fileReader.readAsDataURL(file);
    //addEvenListener pour afficher l'image
    fileReader.addEventListener('load', (event) =>
        displayImage(event, file));
}


//fonction pour prévisualiser l'image.
function displayImage(event) {
    const figureElement = document.createElement("figure");
    figureElement.id = "figure";
    //(propriété "result" : contenu du ficher)
    const imageElement = document.createElement("img");
    imageElement.id = "image";
    imageElement.src = event.target.result;
    imageElement.alt = "apperçu";

    //effacer les boutons pour uploader
    const beforeUpload = document.querySelectorAll(".before_upload");
    for (const element of beforeUpload) {
        element.style.display = "none"
    };
    figureElement.appendChild(imageElement);
    document.body.querySelector(".preview_image").append(figureElement);
    checkFormValidity();
}


//Envoyer nouveau projet
const formSendWork = document.querySelector('#btn_valider_image');
formSendWork.addEventListener('click', function (e) {
    e.preventDefault();
    const formData = new FormData();
    const imgUrl = document.querySelector('#image_projet').files[0];
    const title = document.getElementById('champs_projet').value;
    const category = document.getElementById('categorie_projet');
    const categoryValue = category.options[category.selectedIndex].value;

    formData.append('image', imgUrl);
    formData.append('title', title);
    formData.append('category', categoryValue);

    if (title == "" || categoryValue == "" || imgUrl == "") {
        // throw error
        // alert("Vous n'avez pas correctement rempli les champs");
    } else {

        if (storage.isconnected() == false) {
            throw new Error("Utilisateur non connecté");
        }
        else {
            const token = storage.get();
            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': "Bearer " + token.token
                },
                body: formData,
            })
                .then(function (response) {
                    return response.json()
                })
                .then(addDom => {
                    projets.push(addDom);
                    afficherProjets(projets);
                    afficherGalleryModal(projets);
                })
                .catch((err) => {
                    console.error(err + "Erreur");
                })
        };
    }
})



//Supprimer un projet
function prepareDelete() {
    const deleteBtn = document.querySelectorAll(".onDelete");
    deleteBtn.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            //récuperer le parent
            const parent = e.target.closest(".image_icone");
            const id = parent.dataset.id;

            fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': "Bearer " + token.token
                }
            }) //retirer l'élément du DOM sans tout recharger
                .then(result => {
                    parent.remove();
                    const index = projets.findIndex((elem) => elem.id == id);
                    projets.splice(index, 1);

                    document.querySelector('[data-projet-id="' + id + '"').remove()
                })


        });
    })

}


const token = storage.get();

//Faire apparaître/disparaître les éléments quand l'utilisateur est connecté ou non.
const loginLogout = document.querySelector(".login_logout");
const btnModifier = document.querySelector(`.btn_modifier`);
const filtres = document.querySelector('.filtres-projets');
if (storage.isconnected()) {
    loginLogout.innerText = "logout";
    btnModifier.style.display = "visible";
    filtres.style.display = "none";
} else {
    (storage.logout())
    loginLogout.innerText = "login";
    btnModifier.style.display = "none";
    const modifTextePrésentation = document.querySelector(".modif_texte_présentation");
    modifTextePrésentation.style.display = "none";
    const modifProfil = document.querySelector(".modif_profil");
    modifProfil.style.display = "none";
    const modifProjets = document.querySelector(".modif_projets");
    modifProjets.style.display = "none";
    filtres.style.display = "flex";
}

loginLogout.addEventListener("click", function () {
    if ((storage.isconnected) != true) {
        sessionStorage.removeItem('user')
    }
})