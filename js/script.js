    var selectedListUrl = [];

    /* POST Item von Textbox */

    function POST() {
        var data = JSON.stringify({
            "name": document.getElementById("myTextarea").value
        });
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
            }
        });
        xhr.open("POST", "https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6/items");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }

    /* GET ListID */

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var einkaufsliste = JSON.parse(this.responseText)
            document.getElementById("_id").innerHTML = einkaufsliste._id;
        }
    });

    /* GET userId */

    xhr.open("GET", "https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6");
    xhr.send(data);
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var einkaufsliste = JSON.parse(this.responseText)
            document.getElementById("userId").innerHTML = einkaufsliste.userId;
        }
    });

    /*  GET Einkaufsliste Name */

    xhr.open("GET", "https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6");
    xhr.send(data);
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var einkaufsliste = JSON.parse(this.responseText)
            document.getElementById("listname").innerHTML = einkaufsliste.name;
        }
    });

    /*  GET Einkaufslisten Items */

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var einkaufsliste = JSON.parse(this.responseText)
            text = "<ul>"
            for (i = 0; i < Object.keys(einkaufsliste.items).length; i++) {
                text += '<li>' + einkaufsliste.items[i].name + '</li>';
            }
            console.log(Object.keys(einkaufsliste.items).length);
        }
        text += '</ul>'
        document.getElementById('items').innerHTML = text;
    });
    xhr.open("GET",
        "https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6?ddd=d&=");
    xhr.send(data);

    /*   DELETE Item von Liste */

    /* function (selectedListUrl, itemId) {
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
            }
        });
        xhr.open("DELETE",
            "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + selectedListUrl + "/items5" + itemId
        );
        xhr.send(data); */


    /* Update Item */

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
    xhr.open("PUT",
        "https://shopping-lists-api.herokuapp.com/api/v1/lists/5d931300ac8b120017a74aa6/items/5d964f519ddf3600176d7bbc"
    );
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(data);
