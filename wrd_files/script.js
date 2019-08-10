$(document).ready(function() {
    $("#IzbornikDugme").click(function() {
        $("#Izbornik").toggle();
    })

    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var check = false;
            return this.optional(element) || regexp.test(value);
        },
        "Please check your input."
    );


    $("#forma").validate({
        rules: {
            dostavaIme: {
                required: true,
                regex: /[A-Za-z]{5,}/
            },
            dostavaAdresa: {
                required: true,
                regex: /[A-Za-z]{5,}/
            },
            dostavaPostanskiBroj: {
                required: true,
                regex: /[0-9]{5}/
            },
            dostavaTelefon: {
                required: true,
                regex: /[+][0-9]{3}[-][0-9]{2}[-][0-9]{3}[-][0-9]{4}/
            }
        }
    });
});

function spasiPodatke() {
    var mojUrl = 'http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj';

    var zahtjev = new XMLHttpRequest();

    var z = new Object();

    z.dostavaAdresa = document.getElementById("dostavaAdresa").value;
    z.dostavaIme = document.getElementById("dostavaIme").value;
    z.dostavaPostanskiBroj = document.getElementById("dostavaPostanskiBroj").value;
    z.dostavaTelefon = document.getElementById("dostavaTelefon").value;
    z.napomena = document.getElementById("napomena").value;

    var str = JSON.stringify(z);

    zahtjev.onload = function() {
        if (zahtjev.status === 200) {
            prikaziPodatke();
        } else {
            alert("Server javlja grešku: " + zahtjev.statusText);
        }
    }

    zahtjev.onerror = function() {
        alert("Greška u komunikaciji sa serverom.");
    };

    zahtjev.open("POST", mojUrl, true);
    zahtjev.setRequestHeader("Content-Type", "application/json");
    zahtjev.send(str);
    alert("Uspjesno spaseno");

};
var n;

function prikaziPodatke() {
    var url = 'http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll';

    var zahtjev = new XMLHttpRequest();

    zahtjev.onload = function() {
        if (zahtjev.status === 200) {
            var x = zahtjev.responseText;
            n = JSON.parse(x);
            dodajRed();
            // document.getElementById("rezultatDiv").innerHTML = zahtjev.responseText;
        } else {
            alert("Server javlja grešku: " + zahtjev.statusText);
        }
    };
    zahtjev.onerror = function() {
        alert("Greška u komunikaciji sa serverom.");
    };
    zahtjev.open("GET", url, true);
    zahtjev.send(null);
}
var brojac = 1;

function dodajRed() {
    for (var i = 0; i < n.length; i++) {
        var r = n[i];

        var tabela = document.getElementById("tabelaID");

        var tr = document.createElement("tr");
        tabela.appendChild(tr);

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");
        var td7 = document.createElement("td");

        td1.innerHTML = brojac;
        td2.innerHTML = new Date().toString();
        td3.innerHTML = r.dostavaIme;
        td4.innerHTML = r.dostavaAdresa;
        td5.innerHTML = r.dostavaPostanskiBroj;
        td6.innerHTML = r.dostavaTelefon;
        td7.innerHTML = r.napomena;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        brojac++;
    }
}
