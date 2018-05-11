main();

function main() {
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;

    var content = loadJSON();

    var doc = setupBaseDocument();

    layoutIndex(doc, content.index);

    layoutEntries(doc, content.index, content.entries);
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

function getBounds(myDocument, myPage){
    var myPageWidth = myDocument.documentPreferences.pageWidth;
    var myPageHeight = myDocument.documentPreferences.pageHeight;
    if(myPage.side == PageSideOptions.leftHand){
        var myX2 = myPage.marginPreferences.left;
        var myX1 = myPage.marginPreferences.right;
    } else {
        var myX1 = myPage.marginPreferences.left;
        var myX2 = myPage.marginPreferences.right;
    }
    var myY1 = myPage.marginPreferences.top;
    var myX2 = myPageWidth - myX2;
    var myY2 = myPageHeight - myPage.marginPreferences.bottom;
    return [myY1, myX1, myY2, myX2];
}


function setupBaseDocument() {
    var myDocument = app.documents.add();
    with (myDocument.documentPreferences) {
        pageHeight = "145mm";
        pageWidth = "110mm";
        facingPages = true;
        pageOrientation = PageOrientation.portrait;
        pagesPerDocument = 1;
    }

    with(myDocument.textDefaults){
        alignToBaseline = true;
        try{
            appliedFont = app.fonts.item("汉仪中宋S");
        }catch(e){}
    }

    myDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;

    index_first = myDocument.masterSpreads.item(0)
    index = myDocument.masterSpreads.add()
    entries = myDocument.masterSpreads.add()


    with(index_first) {
        with(pages.item(1)) {
            with(marginPreferences){
                columnCount = 4;
                columnGutter = "4mm";
                bottom = "12mm";
                //"left" means inside; "right" means outside.
                left = "12mm";
                right = "6mm";
                top = "6mm";
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[34, 44];
                paths[0].pathPoints[1].anchor=[34, 133];
                strokeWeight = 0.3;
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[58, 44];
                paths[0].pathPoints[1].anchor=[58, 133];
                strokeWeight = 0.3;
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[82, 44];
                paths[0].pathPoints[1].anchor=[82, 133];
                strokeWeight = 0.3;
            }

            with(textFrames.add()) {
                geometricBounds = ["15mm", "12mm", "21mm", "104mm"];
                insertionPoints.item(0).contents = "字母及汉语拼音音节索引";
                paragraphs.item(0).justification = Justification.centerAlign;
                paragraphs.item(0).appliedFont = app.fonts.item("汉仪中宋S");
                paragraphs.item(0).pointSize = 14;
            }

            with(textFrames.add()) {
                geometricBounds = ["23mm", "23.6mm", "35mm", "92.6mm"];
                insertionPoints.item(0).contents = "1. 每一音节后举一字作例，可按例字读音去查同音的字。\n2. 数字指本字典正文页码。";
                paragraphs.item(0).justification = Justification.leftAlign;
                paragraphs.item(0).appliedFont = app.fonts.item("汉仪中宋S");
                paragraphs.item(0).pointSize = 8;
            }
        }
    }

    with(index){
        //Set up the left page (verso).
        with(pages.item(0)) {
            with(marginPreferences){
                columnCount = 4;
                columnGutter = "4mm";
                bottom = "12mm";
                //"left" means inside; "right" means outside.
                left = "12mm";
                right = "6mm";
                top = "6mm";
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[28, 13];
                paths[0].pathPoints[1].anchor=[28, 133];
                strokeWeight = 0.3;
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[52, 13];
                paths[0].pathPoints[1].anchor=[52, 133];
                strokeWeight = 0.3;
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[76, 13];
                paths[0].pathPoints[1].anchor=[76, 133];
                strokeWeight = 0.3;
            }

            with(textFrames.add()) {
                geometricBounds = ["6mm", "6mm", "10mm", "98mm"];
                insertionPoints.item(0).contents = "字母及汉语拼音音节索引";
                paragraphs.item(0).justification = Justification.centerAlign;
                paragraphs.item(0).appliedFont = app.fonts.item("汉仪中宋S");
                paragraphs.item(0).pointSize = 8;
            }

            with(textFrames.add()) {
                geometricBounds = ["6mm", "6mm", "10mm", "10mm"];
                insertionPoints.item(0).contents = SpecialCharacters.autoPageNumber; paragraphs.item(0).justification = Justification.leftAlign;
                paragraphs.item(0).appliedFont = app.fonts.item("汉仪中宋S");
                paragraphs.item(0).pointSize = 8;
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[6, 10];
                paths[0].pathPoints[1].anchor=[98, 10];
                strokeWeight = 0.75;
            }
        }
            //Set up the right page (recto).
        with(pages.item(1)){
            with(marginPreferences){
                columnCount = 4;
                columnGutter = "4mm";
                bottom = "12mm";
                //"left" means inside; "right" means outside.
                left = "12mm";
                right = "6mm";
                top = "6mm";
            }
            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[34, 13];
                paths[0].pathPoints[1].anchor=[34, 133];
                strokeWeight = 0.3;
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[58, 13];
                paths[0].pathPoints[1].anchor=[58, 133];
                strokeWeight = 0.3;
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[82, 13];
                paths[0].pathPoints[1].anchor=[82, 133];
                strokeWeight = 0.3;
            }

            with(textFrames.add()){
                geometricBounds = ["6mm", "12mm", "10mm", "104mm"]; insertionPoints.item(0).contents = "字母及汉语拼音音节索引";
                paragraphs.item(0).justification = Justification.centerAlign;
                paragraphs.item(0).appliedFont = app.fonts.item("汉仪中宋S");
                paragraphs.item(0).pointSize = 8;
            }

            with(textFrames.add()){
                geometricBounds = ["6mm", "99mm", "10mm", "104mm"]; insertionPoints.item(0).contents = SpecialCharacters.autoPageNumber; paragraphs.item(0).justification = Justification.rightAlign;
                paragraphs.item(0).appliedFont = app.fonts.item("汉仪中宋S");
                paragraphs.item(0).pointSize = 8;
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[12, 10];
                paths[0].pathPoints[1].anchor=[104, 10];
                strokeWeight = 0.75;
            }
        }
    }



    with(entries){
        //Set up the left page (verso).
        with(pages.item(0)) {
            with(marginPreferences){
                columnCount = 2;
                columnGutter = "4mm";
                bottom = "12mm";
                //"left" means inside; "right" means outside.
                left = "12mm";
                right = "6mm";
                top = "6mm";
            }
            //Add a simple footer with a page number.
            with(textFrames.add()) {
                geometricBounds = ["6mm", "6mm", "10mm", "10mm"];
                insertionPoints.item(0).contents = SpecialCharacters.autoPageNumber; paragraphs.item(0).justification = Justification.leftAlign;
                paragraphs.item(0).appliedFont = app.fonts.item("汉仪中宋S");
                paragraphs.item(0).pointSize = 8;
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[6, 10];
                paths[0].pathPoints[1].anchor=[98, 10];
                strokeWeight = 0.75;
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[52, 13];
                paths[0].pathPoints[1].anchor=[52, 133];
                strokeWeight = 0.3;
            }
        }
            //Set up the right page (recto).
        with(pages.item(1)){
            with(marginPreferences){
                columnCount = 2;
                columnGutter = "4mm";
                bottom = "12mm";
                //"left" means inside; "right" means outside.
                left = "12mm";
                right = "6mm";
                top = "6mm";
            }
            //Add a simple footer with a section number and page number.
            with(textFrames.add()){
                geometricBounds = ["6mm", "99mm", "10mm", "104mm"]; insertionPoints.item(0).contents = SpecialCharacters.autoPageNumber; paragraphs.item(0).justification = Justification.rightAlign;
                paragraphs.item(0).appliedFont = app.fonts.item("汉仪中宋S");
                paragraphs.item(0).pointSize = 8;
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[12, 10];
                paths[0].pathPoints[1].anchor=[104, 10];
                strokeWeight = 0.75;
            }

            with(graphicLines.add()) {
                paths[0].pathPoints[0].anchor=[58, 13];
                paths[0].pathPoints[1].anchor=[58, 133];
                strokeWeight = 0.3;
            }
        }
    }
/*
    var myPage = myDocument.pages.item(0);
    var myTextFrame = myPage.textFrames.add();
    myTextFrame.geometricBounds = [6, 5.5, 100, 100];
    myTextFrame.contents = "This is some example text."
*/
    return myDocument;
}




function layoutIndex(myDocument, indexData) {
    var page = myDocument.pages.item(0);
    txt = page.textFrames.add()

    with(txt) {
        textFramePreferences.textColumnCount = 4;
        textFramePreferences.textColumnGutter = "4mm";
        geometricBounds = ["44mm", "12mm", "133mm", "104mm"];
        tabPosition = 10;

        tmp = ""
        for (var i in indexData) {
            tmp += indexData[i].initial + "\r";
            for (var j in indexData[i].pinyins) {
                tmp += indexData[i].pinyins[j].pinyin;
                tmp += "\t";
                tmp += indexData[i].pinyins[j].words[0][0];
                tmp += "\t";
                tmp += "123\r";
                /*

                paragraphs.item(-1).justification = Justification.leftAlign;
                paragraphs.item(-1).appliedFont = app.fonts.item("汉仪中宋S");
                paragraphs.item(-1).pointSize = 8;
                */
            }
        }
        contents = tmp;

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

        }

    }

    while (txt.overflows) {
        var pg = myDocument.pages.add();
        newtxt = pg.textFrames.add()

        with(pg) {
            appliedMaster = myDocument.masterSpreads.item(1);
        }

        with(newtxt) {
            textFramePreferences.textColumnCount = 4;
            textFramePreferences.textColumnGutter = "4mm";
            bounds = getBounds(myDocument, page)
            bounds[0] += 7;
            geometricBounds = bounds;

            previousTextFrame = txt;
        }

        txt = newtxt;
    }
}


function layoutEntries(myDocument, indexData, entryData) {
    var page = myDocument.pages.add();
    page.appliedMaster = myDocument.masterSpreads.item(2);
    txt = page.textFrames.add();

    with(txt) {
        textFramePreferences.textColumnCount = 2;
        textFramePreferences.textColumnGutter = "4mm";
        bounds = getBounds(myDocument, page)
        bounds[0] += 7;
        geometricBounds = bounds;
        tabPosition = 10;

        tmp = ""
        for (var i in indexData) {
            alert(indexData[i].initial)
            tmp += indexData[i].initial + "\r";
            /*
            with (parentStory.paragraphs.item(-1)) {
                justification = Justification.centerAlign;
                appliedFont = app.fonts.item("汉仪中宋S");
                pointSize = 14;

                spaceBefore = "2mm";
                spaceAfter = "7mm";
            }*/

            for (var j in indexData[i].pinyins) {
                tmp += indexData[i].pinyins[j].pinyin + "\r";
                /*
                with (parentStory.paragraphs.item(-1)) {
                    justification = Justification.centerAlign;
                    appliedFont = app.fonts.item("汉仪中宋S");
                    pointSize = 11;

                    spaceBefore = "2mm";
                    spaceAfter = "5mm";
                }*/

                for (var k in indexData[i].pinyins[j].words) {
                    for (var l in indexData[i].pinyins[j].words[k][1]) {
                        entry = entryData[indexData[i].pinyins[j].words[k][1][l]];
                        tmp += entry.name + "\r";
                        /*
                        with (parentStory.paragraphs.item(-1)) {
                            justification = Justification.leftAlign;
                            appliedFont = app.fonts.item("汉仪中宋S");
                            pointSize = 12;

                            spaceBefore = 0;
                            spaceAfter = 0;
                        }
                        */
                        if (entry.pinyin.length > 0) {
                            parentStory.contents += entry.pinyin + "\r";
                            /*
                            with (parentStory.paragraphs.item(-1)) {
                                justification = Justification.leftAlign;
                                appliedFont = app.fonts.item("汉仪中宋S");
                                pointSize = 8;

                                spaceBefore = 0;
                                spaceAfter = 0;
                            }
                            */
                        }

                        tmp += "【释义】" + entry.explanation + "\r" + "【词源】" + entry.etymology + "\r" + "【语用】" + entry.usage + "\r" + "【同义】" + entry.synonym + "\r\r";
                    }
                }

                /*

                paragraphs.item(-1).justification = Justification.leftAlign;
                paragraphs.item(-1).appliedFont = app.fonts.item("汉仪中宋S");
                paragraphs.item(-1).pointSize = 8;
                */
            }
        }
        parentStory.contents = tmp;
        /*
        contents = tmp;

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

        }
        */
    }

    while (txt.overflows) {
        var pg = myDocument.pages.add();
        newtxt = pg.textFrames.add()

        with(pg) {
            appliedMaster = myDocument.masterSpreads.item(2);
        }

        with(newtxt) {
            textFramePreferences.textColumnCount = 2;
            textFramePreferences.textColumnGutter = "4mm";
            bounds = getBounds(myDocument, pg)
            bounds[0] += 7;
            geometricBounds = bounds;
            previousTextFrame = txt;
        }

        txt = newtxt;
    }
}
