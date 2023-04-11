import storage from "./storage.js";

// Tout englober ds une fonction async et l'appeler à la fin
async function genererProjets() {
    // Récupération des projets depuis le fichier JSON
    //récupérer adresse http dans le swagger, onglet "works".
    //Fonction async donc pendant que l'on attend la réponse, on execute le code suivant.
    const reponse = await fetch('http://localhost:5678/api/works');
    const projets = await reponse.json();

    //On récupère "projets" de la "function afficherProjets(projets)" pour pouvoir le rendre dispo ici pour pouvoir filter les boutons
    afficherProjets(projets);
    afficherGalleryModal(projets);


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


}

// Apppler la fonction async
genererProjets()


function afficherProjets(projets) {

    const divGallery = document.querySelector(".gallery");
    //on efface les projets affichés
    divGallery.innerHTML = '';
    //On parcourt les projets
    for (let i = 0; i < projets.length; i++) {

        const id = projets[i];
        //Récupération de l'élément du DOM qui accueillera les projets

        const filtresProjetsElement = document.createElement("filtres-projets")
        //Créations des balises
        const imageUrlElement = document.createElement("img");
        imageUrlElement.src = id.imageUrl;
        const titleElement = document.createElement("p");
        titleElement.innerText = id.title;

        divGallery.appendChild(filtresProjetsElement);
        filtresProjetsElement.appendChild(imageUrlElement);
        filtresProjetsElement.appendChild(titleElement);

    }

}

// fonction pour afficher la galerie et les icones dans la modale.
function afficherGalleryModal(projets) {
    const modalGallery = document.querySelector(".modal_gallery");
    for (let i = 0; i < projets.length; i++) {
        const id = projets[i];
        modalGallery.innerHTML += `
        <div class= "image_icone">
        
        <i class="icone fa-solid fa-trash-can"></i>
        <image classe = "img" src= "${id.imageUrl}">
        
        <button class="btn_editer">éditer</button>
        </div>`
    }
}



/*document.querySelector(".modal_gallery").innerHTML += `
        <div><${afficherGalleryModal(projets)}>
        <i class="fa-solid fa-trash-can"></i>
        </div>`*/

//Bouton pour afficher la galerie dans la modale.
const modalContainer = document.querySelector(".modal-container");
const bntModifier = document.querySelectorAll("#btn_modifier_gallery");
for (let btn of bntModifier) {
    btn.addEventListener("click", function (e) {
        afficherGalleryModal(projets);
    })
};


//Bouton "modifier" pour ouvrir la modale. 
bntModifier.forEach(btn => btn.addEventListener("click", toggleModal))
function toggleModal() {
    modalContainer.classList.toggle("active");
    //afficher les elements (const)
}
//bouton pour fermer la modale
const btnModalClose = document.querySelector(".modal_close");
btnModalClose.addEventListener("click", function () {
modalContainer.classList.toggle("active")
})



//Bouton "ajouter une photo" : nouvelle fenêtre (masquer la galerie).
const btnAjoutPhoto = document.querySelector(".btn_ajout_photo");
btnAjoutPhoto.addEventListener("click", function (e) {
    const masquerGallery = document.querySelector(".modal_gallery");
    masquerGallery.style.display = "none";
    const cadre_ajout_projet = document.querySelector(".cadre_ajout_projet");
    cadre_ajout_projet.style.display = "block";
    const btnModalGalerie = document.querySelector(".btn_modal_galerie");
    btnModalGalerie.style.display = "none";
    const btnValider = document.querySelector("btn_valider_image");
    btnValider.style.display = "block";
    const iconRetour = document.querySelector("icon_retour");
    iconRetour.style.visibility = "visible";
    });


    
const inputImageProjet = document.querySelector("#image_projet")
const btonUpload = document.querySelector(".btn_upload");
btonUpload.addEventListener("click", function(){
    console.log("coucou");
inputImageProjet.click();
})

    /*Bouton retour arrière
    const btnRetour = document.querySelector("icon_retour");
    btnRetour.addEventListener("click", function () {
        return toggleModal()});*/


        

//Faire apparaître/disparaître les éléments quand l'utilisateur est connecté ou non.
if (storage.isconnected()) {
    const loginLogout = document.querySelector(".login_logout");
    loginLogout.innerText = "lougout";
    const btnModifier = document.querySelector(`#btn_modifier`);
    btnModifier.style.display = "visible";
} else {
    const loginLogout = document.querySelector(".login_logout");
    loginLogout.innerText = "login";
    const btnModifier = document.querySelector("#btn_modifier");
    btnModifier.style.display = "none";
    const modifTextePrésentation = document.querySelector(".modif_texte_présentation");
    modifTextePrésentation.style.display = "none";
    const modifProfil = document.querySelector(".modif_profil");
    modifProfil.style.display = "none";
    const modifProjets = document.querySelector(".modif_projets");
    modifProjets.style.display = "none";
}


