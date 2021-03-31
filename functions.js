function getRandomStringOfLength(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// function getLabelInput() {
//     var label = document.getElementById("labelInput").value.trim();
//     if (label.length <= 0) {
//         return "error"
//     }
//     else {
//         return label
//     }
// }

function getURL() {
    var url = document.getElementById("urlInput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://");
    if (!protocol_ok) {
        newurl = "https://" + url;
        return newurl;
    } else {
        return url;
    }
}

function getShortPath() {
    var path = document.getElementById("pathInput").value.trim();
    if (path.length <= 0 || path.includes(" ")) {
        return "error"
    }
    else {
        return path
    }
}

function logNewURL() {
    const endpoint = "https://api.airtable.com/v0/appv1hzGCBsemfbdc/URL%20Info"

    // const label = getLabelInput()
    const originalURL = getURL()
    const shortPath = getShortPath()

    if (shortPath == "error") {
        document.getElementById("submitURLButton").innerHTML = "One or more fields contained invalid input..."
        return
    }

    const data = `{
        "records": [
            {
              "fields": {
                    "originalURL": "${originalURL}",
                    "shortPath": "${shortPath}"
                }
            }
        ]
    }`;

    const otherParams = {
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "Authorization":"Bearer " + key
        },
        body: data,
        method: "POST"
    };

    fetch(endpoint, otherParams)
        .then(data => { return data.json() })
        .then(res => { console.log(res) })
        .catch(error => console.log(error))
}