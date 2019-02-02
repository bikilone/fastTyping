//ucenje brzog kucanja:
//1. korisniku se na stranici prikaze paragraf sa generickim tekstom koji korisnik treba da otkuca u sto kracem vremenu.
//2. kada korisnik otkuca rec oznaci mu se u tekstu nova rec za kucanje(npr: zutom bojom), kada zavrsi prelazi na sledecu rec i tako do kraja.
//3. za korisnika se belezi prosecan broj tacno otkucanih slova u minuti kao i procenat tacnosti i ukupno vreme potroseno na tekst u kucanju. karaktere koje je pogresio obeleziti (npr. crvenom bojom).
//4. procente, tacnost i broj tacno otkucanih karaktera cuvati u local storage i omoguciti da se (graficki po izboru) prikazuje napredak kroz odredjeni period (kroz broj testova kucanja).
//www.chartjs.org
var nizPokusaja = [];
var lorem = "It is a long established";
var slova = lorem.split("");
console.log(slova);
for (var i = 0; i < slova.length; i++) {
  // "a" => "<span>a</span>"
  slova[i] = "<span>" + slova[i] + "</span>";
}
slova = slova.join("");
console.log(slova);

var pasus = document.createElement("p");
pasus.setAttribute("id", "pas");
document.body.appendChild(pasus);
pasus.innerHTML = slova;

var inp = document.createElement("textarea");
inp.setAttribute("id", "unos");
document.body.appendChild(inp);

inp.addEventListener("input", tragac);

var start;
var end;
var time;
var counter = 0;

function tragac(event) {
  var value = event.target.value;
  var duzina = value.length;

  if (duzina != lorem.length) {
    /// changing yellow background except the last one
    pasus.children[duzina].style.backgroundColor = "yellow";
  }
  if (duzina !== 0) {
    // changing white background except the first time
    pasus.children[duzina - 1].style.backgroundColor = "white";
  }
  if (value[duzina - 1] == lorem[duzina - 1] && duzina !== 0) {
    // cheking if it is right one
    pasus.children[duzina - 1].style.color = "lightseagreen";
    counter++;
  } else if (duzina !== 0) {
    // if you type wrong letter
    pasus.children[duzina - 1].style.color = "red";
  }
  if (duzina == 1) {
    start = Date.now(); // kod prvog karaktera
  }
  if (duzina == lorem.length) {
    end = Date.now(); // kod zadnjeg karaktera
    time = (end - start) / 1000;
    time = time.toFixed(2);
    var minuti = time / 60;
    var prosek = Math.floor(counter / minuti);
    var tacnost = (counter / duzina) * 100;
    tacnost = tacnost.toFixed(2) + "%";
    inp.setAttribute("disabled", "disabled");
    var podaci = new Data(prosek, tacnost, time);

    // proveravamo da li u localStoragu imamo niz
    if (localStorage.getItem("nizPokusaja")) {
      nizPokusaja = localStorage.getItem("nizPokusaja");
      nizPokusaja = JSON.parse(nizPokusaja);
      nizPokusaja.push(podaci);
      nizPokusajaJSON = JSON.stringify(nizPokusaja);
      localStorage.setItem("nizPokusaja", nizPokusajaJSON);
    } else {
      nizPokusaja.push(podaci);
      nizPokusajaJSON = JSON.stringify(nizPokusaja);
      localStorage.setItem("nizPokusaja", nizPokusajaJSON);
    }
  }
}

/* 
        varijabla/objekat/niz sta god, to pretvorimo u string i ubacimo u local storage
        */

// konstruktor funkciju

function Data(prosekPoMinutu, tacnost, vreme) {
  this.prosekPoMinutu = prosekPoMinutu;
  this.tacnost = tacnost;
  this.vreme = vreme;
}

var reset = document.getElementById("restart");
reset.addEventListener("click", brisanje);

function brisanje() {
  inp.removeAttribute("disabled");
  inp.value = "";
  counter = 0;
  var spans = document.getElementsByTagName("span");
  for (var i = 0; i < spans.length; i++) {
    spans[i].style.color = "black";
    spans[i].style.backgroundColor = "white";
    if (i === 0) {
      spans[i].style.backgroundColor = "yellow";
    }
  }
}

/*
        izvuci value i uporediti ga sa lorem
        for petlja
        if lorem[i]=e.target.value
        */
// event listener na inputu
// onChange
// uporedjivanje input.value i lorem
// ako je tacno onda karakter u pasusu postaje zelen, ako nije posaje crven

// split chek
// zelimo da obrglimo svako slovo sa spanom

// neki objekat koji ima sl propertije
//3. za korisnika se belezi prosecan broj tacno otkucanih slova u minuti kao i procenat tacnosti i ukupno vreme potroseno na tekst u kucanju.
// trcim 10 metara za 0,5 minuta, kako to da prevedem u 20 metara po 1 minutu

console.log(lorem2);
