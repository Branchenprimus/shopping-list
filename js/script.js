var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/"
var listid = "5d931300ac8b120017a74aa6"


GetListHeader();
GetItems();

/* Mit Enter bestätigen */
addEventListener("keydown", function (e) {
    if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
        POST();
    }
});

/*-----------------------------
     API Requests
------------------------------*/

/*Post*/
function POST() {
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
                    listUnbought += ' <li class="list-group-item">' + einkaufsliste.items[i].name + '<span id="btn_items"> <span id="items_bought"> <button class="btn btn-outline-secondary" id="' + einkaufsliste.items[i]._id + '"onclick="update(this.id)"> <i class="fas fa-check"></i></button> </span> <span id="items_delite"><button class="btn btn-outline-secondary" id="' + einkaufsliste.items[i]._id + '"onclick="deleteItem(this.id)"> <i class="fas fa-trash-alt"></i></button> </span></span> </li>';
                    // document.getElementsByTagName("button").id = "newid";
                }
                else {
                    listBought += ' <li class="list-group-item">' + einkaufsliste.items[i].name +  '<span id="btn_items"> <span id="items_bought"> <button class="btn btn-outline-secondary" id="' + einkaufsliste.items[i]._id + '"onclick="update(this.id)"> <i class="fas fa-check"></i> </button> </span> <span id="items_delite"><button class="btn btn-outline-secondary" id="' + einkaufsliste.items[i]._id + '"onclick="deleteItem(this.id)"> <i class="fas fa-trash-alt"></i> </button> </span></span> </li>';

                }

            }
        }
        console.log(listUnbought)
        document.getElementById('itemsUnbought').innerHTML = listUnbought;
        document.getElementById('itemsBought').innerHTML = listBought;

        document.getElementById('quantity').innerHTML = Object.keys(einkaufsliste.items).length;
    });
    xhr.open("GET", url + listid);
    xhr.send(data);
}


/* ---------------------------------------------------
    GET LIST HEADER //Hier wird der Listenname abgerufen. Hier muss noch die funktion, alle Listen anzuzeigen implementiert werden
----------------------------------------------------- */

function GetListHeader() {

    var data = JSON.stringify(false);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var listHeader = JSON.parse(this.responseText)


            document.getElementById("listname").innerHTML = listHeader.name
        }
    });

    xhr.open("GET", url + listid);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(data);

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
function drucken() {
    window.print();
}

/* ---------------------------------------------------
    UPDATE ITEM
----------------------------------------------------- */

function update(clicked_id) {

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
    VERMEIDUNG VON REDUNDANZ //siehe Post, Delete, Update, etc.
----------------------------------------------------- */

function refreshPage(xhrÜbergeben) {
    xhrÜbergeben.onload = function () {
        if (xhrÜbergeben.readyState === xhrÜbergeben.DONE) {
            if (xhrÜbergeben.status === 200) {
                GetItems(); //Funktionsaufruf für die Itemliste
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
    console.log( transcript);
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
//Funktioniert nur über Htpps
function shareapi() {
    navigator.share({
        title: document.title,
        text: 'Hier eine Liste für dich!',
        url: 'url + listid',
      })
}