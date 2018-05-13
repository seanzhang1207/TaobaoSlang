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

generateSideboxes(doc, content.index, content.entries)


function generateSideboxes(myDocument, indexData, entryData) {
    var currentInitial = "";
    var topDist = 0;

    myProgressPanel = new Window('window', 'Adding sideboxes...');
    with(myProgressPanel){
        myProgressPanel.myProgressBar = add('progressbar', [12, 12, 480, 20], 0, myDocument.pages.length);
    }
    myProgressPanel.show();
    myProgressPanel.myProgressBar.value = 1;

    for (var i = 2; i < myDocument.pages.length; i++) {

        entryInitials = [];

        with (myDocument.pages.item(i).textFrames.item(0)) {
            for (var k=0; k<paragraphs.length; k++) {
                if (paragraphs[k].contents.length == 2 && paragraphs[k].pointSize == 14) {

                    currentInitial = paragraphs[k].contents.substring(0, 1);
                    topDist ++;
                    break;
                }
            }

            for (var k=0; k<paragraphs.length; k++) {
                if (paragraphs[k].pointSize == 12) {
                    found = false;
                    for (var l=0; l<entryInitials.length; l++) {
                        if (entryInitials[l] == paragraphs[k].contents.substring(0, 1)) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        entryInitials.push(paragraphs[k].contents.substring(0, 1))
                    }
                }
            }
        }

        var myPageWidth = myDocument.documentPreferences.pageWidth;
        var myPageHeight = myDocument.documentPreferences.pageHeight;
        if(myDocument.pages.item(i).side == PageSideOptions.rightHand){
            var myX1 = myPageWidth - 4.5;
            var myX2 = myPageWidth + 5;
            var myY1 = 10 + topDist * 3;
            var myY2 = 10 + topDist * 3 + 4;

            myDocument.pages.item(i).rectangles.add({
                geometricBounds: [myY1, myX1, myY2, myX2],
                fillColor: "Black",
                fillTint: 20,
                strokeTint: 0
            })

            myX1 = myPageWidth - 3.5;
            myX2 = myPageWidth;
            myY1 = 10 + topDist * 3;
            myY2 = 10 + topDist * 3 + 4;


            txt = myDocument.pages.item(i).textFrames.add({
                geometricBounds: [myY1, myX1, myY2, myX2],
                contents: currentInitial
            })

            txt.paragraphs.item(0).pointSize = 9;
            txt.paragraphs.item(0).justification = Justification.leftAlign;
        }

        entryInitialText = entryInitials.join("");

        if(myDocument.pages.item(i).side == PageSideOptions.leftHand){
            myX1 = 14;
            myX2 = 98;
            myY1 = 6;
            myY2 = 10;

            txt = myDocument.pages.item(i).textFrames.add({
                geometricBounds: [myY1, myX1, myY2, myX2],
                contents: entryInitialText
            })

            with (txt) {
                paragraphs.item(0).pointSize = 8;
                paragraphs.item(0).justification = Justification.leftAlign;
            }
        } else {
            myX1 = 12;
            myX2 = 96;
            myY1 = 6;
            myY2 = 10;

            txt = myDocument.pages.item(i).textFrames.add({
                geometricBounds: [myY1, myX1, myY2, myX2],
                contents: entryInitialText
            })

            with (txt) {
                paragraphs.item(0).pointSize = 8;
                paragraphs.item(0).justification = Justification.rightAlign;
            }

        }

        myProgressPanel.myProgressBar.value = i;
        myProgressPanel.update();
    }
}
