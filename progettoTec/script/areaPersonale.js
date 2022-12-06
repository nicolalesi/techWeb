
    /*if(!document.cookie){
        console.log("Non sei loggato");
        window.alert("Non sei loggato");
        window.location.replace("login.html");
    } */   
    
    function logout(){
        document.cookie="null";
        window.location.replace("home.html");
    }

    if(document.cookie){
    console.log("Il cookie da questa pagina "+document.cookie);

    if(document.cookie=="admin"){

        document.getElementById("titolo").innerHTML="Modifica informazioni utenti";
        
        var divAdmin=document.getElementById("divAdmin");
        var p=document.createElement("p");
        p.innerHTML="Lista utenti registrati al portale";
        divAdmin.appendChild(p);

        var table=document.createElement("table");
        table.classList.add("table");
        table.classList.add("table-primary");

        var tr=document.createElement("tr");
        var id=document.createElement("th");
        var email=document.createElement("th");
        var nome=document.createElement("th");
        var cognome=document.createElement("th");
        var punteggio=document.createElement("th");
        var password=document.createElement("th");

        id.innerHTML="Id";
        email.innerHTML="Email";
        nome.innerHTML="Nome";
        cognome.innerHTML="Cognome";
        punteggio.innerHTML="Punteggio";
        password.innerHTML="Password";

        table.appendChild(tr);
        table.appendChild(id);
        table.appendChild(email);
        table.appendChild(nome);
        table.appendChild(cognome);
        table.appendChild(punteggio);
        table.appendChild(password);

        divAdmin.appendChild(table);

        var settings = {
                "url": "http://localhost:3000/utenti/",
                "method": "GET",
                "timeout": 0,
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);

                    for(let i=0;i<response.length;i++){

                        var riga=document.createElement("tr");

                        riga.id="riga"+i;

                        var idUtente=document.createElement("td");
                        var emailUtente=document.createElement("td");
                        var nomeUtente=document.createElement("td");
                        var cognomeUtente=document.createElement("td");
                        var punteggioUtente=document.createElement("td");
                        var passwordUtente=document.createElement("td");
                        var bottoneUpdate=document.createElement("td");

                        idUtente.id="id"+i;
        
                        idUtente.innerHTML=response[i].id;
                        emailUtente.innerHTML=response[i].email;
                        nomeUtente.innerHTML=response[i].nome;
                        cognomeUtente.innerHTML=response[i].cognome;
                        punteggioUtente.innerHTML=response[i].punteggio;
                        passwordUtente.innerHTML=response[i].password;

                        var buttonUpdate=document.createElement("input");
                        buttonUpdate.type="button";
                        buttonUpdate.value="Modifica";
                        buttonUpdate.classList.add("btn");
                        buttonUpdate.classList.add("btn-primary");
                        buttonUpdate.addEventListener("click", function(){ updateProfilo(i);  }); 
                        bottoneUpdate.appendChild(buttonUpdate);

                        riga.appendChild(idUtente);
                        riga.appendChild(emailUtente);
                        riga.appendChild(nomeUtente);
                        riga.appendChild(cognomeUtente);
                        riga.appendChild(punteggioUtente);
                        riga.appendChild(passwordUtente);
                        riga.appendChild(buttonUpdate);

                        table.appendChild(riga);

                        var rigaInput=document.createElement("tr");
                        rigaInput.id="rigaInput"+i;
                        rigaInput.style.visibility="hidden";

                        var idTd=document.createElement("td");
                        var emailTd=document.createElement("td");
                        var nomeTd=document.createElement("td");
                        var cognomeTd=document.createElement("td");
                        var punteggioTd=document.createElement("td");
                        var passwordTd=document.createElement("td");

                        /*idTd.style.display="none";
                        idTd.id="idTd"+i;
                        emailTd.style.display="none";
                        emailTd.id="emailTd"+i;
                        nomeTd.style.display="none";
                        nomeTd.id="nomeTd"+i;
                        cognomeTd.style.display="none";
                        cognomeTd.id="cognomeTd"+i;
                        punteggioTd.style.display="none";
                        punteggioTd.id="punteggioTd"+i;*/

                        var emailInput=document.createElement("input");
                        emailInput.type="text";
                        emailInput.id="emailInput"+i;
                        emailInput.classList.add("form-control");
                        var nomeInput=document.createElement("input");
                        nomeInput.type="text";
                        nomeInput.id="nomeInput"+i;
                        nomeInput.classList.add("form-control");
                        var cognomeInput=document.createElement("input");
                        cognomeInput.type="text";
                        cognomeInput.id="cognomeInput"+i;
                        cognomeInput.classList.add("form-control");
                        var punteggioInput=document.createElement("input");
                        punteggioInput.type="text";
                        punteggioInput.id="punteggioInput"+i;
                        punteggioInput.classList.add("form-control");
                        var passwordInput=document.createElement("input");
                        passwordInput.type="text";
                        passwordInput.id="passwordInput"+i;
                        passwordInput.classList.add("form-control");

                        var buttonInvia=document.createElement("input");
                        buttonInvia.type="button";
                        buttonInvia.value="Invia Dati";
                        buttonInvia.addEventListener("click", function(){ inviaDati(i);  }); 


                        emailTd.appendChild(emailInput);
                        nomeTd.appendChild(nomeInput);
                        cognomeTd.appendChild(cognomeInput);
                        punteggioTd.appendChild(punteggioInput);
                        passwordTd.appendChild(passwordInput);

                        rigaInput.appendChild(idTd);
                        rigaInput.appendChild(emailTd);
                        rigaInput.appendChild(nomeTd);
                        rigaInput.appendChild(cognomeTd);
                        rigaInput.appendChild(punteggioTd);
                        rigaInput.appendChild(passwordTd);
                        rigaInput.appendChild(buttonInvia);

                        table.appendChild(rigaInput);



                       // var nome=document.createElement("")
                    }
                });

    }
    else{
    var settings = {
                "url": "http://localhost:3000/utenti/"+document.cookie,
                "method": "GET",
                "timeout": 0,
                };

                $.ajax(settings).done(function (response) {

                infoResponse=response;
                console.log(infoResponse);

                document.getElementById("nome").innerHTML=infoResponse.nome;
                document.getElementById("cognome").innerHTML=infoResponse.cognome;
                document.getElementById("nomeUtente").innerHTML=infoResponse.email;
                document.getElementById("punteggio").innerHTML=infoResponse.punteggio;
                
                console.log(document.getElementById("nomeUtente").innerHTML);

                var settings = {
                "url": "http://localhost:3000/messaggio?destinatario="+document.getElementById("nomeUtente").innerHTML,
                "method": "GET",
                "timeout": 0,
                };

                $.ajax(settings).done(function (response) {

                var divPosta=document.getElementById("casellaPosta");
                for(let i=0;i<response.length;i++){
                    
                    var divMessaggio=document.createElement("div");
                    var pMittente=document.createElement("p");
                    var pMessaggio=document.createElement("p");

                    divMessaggio.id="divMessaggio";
                    divMessaggio.classList.add("border");
                    divMessaggio.classList.add("border-primary");
                    pMittente.innerHTML=response[i].mittente;
                    pMittente.id="mittente";
                    pMessaggio.innerHTML=response[i].messaggio;


                    divMessaggio.appendChild(pMittente);
                    divMessaggio.appendChild(pMessaggio);

                    divPosta.appendChild(divMessaggio);

                }

                });
                });

            }
            }

            function updateProfilo(i){
                
                document.getElementById("rigaInput"+i).style.visibility="visible";
            }

            function inviaDati(i){

                var id=document.getElementById("id"+i).innerHTML;
                console.log(id);

                var email=document.getElementById("emailInput"+i).value;
                var nome=document.getElementById("nomeInput"+i).value;
                var cognome=document.getElementById("cognomeInput"+i).value;
                var punteggio=document.getElementById("punteggioInput"+i).value;
                var password=document.getElementById("passwordInput"+i).value;

                console.log(email);
                console.log(nome);
                console.log(cognome);
                console.log(punteggio);

                var settings = {
                        "url": "http://localhost:3000/utenti/"+id,
                        "method": "GET",
                        "timeout": 0,
                        "headers": {
                        "Content-Type": "application/json"
                        }
                    };

                    $.ajax(settings).done(function (response) {
                    console.log(response);

                                    
                    if(!email)
                        email=response.email;
                    if(!nome)
                        nome=response.nome;
                    if(!cognome)
                        cognome=response.cognome;
                    if(!punteggio)
                        punteggio=response.punteggio;
                    if(!password)
                        password=response.password;


                    var settings = {
                            "url": "http://localhost:3000/utenti/"+id,
                            "method": "PUT",
                            "timeout": 0,
                            "headers": {
                            "Content-Type": "application/json"
                            },
                            "data": JSON.stringify({
                            "email": email,
                            "password": password,
                            "nome": nome,
                            "cognome":cognome,
                            "punteggio":punteggio
                            }),

                        };

                        $.ajax(settings).done(function (response) {
                        console.log(response);
                        window.alert("Aggiornamento utente ok");
                        window.location.reload();
                    });
                }
                
                );

        }