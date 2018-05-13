app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;

var images = loadImages()
var doc = app.activeDocument;
putImages(doc, images)


function loadImages() {
    var selFolder = "/Users/sean/Desktop Workspaces/向淘宝学习/TaobaoSlang/layout/"

    if (File.fs == "Windows")
        imgFiles = Folder(selFolder).openDlg( 'Load JSON document', "JSON:*.json,All files:*.*", false);
    else
        imgFiles = Folder(selFolder).openDlg( 'Load JSON document', function(file) { return file instanceof Folder || (!(file.hidden) && (file.name.match(/\.jpg/i) || file.type == "JPG ")); }, true );
    return imgFiles;
}


function putImages(myDocument, images) {

    myProgressPanel = new Window('window', 'Placing images...');
    with(myProgressPanel){
        myProgressPanel.myProgressBar = add('progressbar', [12, 12, 480, 20], 0, images.length);
    }
    myProgressPanel.show();
    myProgressPanel.myProgressBar.value = 1;

    pageNumber = 2;

    for (var i = 0; i < images.length; i++) {

        tmp = decodeURIComponent(images[i].name)
        imgName = tmp.substring(0, tmp.length - 4);
        alert(imgName);

        with (doc.pages.item(2).textFrames.item(1).parentStory) {
            for (var j = 0; j < paragraphs.length; j++) {
                alert (paragraphs[j].contents)
            }
        }

    }
}
