main();

function main() {
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;

    var content = loadJSON();

    var doc = setupBaseDocument();

}

function loadJSON() {
    var selFolder = "/Users/sean/Desktop Workspaces/向淘宝学习/TaobaoSlang/content/"

    if (File.fs == "Windows")
        jsonFile = Folder(selFolder).openDlg( 'Load JSON document', "JSON:*.json,All files:*.*", false);
    else
        jsonFile = Folder(selFolder).openDlg( 'Load JSON document', function(file) { return file instanceof Folder || (!(file.hidden) && (file.name.match(/\.json$/i) || file.type == "JSON ")); }, false );
    jsonFile = File(jsonFile)
    jsonFile.open('r');
    eval(jsonFile.read());
    return content;
}

function setupBaseDocument() {
    var doc = app.documents.add();
    with (doc.documentPreferences) {
        pageHeight = "145mm";
        pageWidth = "110mm";
        pagesPerDocument = 16;
    }

    alert(doc.pages.length);

    with (doc.pages.item(0).marginPreferences){
        columnCount = 2;
        bottom = "12mm"
        left = "12mm"
        right = "6mm"
        top = "6mm"
    }

    return doc;
}
