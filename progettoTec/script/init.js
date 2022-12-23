function rand (min, max) {
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    } else if (argc === 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  words = new Array (
      "Cane",
      "Gatto",
      "Foca",
      "Armadillo",
      "Serpente",
      "Balena",
      "Ornitorinco",
      "Fenicottero",
      "Pavone",
      "Ippopotamo",
      "Gorilla",
      "Pinguino",
      "Coccodrillo",
      "Piccione",
      "Elefante",
      "Leone",
      "Pipistrello",
      "Talpa",
      "Pantera",
      "Lupo"
    );
  
  var x = rand (0, words.length -1);
  
  word = words [x];
  window.setTimeout ("init()", 100);