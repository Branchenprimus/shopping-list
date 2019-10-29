var url = "https://shopping-lists-api.herokuapp.com/api/v1/lists/"
var listid = "5d931300ac8b120017a74aa6"


GetListHeader();
GetItems();

/* Mit Enter bestätigen */
addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        POST();
    }
});

/* ---------------------------------------------------
    POST A NEW ITEM
----------------------------------------------------- */
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
                    listUnbought += ' <li class="list-group-item">' + einkaufsliste.items[i].name + '<span id="btn_items"> <span id="items_bought"> <button class="btn btn-outline-secondary" id="' + einkaufsliste.items[i]._id + '"onclick="update(this.id)">  </button> </span> <span id="items_delite"><button class="btn btn-outline-secondary" id="' + einkaufsliste.items[i]._id + '"onclick="deleteItem(this.id)">  </button> </span></span> </li>';
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
