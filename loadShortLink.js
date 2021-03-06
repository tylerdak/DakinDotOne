function sayWhatTheyreLookingFor() {
    setResult("Looking for redirect...","Shortcut: " + path, "")
 }


var records;

// This key is for my Read-Only AirTable account; It only has read access and only to tables that I grant access to.
// Change it to your key and make sure to update the table as necessary as well below (marked)
var key = "keyQNh4jP1NqeDsDG"

const status1Error = "404"
const status2Error = "Page not found 😭"
const descriptionError = `The page you were looking for doesn't exist, maybe check for cAsE or spelling errors?`

const urlPathParts = window.location.pathname.split('/')
var path = urlPathParts.slice(1).join("/")
var subPath = ""
if (urlPathParts.length > 2) {
    subPath = urlPathParts.slice(2).join("/")
}
const firstPathPart = urlPathParts[1]

sayWhatTheyreLookingFor()

function setResult(status1, status2, statusDescription) {
    document.getElementById("status1").innerHTML = status1
    document.getElementById("status2").innerHTML = status2
    document.getElementById("statusDescription").innerHTML = statusDescription
}

function getCurrentData() {

    // Update this endpoint to your AirTable, see your API info on AirTable's site
    const endpoint = "https://api.airtable.com/v0/appv1hzGCBsemfbdc/URL%20Info"

    const otherParams = {
        headers: {
            "Authorization":"Bearer " + key
        },
        method: "GET"
    };

    fetch(endpoint, otherParams)
        .then(async response => { 
            console.log(response);
            if (!response.ok) {
                alert("Something went wrong with the request...")
            }
            else {
                const data = await response.json();
                console.log(JSON.stringify(data.records));
                records = data.records;
                printRecords()
            }
         })
        .catch(error => { 
            console.log(error); 
            setResult(status1Error, status2Error, descriptionError)
        })

    
}



function printRecords() {
    

    console.log(firstPathPart)


    function matchPathToURLKey(currentRecord, index, arr) {
        const fields = currentRecord.fields;

        return fields.shortPath == firstPathPart;
    }

    const selectedRecord = records.find(matchPathToURLKey)

    if (selectedRecord == null) {
        //Need to tell user that they've hit a 404
        setResult(status1Error, status2Error, descriptionError)
    }
    else {
        const fields = selectedRecord.fields;
        const finalURL = fields.originalURL + "/" + subPath
        document.getElementById("statusDescription").style.textAlign = "center";
        setResult("Found it!", "Redirecting you now to:", `<a href=finalURL>${finalURL}</a>`)

        console.log(finalURL)
        
        
        window.location.replace(finalURL);

        
    }
        
}

getCurrentData()