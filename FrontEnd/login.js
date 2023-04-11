import storage from "./storage.js";
    
 
    const loginForm = document.querySelector('form input[type="submit"]')
    loginForm.addEventListener('click', async function (e) {
        e.preventDefault();
        let valid = true;
        for (let input of document.querySelectorAll("form input")) {
            //input.setCustomValidity("Erreur dans l’identifiant ou le mot de passe");
            valid = valid && input.reportValidity();
            console.log("form valid", input, valid);
            if (!valid) {
                break;
            }
            console.log(valid);
        }
        console.log("form valid", valid);
        if (valid) {
            //récupérer email et password utilisateur 
            const form = {
                email: document.getElementById("email"),
                password: document.getElementById("password")
            };
            console.log("form values", form);
            
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

                        return response.json()
                    }

                    else {
                        throw Error(response.statusText)
                    }
                })
                //récupérer data utilisateur
                .then((data) => {

                    if (data.error) {
                        alert("Erreur dans l’identifiant ou le mot de passe");
                    } else {
                        storage.save(data)
                        //sessionStorage.setItem('token', data.token);
                        //sessionStorage.setItem('userId', data.userId);
                        //Evite d'ouvrir une nouvelle fenetre.
                        //window.location = "/index.html" ; pour eviter localhost 5500 lorsuq'on déploit
                        window.location.assign("http://127.0.0.1:5500/FrontEnd/index.html");
                    }
                })
                .catch((err) => {
                    console.error("Erreur");
                });
        }
    }
    );

