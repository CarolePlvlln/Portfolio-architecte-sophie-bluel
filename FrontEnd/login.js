
document.querySelector("email"),
    document.querySelector("password"),
    document.querySelector('form input[type="submit"]').addEventListener('click', async function (e) {
        e.preventDefault();
        let valid = true;
        for (let input of document.querySelectorAll("form input")) {
            // input.setCustomValidity("Erreur dans l’identifiant ou le mot de passe");
            valid = valid && input.reportValidity();
            console.log("form valid", input, valid);
            if (!valid) {
                break;
            }
            console.log(valid);
        }
        console.log("form valid", valid);
        if (valid) {
            //récupérer email et password utilisateur (?)
            const form = {
                email: document.getElementById("email"),
                password: document.getElementById("password")
            };
            console.log("form values", form);
            /*let token = {}
            if (localStorage.token) {
                token = { 'Authorization': localStorage.token }
            }*/
            //Connexion API
            fetch('http://localhost:5678/api/users/login', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    email: form.email.value,
                    password: form.password.value,
                }),
            })
                //Reponse API correcte
                .then((response) => {
                    if (response.status == 200) {
                     
                        return response.json() } 
                   
                    else {
                        throw Error(response.statusText)
                    }
                })
                //récupérer data utilisateur
                .then((data) => {

                    if (data.error) {
                        alert("Erreur dans l’identifiant ou le mot de passe");
                    } else {
                        //Evite d'ouvrir une nouvelle fenetre.
                        sessionStorage.setItem('token', (data.token.JSON));
                        window.location.assign("http://127.0.0.1:5500/FrontEnd/index.html");
                    }
                })
                .catch((err) => {
                    console.error("Erreur");
                });
        }
    }
    );



//function saveToken(monToken){
//    sessionStorage.setItem('token', monToken.token);
//}