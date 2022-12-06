var infoResponse;

function verificaNomeUtente(){  
   var nomeUtente=document.getElementById("nomeUtente").value;
   if(!nomeUtente)
    window.alert("Non hai inserito nulla");
   else {
    console.log(nomeUtente);

    var settings = {
      "url": "http://localhost:3000/utenti?email="+nomeUtente,
      "method": "GET",
      "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        
        infoResponse=response;

        if(response[0]){
            console.log(response[0]);
            document.getElementById("divNomeUtente").style.display="none";
            document.getElementById("nuovaPassword").style.display="flex";
        }
        else{
            window.alert("Il nome utente non esiste");
        }
    });
   }
}

function inviaNuovaPassword(){

    console.log(infoResponse);

    var password=document.getElementById("password").value;
    if(!password)
        window.alert("Non hai inserito nulla");
    else {
        var settings = {
                "url": "http://localhost:3000/utenti/"+infoResponse[0].id,
                "method": "PUT",
                "timeout": 0,
                "headers": {
                "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                "email": infoResponse[0].email,
                "password": password,
                "nome": infoResponse[0].nome,
                "cognome":infoResponse[0].cognome,
                "punteggio":infoResponse[0].punteggio,
                "preferiti":infoResponse.preferiti
                }),

            };

            $.ajax(settings).done(function (response) {
            console.log(response);
            window.alert("Password cambiata con successo, accedi con la nuova password");
            window.location.href="login.html";
        });

    }    

}