// Tout englober ds une fonction async et l'appeler à la fin
//Bien mettre en function async
async function genererProjets() {
    // Récupération des projets depuis le fichier JSON
    //récupérer adresse http dans le swagger, onglet "works".
    //Fonction async donc pendant que l'on attend la réponse, on execute le code suivant.
    const reponse = await fetch('http://localhost:5678/api/works');
    const projets = await reponse.json();

    //On récupère "projets" de la "function afficherProjets(projets)" pour pouvoir le rendre dispo ici pour pouvoir filter les boutons
    afficherProjets(projets);

    //Créations des filtres pour les boutons. On récupère tous les boutons de ".btn-filtres" grace à "querySelectorAll".
    //On fait une boucle "for"
    const boutonsFiltres = document.querySelectorAll(".btn-filtres");
    //Pour les boutons de "boutonsFiltres" on ajoute un "addEventListener" avec un arg1 "click" et arg2 function(e)
    for (let btn of boutonsFiltres){
        btn.addEventListener("click", function (e) {
    //On déclare categoryId en récupérant le "dataset.catégorie" (ref.HTML)
       let categoryId = e.target.dataset.categorie
       let projetsFiltres = projets;
       //Si la catégorie est différente de 0 (bouton tous) alors on applique la fonction suivante.
       if (categoryId != 0){
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