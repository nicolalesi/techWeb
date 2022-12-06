var infoResponse;

function verificaNomeUtente(){  
   var oldPassword=document.getElementById("oldPassword").value;
   if(!oldPassword)
    window.alert("Non hai inserito nulla");
   else {
    console.log(oldPassword);

    var settings = {
      "url": "http://localhost:3000/utenti/"+document.cookie,
      "method": "GET",
      "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        
        infoResponse=response;
        console.log(response);
        console.log(response.password);

        if(response.password==oldPassword){
            document.getElementById("divOldPassword").style.display="none";
            document.getElementById("nuovaPassword").style.display="block";
        }
        else{
            window.alert("Vecchia password errata");
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
                "url": "http://localhost:3000/utenti/"+document.cookie,
                "method": "PUT",
                "timeout": 0,
                "headers": {
                "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                "email": infoResponse.email,
                "password": password,
                "nome": infoResponse.nome,
                "cognome":infoResponse.cognome,
                "punteggio":infoResponse.punteggio,
                "preferiti":infoResponse.preferiti
                }),

            };

            $.ajax(settings).done(function (response) {
            console.log(response);
            window.alert("Password cambiata con successo");
            window.location.href="Home.html";
        });

    }    

}