var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/"
var listid = undefined //5d931300ac8b120017a74aa6
var apikey = undefined; //35fb74ae2734069fc8f7bc15d729c250
var copyText = "";
const locurl = window.location.href + "?";

splitCurrentURL();
GetListHeader();
GetItems();


$(document).ready(function () {
    if (apikey === undefined) {
        if (listid === undefined) {
            $('.listcontent').hide()
            $('.nolistidnoapikey').show()
        }
    } else {
        $('.listcontent').show()
        $('.nolistidnoapikey').hide()
    }
});


function copyfromkebord(elem) {

    navigator.clipboard.readText()
        .then(koptext => {
            console.log('Kopierter text: ', koptext);
            var text = koptext;
            if (elem.id == "nolistidnoapikey_listid_input_btn") {
                document.getElementById("nolistidnoapikey_listid_input").value = text;
            } else {
                console.log(elem.id)
                if (elem.id == "nolistidnoapikey_apikey_input_btn") {
                    console.log("penis2")
                    document.getElementById("nolistidnoapikey_apikey_input").value = text;
                }
            }
        })
        .catch(err => {
            alert("Der Inhalt der Zwischenablage konnte nicht gelesen werden", err)
        });
}

function nolistidnoapikey_btn() {
    if (document.getElementById("nolistidnoapikey_apikey_input").value == "" && document.getElementById("nolistidnoapikey_listid_input").value == "") {
        alert("Bitte API-Key oder ListID eingeben")
    } else {
        if (document.getElementById("nolistidnoapikey_listid_input").value !== "") {
            listid = document.getElementById("nolistidnoapikey_listid_input").value
        }
        if (document.getElementById("nolistidnoapikey_apikey_input").value !== "") {
            apikey = document.getElementById("nolistidnoapikey_apikey_input").value
        }
        window.document.location.replace(locurl + "key=" + apikey + "&id=" + listid);
    }

}




// Copy to Clipboard 
function alter_api_key_input() {
    copyText = document.getElementById("alter_api_key_input");
    copytoclipboard();
}

function neuer_api_key_input() {
    copyText = document.getElementById("neuer_api_key_input");
    copytoclipboard();
}

function copytoclipboard() {
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
}

function neue_liste_hinzufügen() {
    if (document.getElementById("listemitIDhinzufügen").value == "") {
        document.getElementById("listemitIDhinzufügen").placeholder = "Bitte ListenID eingeben";
    } else {
        listid = document.getElementById("listemitIDhinzufügen").value;
        let hilfsvar = locurl.split("?")[0];
        window.document.location.replace(hilfsvar + "?" + "key=" + apikey + "&id=" + listid);
    }
    splitCurrentURL();
}

// API Key wechseln
function showoldapikey() {
    document.getElementById("alter_api_key_input").placeholder = apikey;
}
function changeapikey() {
    if (document.getElementById("neuer_api_key_input").value == "") {
        document.getElementById("neuer_api_key_input").placeholder = "Bitte API-Key eingeben";
    } else {
        apikey = document.getElementById("neuer_api_key_input").value;
        let hilfsvar = locurl.split("?")[0];
        window.document.location.replace(hilfsvar + "?" + "key=" + apikey + "&id=" + listid);
        document.getElementById("alter_api_key_input").placeholder = apikey;
    }
    splitCurrentURL();
}

function splitCurrentURL() {
    let spliturl = locurl.split("?")[1]; // this=true&that=good;
    params = {};
    spliturl = spliturl.split("&"); // ['this=true','that=good']
    for (var i = 0; i < spliturl.length; i++) {

        var split_cache = spliturl[i].split("="); // ['this','true'], ...
        params[split_cache[0]] = split_cache[1]; // {this:true}, ...

    }
    console.log(params.id)
    console.log(params.key)
    apikey = params.key;
    listid = params.id;
    return params;
}

/*-----------------------------
     Neue Liste erstellen
------------------------------*/

function POSTList() {

    var data = JSON.stringify({
        "name": document.getElementById("listehinzufügen").value
    });


    textarea.value = '';
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("Authorization", apikey)

    refreshPage(xhr) //Aktualisierung der Liste durch Aufruf der GetItems-Funktion nach "Posten"
    xhr.send(data);
}
/*-----------------------------
     API Requests
------------------------------*/

function POSTItem() {
    var data = JSON.stringify({
        "name": document.getElementById("textarea").value
    });
    textarea.value = '';
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url + listid + "/items");
    xhr.setRequestHeader("content-type", "application/json");

    refreshPage(xhr) //Aktualisierung der Liste durch Aufruf der GetItems-Funktion nach "Posten"
    xhr.send(data);
}

/* ---------------------------------------------------
    GET LIST HEADER //Hier wird der Listenname abgerufen
----------------------------------------------------- */

function GetListHeader() {

    var data = JSON.stringify(false);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var listHeader = JSON.parse(this.responseText);
            var listOfLists = ""
            console.log(listHeader)

            for (i = 0; i < Object.keys(listHeader).length; i++) {
                listOfLists += '<li class="ListofLists_class"><span class="ListeLöschen"><button class="btn btn-outline-secondary" id="' + listHeader[i]._id + '" onclick="deleteList(this.id)"><i class="fas fa-minus"></i></button></span><span id="' + listHeader[i]._id + '" onclick="changeURLID(this.id)"><a>' + listHeader[i].name + ' <span class="badge badge-primary badge-pill" id="quantity">' + listHeader[i].items.length + '</span></span></a></li>'
                document.getElementById('listOfLists').innerHTML = listOfLists;
            }
        }

    });

    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", apikey)
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(data);

}

/* ---------------------------------------------------
   Ändere die ID in der URL
----------------------------------------------------- */

function changeURLID(listidChanger) {
    console.log("listidChanger")
    let hilfsvar = locurl.split("?")[0];
    window.document.location.replace(hilfsvar + "?" + "key=" + apikey + "&id=" + listidChanger);

}
/* ---------------------------------------------------
    GET ITEM //Hole alle Items aus der aktuellen Liste
----------------------------------------------------- */
function GetItems() {
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var einkaufsliste = JSON.parse(this.responseText)
            listUnbought = ""       //Liste für Items mit dem Status "bought = false"
            listBought = ""         //Liste für Items mit dem Status "bought = true"
            for (i = 0; i < Object.keys(einkaufsliste.items).length; i++) {
                if (einkaufsliste.items[i].bought === false) {
                    listUnbought += ' <li class="list-group-item">' + einkaufsliste.items[i].name + '<span class="btn_items"> <span id="items_bought"> <button class="btn btn-outline-secondary" id="' + einkaufsliste.items[i]._id + '"onclick="update1(this.id)"> <i class="fas fa-shopping-basket"></i></button> </span> <span id="items_delite"><button class="btn btn-outline-secondary" id="' + einkaufsliste.items[i]._id + '"onclick="deleteItem(this.id)"> <i class="fas fa-trash-alt"></i></button> </span></span> </li>';
                    // document.getElementsByTagName("button").id = "newid";
                }
                else {
                    listBought += ' <li class="list-group-item">' + einkaufsliste.items[i].name + '<span class="btn_items"> <span id="items_bought"> <button class="btn btn-outline-secondary" id="' + einkaufsliste.items[i]._id + '"onclick="update2(this.id)"> <i class="fas fa-arrow-up"></i> </button> </span> <span id="items_delite"><button class="btn btn-outline-secondary" id="' + einkaufsliste.items[i]._id + '"onclick="deleteItem(this.id)"> <i class="fas fa-trash-alt"></i> </button> </span></span> </li>';

                }

            }
        }
        document.getElementById('itemsUnbought').innerHTML = listUnbought;
        document.getElementById('itemsBought').innerHTML = listBought;

        document.getElementById('quantity').innerHTML = Object.keys(einkaufsliste.items).length;
    });
    xhr.open("GET", url + listid);
    xhr.send(data);
}

/* ---------------------------------------------------
    DELETE LIST
----------------------------------------------------- */

function deleteList(deleteListId) {
    var xhr = new XMLHttpRequest();
    
    xhr.open("DELETE", url + deleteListId);
    xhr.setRequestHeader("Authorization", apikey)
    refreshPage(xhr) //Aktualisierung der Liste durch Aufruf der GetItems-Funktion nach "Löschen"
    xhr.send(null);
}

/* ---------------------------------------------------
DELETE ITEM
----------------------------------------------------- */

function deleteItem(clicked_id) {
    
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url + listid + "/items/" + clicked_id);
    refreshPage(xhr) //Aktualisierung der Liste durch Aufruf der GetItems-Funktion nach "Löschen"
    xhr.send(null);
}

/* ---------------------------------------------------
    Druck
----------------------------------------------------- */
function drucken() {
    window.print();
}

/* ---------------------------------------------------
    UPDATE ITEM //unbought -> bought
----------------------------------------------------- */

function update1(clicked_id) {

    var data = JSON.stringify({
        "bought": true
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    xhr.open("PUT", url + listid + "/items/" + clicked_id);
    xhr.setRequestHeader("content-type", "application/json");
    refreshPage(xhr) //Aktualisierung der Liste durch Aufruf der GetItems-Funktion nach "Update"

    xhr.send(data);
}

/* ---------------------------------------------------
    UPDATE ITEM //bought -> unbought
----------------------------------------------------- */

function update2(clicked_id) {

    var data = JSON.stringify({
        "bought": false
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    xhr.open("PUT", url + listid + "/items/" + clicked_id);
    xhr.setRequestHeader("content-type", "application/json");
    refreshPage(xhr) //Aktualisierung der Liste durch Aufruf der GetItems-Funktion nach "Update"

    xhr.send(data);
}

/* ---------------------------------------------------
    VERMEIDUNG VON REDUNDANZ //siehe Post, Delete, Update, etc.
----------------------------------------------------- */

function refreshPage(xhrÜbergeben) {
    xhrÜbergeben.onload = function () {
        if (xhrÜbergeben.readyState === xhrÜbergeben.DONE) {
            if (xhrÜbergeben.status === 200) {
                GetItems(); //Funktionsaufruf für die Itemliste
                GetListHeader(); //Hier werden die Listen geladen
            }
        }
    };
}

/*-----------------------------
     Print
------------------------------*/

function drucken() {
    window.print();
}

/*-----------------------------
     Spracheingabe
------------------------------*/


var behindert = false;
var error = " ";
var noteContent = '';
var recognizing = false;
var start_timestamp;

function bistdubehindert() {
    if (behindert) {
        behindert = false;
    } else {
        behindert = true
    }
}

try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
} catch (e) {
    console.error(e);
    $('.spracheingabe').hide();
    alert("Die Spracheingabe wird bei deinem Browser nicht unterstützt");
}

recognition.continuous = true;
recognition.onresult = function () {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    console.log("onresult")
    console.log(transcript);
    document.getElementById("textarea").value = transcript;
};

recognition.onstart = function () {
    error = "Voice recognition activated.";
    start_img.src = '../img/mic-animate.gif';
    recognizing = true;
    if (behindert) {
        readOutLoud(error);
    } else {
        document.getElementById("textarea").placeholder = error;
    }
    console.log("onstart")
}

recognition.onspeechend = function () {
    error = ('Voice recognition turned off.');
    recognizing = false;
    if (behindert) {
        readOutLoud(error);
    } else {
        document.getElementById("textarea").placeholder = error;
    }
    console.log("onspeechend")
}

recognition.onend = function () {
    recognizing = false;
    start_img.src = '../img/mic.gif';
    console.log("onend")
}

//Errorhandeling

recognition.onerror = function (event) {
    start_img.src = '../img/mic.gif';
    if (event.error == 'no-speech') {
        reminder = 'Es wurde keine Sprache registriert.';
        if (behindert) {
            readOutLoud(error);
        } else {
            document.getElementById("textarea").placeholder = reminder;
        }
    };

    if (event.error == 'audio-capture') {
        error = 'Es wurde kein Mikrofon gefunden.';
        $('.spracheingabe').hide();
        if (behindert) {
            readOutLoud(error);
        } else {
            alert(error);
        }
    };

    if (event.error == 'not-allowed') {
        error = 'Die Zugriffsberechtigung auf das Mikrofon wurde nicht erteilt.';
        $('.spracheingabe').hide();
        if (behindert) {
            readOutLoud(error);
        } else {
            alert(error);
        }
    };
}

/*  Button */

function startButton(event) {
    if (recognizing) {
        recognition.stop();
        return;
    }
    recognition.start();
    start_timestamp = event.timeStamp;
    start_img.src = '../img/mic-slash.gif';
}

/* Text to Speech */

function readOutLoud(error) {
    var speech = new SpeechSynthesisUtterance();
    speech.text = error;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

/*-----------------------------
     ShareAPI
------------------------------*/

function share() {
    console.log(encodeURIComponent(locurl))
    qrcode_img.src = "http://api.qrserver.com/v1/create-qr-code/?data=" + encodeURIComponent(locurl) + "&amp;size=100x100";
}