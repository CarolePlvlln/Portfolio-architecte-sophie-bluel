import storage from "./storage.js";
//var projets;

// Tout englober ds une fonction async et l'appeler à la fin
async function genererProjets() {
    // Récupération des projets depuis le fichier JSON
    //récupérer adresse http dans le swagger, onglet "works".
    //Fonction async donc pendant que l'on attend la réponse, on execute le code suivant.
    const reponse = await fetch('http://localhost:5678/api/works');
    const projets = await reponse.json();

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
    const modalGallery = document.querySelector("#modal_gallery");

    modalGallery.innerHTML = '';
    for (let i = 0; i < projets.length; i++) {
        const id = projets[i];
        //const sort_num = $('input[type="hidden"]:last').attr('id') + counter ;
   // counter ++;
        modalGallery.innerHTML += `
        <div class= "image_icone modal_view_gallery">
        <button class="buttonIcon"></button>
        <i class="icone fa-solid fa-trash-can"></i>
        <image classe = "img" src="${id.imageUrl}" value="'+sort_num+'">
        
        <button class="btn_editer">éditer</button>
        </div>`
    }

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
    document.querySelector(".icon_retour").style.visibility="visible";
    resetAjoutProjet ()
}

//effacer les champs ajout projet
function resetAjoutProjet (){
    document.querySelector('#champs_projet').value= "";
    document.querySelector('#categorie_projet').value= "0";
    document.querySelector('#image_projet').value="";
    document.querySelector('.btn_upload').value="";
}

//Bouton pour fermer la modale.
const btnModalClose = document.querySelector(".modal_close");
btnModalClose.addEventListener("click", function () {
    modalContainer.classList.toggle("active");
})


//Bouton "ajouter une photo" : nouvelle fenêtre.
const btnAddWork = document.querySelector(".btn_ajout_photo");
btnAddWork.addEventListener("click", function (e) {
    return afficherAjoutProjet();
});

//Bouton retour arrière
const btnRetour = document.querySelector("#icon_retour");
btnRetour.addEventListener("click", function () {
    modalBody.classList.remove('work');
    modalBody.classList.add('gallery');
    document.querySelector(".icon_retour").style.visibility="hidden";
    resetAjoutProjet ();
    
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
    if (this.files.length === 0) {
        return;
    }
    //stocker fichier dans une constante "file"
    const file = this.files[0];
    // contient l'instance de la class "fileReader"
    const fileReader = new FileReader();
    //methode "readAsDataURL" pour lire fichier dans "file"
   // fileReader.readAsDataURL(file);
    fileReader.onloadend = function() {
        console.log(fileReader.result);}
        fileReader.readAsBinaryString(file);
    //addEvenListener pour afficher l'image
    fileReader.addEventListener('load', (event) =>
        displayImage(event, file));
}


//fonction pour prévisualiser l'image.
function displayImage(event) {
    const figureElement = document.createElement("figure");
    figureElement.id = "c";
    //(propriété "result" : contenu du ficher)
    const imageElement = document.createElement("img");
    imageElement.id = "image";
    imageElement.src = event.target.result;
    //effacer les boutons pour uploader
    const beforeUpload = document.querySelectorAll(".before_upload");
    for (const element of beforeUpload) {
        element.style.display = "none"
    };
    figureElement.appendChild(imageElement);
    //figureElement.appendChild(figcaptionElement);

    document.body.querySelector(".preview_image").append(figureElement);
}


//changer couleur bouton valider 
// document.getElementById("#champs_projet").addEventListener('keyup', function() {
//     if (this.value.length >= 3 & (document.querySelector(".img") != ""))   {
//         document.getElementById('#btn_valider_image').removeAttribute('disabled');
// } else {
//   document.getElementById('#btn_valider_image').disabled = true;
// }
// });



//Envoyer nouveau projet
const formSendWork = document.querySelector('#btn_valider_image');

formSendWork.addEventListener('click', async function (e) {
    e.preventDefault();

    const formData = new FormData();
    const imgUrl = document.querySelector('img').getAttribute('src');
    const title = document.getElementById('champs_projet').value;
    const category = document.getElementById('categorie_projet');
    const categoryValue = category.options[category.selectedIndex].value;

    formData.append('image', imgUrl);
    formData.append('title', title);
    formData.append('category', categoryValue);

    if (title == "" || categoryValue == "" || imgUrl == "") {
        // throw error
        alert("Vous n'avez pas correctement rempli les champs");

    } else {
        
         if (storage.isconnected()==false) { 
             return (Error);
         }
         else{
             const token = storage.get();
             console.log(token);

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                //'Content-Type': "multipart/form-data",boundary="yet another boundary"
                'Authorization': "Bearer " + token.token
            },
            body: formData,
        })
        
            //Reponse API
            .then(function(response){ 
                return response.json()})

            .then(function(success){ 
               console.log(success)})

            .catch((err) => {
                console.error("Erreur");
            })
    };
}
    //title.innerHTML = "";
    //categoryValue = "0";
   //imgUrl.innerHTML = "";
})






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


