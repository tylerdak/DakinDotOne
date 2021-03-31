// The entirety of this file is irrelevant to my version of this project because the web client no longer creates the URLs
// I've left it in here, though, in case you want to use these. Just add some text fields and a button somewhere and then link this file

// Make sure you password protect it though, otherwise anyone can create as many URLs as they want which you probably don't want.

// Optional, label your URLs for your own sake. Unnecessary if you make your URLs make sense (dakin.one/myYouTubeChannel instead of dakin.one/mYTC)
/*
function getLabelInput() {
    var label = document.getElementById("labelInput").value.trim();
    if (label.length <= 0) {
        return "error"
    }
    else {
        return label
    }
}
*/

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
    // Change your endpoint based on whatever your AirTable API docs say, this is my table, so you won't be able to do much with this endpoint.
    const endpoint = "https://api.airtable.com/v0/appv1hzGCBsemfbdc/URL%20Info"

    // Uncomment if using the label code, you'll also need to add the necessary code to the data validation and data string.
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