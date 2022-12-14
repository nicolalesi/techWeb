
    var infoResponse;

    getEmail();


    if(document.cookie=="null" || !document.cookie){
        console.log("Non sei loggato");
        document.getElementById("loggato").innerHTML="Non sei loggato non potrai aggiungere nè visualizzare post";
        document.getElementById("inviaPost").disabled=true;

        document.getElementById("login").style.display="block";
        document.getElementById("areaPersonale").style.display="none";
    }
    else
    {
        document.getElementById("loggato").innerHTML="Aggiungi un post alla bacheca";
        document.getElementById("login").style.display="none";
        document.getElementById("areaPersonale").style.display="block";
    }

    function showBacheca(value){
        document.getElementById(value).style.display="block";
        
        if(value!="aneddoti")
            document.getElementById("aneddoti").style.display="none";
        if(value!="partner")
            document.getElementById("partner").style.display="none"; 
        if(value!="aiutatemi")
            document.getElementById("aiutatemi").style.display="none";
            
    }

    function infoBacheca(){
    
    console.log("Il cookie da questa pagina "+document.cookie);

    var infoResponse;

    var settings = {
                "url": "http://localhost:3000/bacheca/",
                "method": "GET",
                "timeout": 0,
                };

                $.ajax(settings).done(function (response) {

                infoResponse=response;

                var div=document.getElementById("containerInfo");

                var clicked;

                for(let i=0;i<infoResponse.length;i++){
                    var nome=infoResponse[i].email;
                    var aneddoto=infoResponse[i].aneddoto;
                    var immagine=infoResponse[i].immagine;
                    var id=infoResponse[i].id;

                    var divPost= document.createElement("div");
                    var pEmail=document.createElement("p");
                    var pAneddoto=document.createElement("p");
                    var pImage=document.createElement("img");
                    var miPiace=document.createElement("img");

                    divPost.classList.add("border");
                    divPost.classList.add("border-primary");
                    pEmail.innerHTML=nome;
                    pEmail.id="pId";
                    pAneddoto.id="pAneddoto";
                    pAneddoto.innerHTML=aneddoto;
                    pImage.src=immagine;
                    pImage.id="imgAnimale";
                    miPiace.id="miPiace"+i;
                    miPiace.classList.add("miPiace");


                    if(document.cookie=="admin"){
                        miPiace.src="immagini/modifica.png";

                        var divModifica=document.createElement("div");
                        divModifica.id="divModifica";
                        var informazioni=document.createElement("p");
                        informazioni.innerHTML="Inserisci il dato che vuoi modificare e poi clicca il bottone in basso a destra per effettuare la modifica";
                        var inputEmail=document.createElement("input");
                        inputEmail.placeholder="Modifica email ";
                        inputEmail.id="inputEmail"+i;
                        inputEmail.classList.add("form-control");
                        var inputAneddoto=document.createElement("input");
                        inputAneddoto.placeholder="Modifica aneddoto ";
                        inputAneddoto.id="inputAneddoto"+i;
                        inputAneddoto.classList.add("form-control");
                        var inputImmagine=document.createElement("input");
                        inputImmagine.placeholder="Modifica URI immagine ";
                        inputImmagine.id="inputImmagine"+i;
                        inputImmagine.classList.add("form-control");
                        var deletePost=document.createElement("input");
                        deletePost.type="button";
                        deletePost.value="Elimina Post";
                        deletePost.classList.add("btn");
                        deletePost.classList.add("btn-danger");
                        deletePost.addEventListener("click",function(){
                            eliminaPost(infoResponse,i);
                        });

                        divModifica.appendChild(informazioni);
                        divModifica.appendChild(inputEmail);
                        divModifica.appendChild(inputAneddoto);
                        divModifica.appendChild(inputImmagine);
                        divModifica.appendChild(deletePost);

                        divPost.appendChild(divModifica);

                        miPiace.addEventListener("click",function(){
                            window.alert("Stai modificando il post con indice "+i);
                            //nome aneddoto immagine id
                            adminUpdatePost(infoResponse,i);
                        });

                    }
                    else{
                        if(findId(userResponse.preferiti,id)){
                            miPiace.src="immagini/cuoreMiPiace.png";
                            miPiace.value="true";
                            clicked=true;
                        }
                        else{
                            miPiace.src="immagini/miPiace.png";
                            miPiace.value="false";
                            clicked=false;
                        }

                        miPiace.addEventListener("click", function(){
                        if(clicked){
                            miPiace.src="immagini/miPiace.png";
                        }
                        else
                        {
                            miPiace.src="immagini/cuoreMiPiace.png";
                        }
                        addLike(infoResponse,i)}); 
                    }

                    divPost.id="divPost";

                    divPost.appendChild(pEmail);
                    divPost.appendChild(pAneddoto);
                    divPost.appendChild(pImage);
                    divPost.appendChild(miPiace);

                    div.appendChild(divPost);
                }

                });

  
    }

    function findId(preferiti,id){
        for(let i=0;i<preferiti.length;i++){
            if(preferiti[i]==id)
                return true;
        }

        return false;
    }

    function addLike(risposta,indice){

        console.log("Ciao aggiungo ai like ");
        var preferiti=userResponse.preferiti;
                
        console.log( document.getElementById("miPiace"+indice).value);
        console.log(indice);
        
        if(document.getElementById("miPiace"+indice).value=="false" || !document.getElementById("miPiace"+indice).value){

        preferiti.push(risposta[indice].id);

        preferiti=Array.from(new Set(preferiti));

        console.log("Preferiti aggiunta like");
        console.log( preferiti);


        }
        else{
            console.log("Risposta ");
            console.log(userResponse.preferiti);

            console.log("Risposta indice");
            console.log(risposta[indice].id);

            var idRemove=risposta[indice].id;

            for(let i=0;i<preferiti.length;i++){
                if(preferiti[i]==idRemove)
                    preferiti.splice(i,1);
            }


        }

        
        var settings = {
                "url": "http://localhost:3000/utenti/"+document.cookie,
                "method": "PUT",
                "timeout": 0,
                "headers": {
                "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                "email": userResponse.email,
                "id": userResponse.id,
                "nome":userResponse.nome,
                "cognome":userResponse.cognome,
                "punteggio":userResponse.punteggio,
                "password":userResponse.password,
                "preferiti":preferiti
                }),
            };

                $.ajax(settings).done(function (response) {

                infoResponse=response;
                console.log(infoResponse);
                //console.log(infoResponse[0].email);

                window.location.reload();
                });


    }

    var email;
    var userResponse;

    function getEmail(){
        if(document.cookie && document.cookie!="undefined" && document.cookie!="admin"){
    console.log("Il cookie da questa pagina "+document.cookie);

    var settings = {
                "url": "http://localhost:3000/utenti/"+document.cookie,
                "method": "GET",
                "timeout": 0,
                };

                $.ajax(settings).done(function (response) {

                infoResponse=response;
                console.log(infoResponse.email);
                //console.log(infoResponse[0].email);
                document.getElementById("email").innerHTML+=infoResponse.email;
                email=infoResponse.email;
                userResponse=infoResponse;

                console.log(userResponse);

                infoBacheca();
  
                bachecaPartner();
            
                bachecaAiutatemi();
                });

            }

            if(document.cookie=="admin"){
            infoBacheca();
            bachecaPartner();
            bachecaAiutatemi();
        }
        }

    function sendPost(){


    var aneddoto= document.getElementById("addAneddoto").value;
    var immagine= document.getElementById("addUri").value;

    if(document.cookie && document.cookie!="undefined"){
    console.log("Il cookie da questa pagina "+document.cookie);

    var settings = {
                "url": "http://localhost:3000/utenti/"+document.cookie,
                "method": "GET",
                "timeout": 0,
                };

                $.ajax(settings).done(function (response) {

                infoResponse=response;
                console.log(infoResponse.email);
                //console.log(infoResponse[0].email);
                document.getElementById("email").innerHTML+=infoResponse.email;
                email=infoResponse.email;
                //console.log(infoResponse[0].email);

                var aggiuntaPost= {
                "url": "http://localhost:3000/bacheca/",
                "method": "POST",
                "timeout": 0,
                "headers": {
                "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                "email": email,
                "aneddoto": aneddoto,
                "immagine": immagine,
                "id":""
                }),
            };         

                $.ajax(aggiuntaPost).done(function (response) {

                infoResponse=response;
                console.log(infoResponse);
                window.location.reload();
                        }) 
                }) 
       
            }
        else{
            window.alert("Non sei loggato");
        }    

    }

    function messageTo(indice){

    console.log(document.cookie);
    console.log(infoResponse[indice].email);

    if(!document.cookie || document.cookie=="null")
        window.alert("Non sei loggato non puoi inviare messaggi");
    else{    
    var messaggio=document.getElementById("textForMessageTo"+indice).value;

    if(!messaggio)
        window.alert("Non hai inserito nulla");
    else{
    var settings = {
            "url": "http://localhost:3000/utenti/"+document.cookie,
            "method": "GET",
            "timeout": 0,
            };

            $.ajax(settings).done(function (response) {

            console.log(response);

            if(response.email==infoResponse[indice].email)
            {
                window.alert("Stai mandando un messaggio a te stesso");
            }
            else {
                var settings = {
                "url": "http://localhost:3000/messaggio/",
                "method": "POST",
                "timeout": 0,
                "headers": {
                "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                "mittente": response.email,
                "messaggio": messaggio,
                "destinatario":infoResponse[indice].email,
                "id": "",
                }),
            };
        
        $.ajax(settings).done(function (response) {
            console.log(response);
            window.alert("Messaggio a "+infoResponse[indice].email+" inviato");
            document.getElementById("textForMessageTo"+indice).value="";
        });
    }
            });

        }
    }
    }

    function bachecaAiutatemi(){

    var settings = {
                "url": "http://localhost:3000/bachecaAiuto/",
                "method": "GET",
                "timeout": 0,
                };

                $.ajax(settings).done(function (response) {

                infoResponse=response;
               // console.log(infoResponse);
               // console.log(infoResponse[0]);

                var div=document.getElementById("aiutatemi");

                for(let i=0;i<infoResponse.length;i++){
                    var nome=infoResponse[i].email;
                    var aiuto=infoResponse[i].aiuto;
                    var titolo=infoResponse[i].titolo;

                    var divPost= document.createElement("div");
                    divPost.id="divHelpPost";

                    divPost.classList.add("border");
                    divPost.classList.add("border-primary");
                    divPost.classList.add("form-group");

                    var pEmail=document.createElement("p");
                    var pAiuto=document.createElement("p");
                    var pTitolo=document.createElement("p");
                    var divIntermezzo=document.createElement("div");
                    var inviaMessaggio=document.createElement("input");
                    var testoMessaggio=document.createElement("input");

                    divIntermezzo.appendChild(testoMessaggio);
                    divIntermezzo.appendChild(inviaMessaggio);
                    divIntermezzo.classList.add("divTesto");

                    pEmail.id="pId";
                    testoMessaggio.classList.add("form-control");
                    inviaMessaggio.classList.add("btn");
                    inviaMessaggio.classList.add("btn-dark");

                    pEmail.innerHTML=nome;
                    pAiuto.innerHTML=aiuto;
                    pTitolo.innerHTML=titolo;
                    pTitolo.id="titleHelp";
                    inviaMessaggio.type="button";
                    inviaMessaggio.value="Scrivimi";
                    inviaMessaggio.addEventListener("click", function(){messageTo(i);}); 
                    testoMessaggio.type="text";
                    testoMessaggio.placeholder="Inserisci testo messaggio";
                    testoMessaggio.id="textForMessageTo"+i;
                    

                    divPost.appendChild(pEmail);
                    divPost.appendChild(pTitolo);
                    divPost.appendChild(pAiuto);
                    divPost.appendChild(divIntermezzo);

                    div.appendChild(divPost);
                }

                });

  
    }

function bachecaPartner(){

    var settings = {
        "url": "http://localhost:3000/bachecaPartner/",
        "method": "GET",
        "timeout": 0,
        };

        $.ajax(settings).done(function (response) {

        infoResponse=response;
      //  console.log(infoResponse);
      //  console.log(infoResponse[0]);

        var div=document.getElementById("partner");

        for(let i=0;i<infoResponse.length;i++){
            var nome=infoResponse[i].email;
            var annuncio=infoResponse[i].annuncio;
            var titolo=infoResponse[i].titolo;

            var divPost= document.createElement("div");
            divPost.id="divHelpPost";

            divPost.classList.add("border");
            divPost.classList.add("border-primary");
            divPost.classList.add("form-group");

            var pEmail=document.createElement("p");
            var pAnnuncio=document.createElement("p");
            var pTitolo=document.createElement("p");
            var divIntermezzo=document.createElement("div");
            var inviaMessaggio=document.createElement("input");
            var testoMessaggio=document.createElement("input");

            divIntermezzo.appendChild(testoMessaggio);
            divIntermezzo.appendChild(inviaMessaggio);
            divIntermezzo.classList.add("divTesto");

            pEmail.id="pId";
            testoMessaggio.classList.add("form-control");
            inviaMessaggio.classList.add("btn");
            inviaMessaggio.classList.add("btn-dark");

            pEmail.innerHTML=nome;
            pAnnuncio.innerHTML=annuncio;
            pTitolo.innerHTML=titolo;
            pTitolo.id="titleHelp";
            inviaMessaggio.type="button";
            inviaMessaggio.value="Scrivimi";
            inviaMessaggio.addEventListener("click", function(){messageTo(i);}); 
            testoMessaggio.type="text";
            testoMessaggio.placeholder="Inserisci testo messaggio";
            testoMessaggio.id="textForMessageTo"+i;
            

            divPost.appendChild(pEmail);
            divPost.appendChild(pTitolo);
            divPost.appendChild(pAnnuncio);
            divPost.appendChild(divIntermezzo);

            div.appendChild(divPost);
        }

        });

    }

    function adminUpdatePost(infoResponse,i){

        console.log(infoResponse);

        var id=infoResponse[i].id;

        var newEmail;
        var newAneddoto;
        var newImmagine;

        if(document.getElementById("inputEmail"+i).value){
            var newEmail=document.getElementById("inputEmail"+i).value;
        }
        if(document.getElementById("inputAneddoto"+i).value){
            var newAneddoto=document.getElementById("inputAneddoto"+i).value;
        }
        if(document.getElementById("inputImmagine"+i).value){
            var newImmagine=document.getElementById("inputImmagine"+i).value;
        }

        console.log(i);

        if(!newEmail)
            newEmail=infoResponse.email;
        if(!newAneddoto)
            newAneddoto=infoResponse.aneddoto;
        if(!newImmagine)
            newImmagine=infoResponse.immagine;

            console.log(i);
            console.log(newEmail);
            console.log(newAneddoto);
            console.log(newImmagine);

            console.log(i);


        var updatePost= {
                "url": "http://localhost:3000/bacheca/"+id,
                "method": "PUT",
                "timeout": 0,
                "headers": {
                "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                "email": newEmail,
                "aneddoto": newAneddoto,
                "immagine": newImmagine,
                }),
        };         

            $.ajax(updatePost).done(function (response) {

                infoResponse=response;
                console.log(infoResponse);
                window.location.reload();
                 });
            

        
        }

        function eliminaPost(infoResponse,i){

            var settings = {
            "url": "http://localhost:3000/bacheca/"+infoResponse[i].id,
            "method": "DELETE",
            "timeout": 0,
            "headers": {
            "Content-Type": "application/json"
            }
            };

            $.ajax(settings).done(function (response) {
            console.log(response);
          
            window.alert("Post eliminato");
            window.location.reload();
        });



        }