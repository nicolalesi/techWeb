var word = "";
var vowels = "aeiou", alphabet = "abcdefghijklmnopqrstuvwxyz";
var chosen = "", image = 0, rightChars = 2;
var imageBox, wordBox, keyboardBox;
var a_start = '<a href="#" onclick="check_key(\'', a_mid = '\')">', a_end = '</a>';
var span_start = '<span>', span_end = '</span>';
var span_ok = span_start.replace ('>', ' class="ok">'), span_ko = span_start.replace ('>', ' class="ko">');

function init () {
  word = word.toLowerCase ();
  init_image ();
  init_word ();
  init_keyboard ();
}

function init_image () {
  imageBox = document.getElementById("impiccato");
  imageBox.className = "";
}

function init_word () {
  wordBox = document.getElementById("word");
  for (i = 0; i < word.length; i++) {
        var chr = word.charAt (i);
        var reveal = (i == 0 || i == word.length -1) ? chr : (vowels.indexOf (chr) == -1) ? "&ndash;" : "+";
        wordBox.innerHTML += "<span>" + reveal + "</span>\n";
  }
}

function init_keyboard () {
  keyboardBox = document.getElementById ("keyboard");
  var keyboardContent = "";
  for (i = 0; i < alphabet.length; i++) {
	keyboardContent += a_start + alphabet.charAt (i) + a_mid + alphabet.charAt (i) + a_end + "\n";
  }
  keyboardContent += span_start + '.' + span_end;
  keyboardBox.innerHTML = keyboardContent;
}

function check_key (key) {
  if (confirm ("La tua scelta \u00E8 " + key.toUpperCase () + "?")) {
    if ((num = check_char (key)) > 0) {
        rightChars++;
        alert ("Sono stati trovate " + num + " occorrenze di " + key.toUpperCase () + " !");
        var span_type = 'ok';
    } else {
        alert ("Il carattere scelto non \u00E8 contenuto nella parola misteriosa!");
        impiccato();
        var span_type = 'ko';
    }
    disable_key (key, span_type);
    check_endgame ();
  }
  return false;
}

function check_char (chr) {
  var result = 0;
  for (i = 0; i < word.length; i++) {
    if (i != 0 && i != word.length -1 && chr == word.charAt (i)) {
	reveal_char (i);
	result++;
	chosen += chr;
    }
  }
  return result;
}

function disable_key (key, type) {
  var search = a_start + key + a_mid + key + a_end;
  var replace = window ["span_" + type] + key + span_end;
  keyboardBox.innerHTML = keyboardBox.innerHTML.replace (search, replace);
}

function reveal_char (i) { document.getElementById ("word").getElementsByTagName ("span")[i].innerHTML = word.charAt (i); }

function impiccato () {
  imageBox.className = "x" + image;
  image++;
}

function check_endgame () {
  if (image > 9) {
    alert ("Peccato, hai perso!");
    alert ("La parola misteriosa era:\n\t" + word.toUpperCase ());
    // SOMETHING ON-LOOSE
  } else if (rightChars == word.length) {
    alert ("Yeah, hai vinto!");
    alert ("La parola misteriosa \u00E8:\n\t" + word.toUpperCase ());
    // SOMETHING ON-WIN
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

function reset() {
    window.location.reload();
}