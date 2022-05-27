//RFC 4180 and MIME standards

// 1) Each record should contain the same number of comma-separated fields.
// 2) Any field may be quoted (with double quotes).
// 3) If double-quotes are used to enclose fields, then a double-quote in a field must be represented by two double-quote characters.
// 4) lines that end with CR/LF.

function makeCSVFromJSON(myJSON) {

    //FIRST PASS// -- collect field names for csv table
    let fieldNamesArray = [];
    for (arrayEntry of myJSON) {
        for (const field in arrayEntry) {
            if (!fieldNamesArray.includes(field)) {
                fieldNamesArray.push(field)
            };
        }
    }

    //make header with field names
    let csvString = "";
    for (field of fieldNamesArray) {
        field = field.replaceAll('"', '""'); //any interior " needs to be replaced with ""
        csvString += "\"" + field + "\","; //surround each field with quotes
    }
    csvString = csvString.slice(0, -1) + "\n"; //remove last comma and add new line

    //SECOND PASS -- fill in table using field names/keys
    for (arrayEntry of myJSON) {
        for (field of fieldNamesArray) {
            let csvEntry = arrayEntry[field];
            if (csvEntry === undefined) { //if undefined set to empty string ""
                csvEntry = "";
            } else if (typeof(csvEntry) != "string") { //if its not a string make it a string
                csvEntry = JSON.stringify(csvEntry);
            }
            csvEntry = csvEntry.replaceAll('"', '""');
            csvString += "\"" + csvEntry + "\"" + ","
        }
        csvString = csvString.slice(0, -1) + "\n";
    }

    return csvString;
}

jsonExample = [{
        "id": "28",
        "Title": "Sweden"
    }, {
        "id": 56,
        "Title": "USA"
    }, {
        "id": 89,
        "Title": "England"
    },
    {
        "objectIndex": { "key1": "something1", "key2": "something2" }
    },
    {
        "someArray": [73, "and hi there", { "key": "value" }]
    },
    {
        "stringyiness": { "object11": { "key11": "something11", "key21": "something21" }, "object12": { "hi there": "again again" } }
    },
    { "another ID": null }
];

console.log(makeCSVFromJSON(jsonExample));