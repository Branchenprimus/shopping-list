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


/*XMLHTTPRequest*/
function POST() {
    var data = JSON.stringify({
        "name": document.getElementById("textarea").value
    });
    textarea.value = '';
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url + listid + "/items");
    //"https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6/items"
    xhr.setRequestHeader("content-type", "application/json");

    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.response);
                GetItems(); //Funktionsaufruf für die Itemliste

            }
        }
    };
    xhr.send(data);
}




/*  GET Einkaufslisten Items */
function GetItems() {
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var einkaufsliste = JSON.parse(this.responseText)
            text = ""
            for (i = 0; i < Object.keys(einkaufsliste.items).length; i++) {
                // text += '<li class="list-group-item">' + einkaufsliste.items[i].name + '<button class="btn btn-outline-secondary" id="' + einkaufsliste.items[i]._id + '"onclick="deleteItem(this.id)"></button></li>';
                text += ' <li class="list-group-item">' + einkaufsliste.items[i].name + '<span id="btn_items"> <span id="items_bought"> <button class="btn btn-outline-secondary" id="btn_bought"> <i class="fas fa-check"></i> </button> </span> <span id="items_delite"><button class="btn btn-outline-secondary" id="' + einkaufsliste.items[i]._id + '"onclick="deleteItem(this.id)"> <i class="fas fa-trash-alt"></i> </button> </span></span> </li>';
                document.getElementsByTagName("button").id = "newid";
            }
            console.log(Object.keys(einkaufsliste.items).length);
        }
        text += ''
        document.getElementById('items').innerHTML = text;
        document.getElementById('quantity').innerHTML = Object.keys(einkaufsliste.items).length;
    });
    xhr.open("GET", url + listid);
    xhr.send(data);
}



// /* GET List Header */

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

//delete Item

function deleteItem(clicked_id) {

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url + listid + "/items/" + clicked_id);
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                GetItems(); //Funktionsaufruf für die Itemliste
            }
        }
    };
    xhr.send(null);
}


// Items Löschen
// function deleteItem(clicked_id) {
//     var data = JSON.stringify(false);



//     var xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;

//     xhr.addEventListener("readystatechange", function () {
//         if (this.readyState === this.DONE) {
//             console.log(this.responseText);
//         }
//     });

//     xhr.open("DELETE", "https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6/items/5d9e2f5b3197880017e92185");
//     xhr.setRequestHeader("content-type", "application/json");



//     // xhr.onload = function () {
//     //     if (xhr.readyState === xhr.DONE) {
//     //         if (xhr.status === 200) {
//     //             console.log(xhr.response);
//     //             GetItems(); //Funktionsaufruf für die Itemliste

//     //         }
//     //     }
//     // };
//     xhr.send(data);
//     console.log(xhr.status)

// }
