function registerForm(){
    document.getElementById("register").style.display="block";
    document.getElementById("formIscrizione").style.display="none";
}

function loginForm(){
    document.getElementById("register").style.display="none";
    document.getElementById("formIscrizione").style.display="block";   
}

function logged(){
  var nomeUtente;
  var password;

  var infoResponse=null;

  nomeUtente=document.getElementById("emailLogin").value;
  password=document.getElementById("passwordLogin").value;
  console.log(nomeUtente);
  console.log(password);

  if(nomeUtente=="admin" && password=="admin"){
    console.log("Sei un amministratore");
    document.cookie="admin";
    window.alert("Sei un amministratore avrai accesso a funzionalità extra");
    window.location.href="Home.html";
  }
  else {
  var settings = {
  "url": "http://localhost:3000/utenti?email="+nomeUtente,
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {

  var login=false;
  infoResponse=response;
  console.log(infoResponse);

  if(infoResponse[0]){
    {
      console.log("L'utente esiste");
      if(infoResponse[0].password==password){
        console.log("Puoi accedere");


        document.cookie=infoResponse[0].id;
        console.log("Cookie salvato "+document.cookie);
        window.alert("Hai effettuato correttamente il login");
        document.location.href="AreaPersonale.html";
      }
      else{
        console.log("Password errata ");
        window.alert("Password errata");
      }
    }
  }
  else
  {
    window.alert("L'utente non esiste");
  }

});
}

return false;
}


function registration(){
  var nome;
  var cognome;
  var email;
  var password;

  var flag;

  nome=document.getElementById("nome").value;
  cognome=document.getElementById("cognome").value;
  email=document.getElementById("email").value;
  password=document.getElementById("password").value;

  var settings = {
  "url": "http://localhost:3000/utenti?email="+email,
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {

  infoResponse=response;
  console.log(infoResponse);

  if(infoResponse[0]){
    {
      console.log("L'utente esiste");
      window.alert("Esiste già un utente con questa mail");
      return;
    }
  }
  else
  {
    console.log("Puoi registrarti");
    var settings = {
    "url": "http://localhost:3000/utenti",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "email": email,
      "id": "",
      "password": password,
      "nome":nome,
      "cognome":cognome,
      "punteggio":0,
      "preferiti": []
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    window.alert("Ti sei registrato ora puoi effettuare il login con questo account");
    window.location.replace("login.html");
  });
  }
});

}
