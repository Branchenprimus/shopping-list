var selectedListUrl = [];

/* POST Item von Textbox */

function POST() {
    var data = JSON.stringify({
        "name": document.getElementById("myTextarea").value
    });
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6/items");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(data);

    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.response);
                GetItems(); //Funktionsaufruf für die Itemliste

            }
        }
    };

    xhr.send(null);
}
GetListHeader();
GetItems();

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
                text += '<ul>' + einkaufsliste.items[i].name + ("<button>X</button>" + '</ul>') ;
            }
        }
        text += ""
        document.getElementById('items').innerHTML = text;
    });
    xhr.open("GET",
        "https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6");
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
            document.getElementById("_id").innerHTML = listHeader._id
            document.getElementById("userId").innerHTML = listHeader.userId
            document.getElementById("listname").innerHTML = listHeader.name
        }
    });
    
    xhr.open("GET", "https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6?ddd=d");
    xhr.setRequestHeader("content-type", "application/json");
    
    xhr.send(data);
    
}

function deleteItem(){

}



/*   DELETE Item von Liste */

// function (selectedListUrl, itemId) {
//     var data = null;
//     var xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;
//     xhr.addEventListener("readystatechange", function () {
//         if (this.readyState === this.DONE) {
//             console.log(this.responseText);
//         }
//     });
//     xhr.open("DELETE",
//         "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + selectedListUrl + "/items5" + itemId
//     );
//     xhr.send(data);


/* Update Item */

    // var data = JSON.stringify({
    //     "bought": true
    // });
    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    // xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === this.DONE) {
    //         console.log(this.responseText);
    //     }
    // });
    // xhr.open("PUT",
    //     "https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6/items/5d964f519ddf3600176d7bbc"
    // );
    // xhr.setRequestHeader("content-type", "application/json");
    // xhr.send(data);
