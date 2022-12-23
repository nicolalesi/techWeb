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
  }
}

function reset() {
    window.location.reload();
}