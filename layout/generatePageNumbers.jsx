app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;

var content = loadJSON();
var doc = app.activeDocument;

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

generatePageNumbers(doc, content.index, content.entries)


function generatePageNumbers(myDocument, indexData, entryData) {

    myProgressPanel = new Window('window', 'Recording page numbers...');
    with(myProgressPanel){
        myProgressPanel.myProgressBar = add('progressbar', [12, 12, 480, 20], 0, indexData.length);
    }
    myProgressPanel.show();
    myProgressPanel.myProgressBar.value = 1;

    tmp = ""
    var pageNumber = 2;
    for (var i in indexData) {
        tmp += indexData[i].initial + "\r";
        for (var j in indexData[i].pinyins) {
            tmp += indexData[i].pinyins[j].pinyin;
            tmp += "\t";
            tmp += indexData[i].pinyins[j].words[0][0];
            tmp += "\t";

            var ind = indexData[i].pinyins[j].words[0][1][0];
            alert(entryData[ind].name)
            while (true) {
                var found = false;
                with (myDocument.pages.item(pageNumber).textFrames.item(0)) {
                    for (var k=0; k<paragraphs.length; k++) {
                        if (entryData[ind].name == paragraphs[k].contents.substring(0, paragraphs[k].contents.length - 1)) {
                            found = true;
                            break;
                        }
                    }
                }
                if (found) break;
                pageNumber ++;
            }
            tmp += (pageNumber - 1).toString() + "\r";
        }
        myProgressPanel.myProgressBar.value = i;
        myProgressPanel.update();
    }

    with (myDocument.pages.item(0).textFrames.item(0)) {

        parentStory.contents = tmp;

        myProgressPanel.close()
        myProgressPanel = new Window('window', 'Applying styles...');
        with(myProgressPanel){
            myProgressPanel.myProgressBar = add('progressbar', [12, 12, 480, 20], 0, parentStory.paragraphs.length);
        }
        myProgressPanel.show();
        myProgressPanel.myProgressBar.value = 1;

        for (var i=0; i<parentStory.paragraphs.length; i++) {
            if (parentStory.paragraphs[i].length == 2) {
                with (parentStory.paragraphs[i]) {
                    justification = Justification.centerAlign;
                    appliedFont = app.fonts.item("汉仪中宋S");
                    pointSize = 10;

                    spaceBefore = "2mm";
                    spaceAfter = "0.5mm";
                }
            } else {
                with (parentStory.paragraphs[i]) {
                    justification = Justification.leftAlign;
                    appliedFont = app.fonts.item("汉仪中宋S");
                    pointSize = 8;
                    spaceBefore = 0;
                    spaceAfter = 0;

                    tabStops.add({
                        alignment: TabStopAlignment.leftAlign,
                        leader: "",
                        position: tabPosition
                    });
                    tabStops.add({
                        alignment: TabStopAlignment.rightAlign,
                        leader: "",
                        position: textFramePreferences.textColumnFixedWidth
                    })
                }
            }
            myProgressPanel.myProgressBar.value = i;
            myProgressPanel.update();
        }
    }
}
