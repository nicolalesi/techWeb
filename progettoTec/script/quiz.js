var animalsInfo;

function getInfo(){
    
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/animals?name=b',
        headers: { 'X-Api-Key': '6cuPFxMPEbTL/peOvztdzA==QKgsunYVjTstv41x'},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
            //var random=Math.floor(Math.random() * result.length);
            //console.log(result[0].locations[0]);
            animalsInfo=result;
            getCities();
            //disegnaAnimale(result[random]);
            //disegnaAnimale();
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
});

}
getInfo();

function getCities(){
    var random=Math.floor(Math.random() * animalsInfo.length);
    var country=animalsInfo[random].locations[0];
    var infoJSON;
    disegnaAnimale(random);

    let request=new XMLHttpRequest();
    request.open("GET","https://restcountries.com/v3.1/all");
    request.send();
    
    request.onload=()=>{
        if(request.status==200){
            infoJSON=JSON.parse(request.response);
            console.log(infoJSON);
            writeCity(infoJSON,country);
        }else
        {
            console.log("errore");
        }
    }
}

var solutions;
var randomPlace;
function writeCity(infoJSON,country){

    randomPlace=["first","second","third"];
    var randomPosition=Math.floor(Math.random()*3);
    solutions=["false","false","false"];
    console.log(randomPosition);
    console.log(country);

    var pTrue=document.getElementById(randomPlace[randomPosition]);
    pTrue.innerHTML=country;
    pTrue.value="true";
    solutions[randomPosition]="true";

    for(let i=0;i<randomPlace.length;i++){
        if(i!=randomPosition){
            var randomCountries=Math.floor(Math.random() * 250);
            var pFalse=document.getElementById(randomPlace[i]);
            pFalse.innerHTML=infoJSON[randomCountries].name.common;
            pFalse.value="false";
        }
    }
}

function disegnaAnimale(random){

    //console.log(infoJSON.name);

    var p=document.getElementById("informazioni");
    p.innerHTML=" <b> Nome : </b> "+animalsInfo[random].name;

   // var img=document.getElementById("imgAnimale");
   // img.setAttribute("src",infoJSON.image_link);

}

function refresh(){
    getCities();
    for(let i=0;i<solutions.length;i++){
            document.getElementById(randomPlace[i]).style.backgroundColor="lightgrey";
    }
}

//dovrebbe averne una ciascun utente
var punteggio;
function quizResults(id){
    
    if(document.cookie && document.getElementById(id).value=="true" ){

            var settings = {
            "url": "http://localhost:3000/utenti/"+document.cookie,
            "method": "GET",
            "timeout": 0,
            };

            $.ajax(settings).done(function (response) {

            infoResponse=response;
            console.log(infoResponse);
            console.log(infoResponse.punteggio+ "Punteggio");

            punteggio=infoResponse.punteggio+1;


            console.log("Aggiorno il punteggio di "+document.cookie);
            var settings = {
            "url": "http://localhost:3000/utenti/"+document.cookie,
            "method": "PUT",
            "timeout": 0,
            "headers": {
            "Content-Type": "application/json"
            },
            "data": JSON.stringify({
            "email": infoResponse.email,
            "password": infoResponse.password,
            "nome": infoResponse.nome,
            "cognome":infoResponse.cognome,
            "punteggio":punteggio,
            "preferiti":infoResponse.preferiti
            }),

            
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        window.location.reload();
    });

            });

    }

    console.log("random Place"+randomPlace);
    for(let i=0;i<solutions.length;i++){
        if(solutions[i]=="true"){
            document.getElementById(randomPlace[i]).style.backgroundColor="#90EE90";
        }
        else
            document.getElementById(randomPlace[i]).style.backgroundColor="#FF6347";
    }
}

var settings = {
    "url": "http://localhost:3000/utenti/",
    "method": "GET",
    "timeout": 0,
    };

    $.ajax(settings).done(function (response) {

    infoResponse=response;
    console.log(infoResponse);

    var div=document.getElementById("leaderBoard");
    var divPunteggio= document.createElement("table");
    divPunteggio.classList.add("table");
    divPunteggio.classList.add("table-primary");

    var primaRiga=document.createElement("tr");
    var email=document.createElement("th");
    var punteggio=document.createElement("th");

    email.innerHTML="Email ";
    punteggio.innerHTML="Punteggio ";

    primaRiga.appendChild(email);
    primaRiga.appendChild(punteggio);
    divPunteggio.appendChild(primaRiga);


    for(let i=0;i<infoResponse.length;i++){
        var email=infoResponse[i].email;
        var punteggio=infoResponse[i].punteggio;
        var arrayUtenti=[];

        if(punteggio!=undefined){
            var riga=document.createElement("tr");
            
            var pEmail=document.createElement("td");
            var pPunteggio=document.createElement("td");

            pEmail.innerHTML=email;
            pPunteggio.innerHTML=punteggio;

            riga.appendChild(pEmail);
            riga.appendChild(pPunteggio);

            divPunteggio.appendChild(riga);

            div.appendChild(divPunteggio);
        }
    }

    console.log(arrayUtenti);

    });