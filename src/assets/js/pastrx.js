

var PASTRX = {
    pageHistory: [],
    practiceId: 0,
    PMPMode: "Gateway",
    currentPage: 0,
    map: null,
    patientDataList: null,
    hiddenPatientDataList: null,
    mode: "QA",
    optionMode: "",
    queryMode: "NORMAL",
    config: "STANDALONE",
    email: null,
    alertData: null,
    activePrescriptionData: null,
    ourPrescriptionData: null,
    pmpData: null,
    PASTReport: null,
    mapData: null,
    pharmacyMarkers: null,
    prescriberMarkers: null,
    tdeGraphData: null,
    medThresh: null,
    trendData: null,
    discData: null,
    javascriptTimer: null,
    patientName: null,
    selectedName: null,
    selectedDOB: null,
    providername:"",
    ourProviders:[],
    selectedPid: null,
    selectedApptid: null, //TODO: merge with appointmentId
    auth_token: null,
    eventData: null,
    testData: null,
    encounterData: null,
    client_id: null,
    maps_api_key: null,
    scope: 'email',
    numLibsToLoad: 1,
    logoutURL: "/_ah/logout",
    loggedin: false,
    cageaid: null,
    crafft: null,
    vitalsData: null,
    systemsData: null,
    showCollectorDialog: null,
    TDEDataLock: false, //lock so only one request for TDE data at a time
    TDEDataCallbacks: [],
    PASTReportLock: false, //lock so only one request for PASTReport at a time
    PASTReportCallbacks: [],
    PracticeLock: false, //lock so only one request for Practice at a time
    PracticeCallbacks: [],
    masquerade: null,
    targetDate: null,
    selectedPrescriptions: [],
    selectedPrescriptionsDate: null,
    scriptMap: null,
    red: "#990000",
    brightred: "#ff0000",
    yellow: "#999900",
    blue: "#000099",
    gray:"#cccccc",
    graphBackground: "#f8f8f8",
    orange: "#FF7300",
    userName: "",
    loggedinas: "",
    selectedEhrId: null,
    selectedPhotoId: null,
    selectedPhotoURLString: null,
    practice: null,
    prescribers: null, //TODO:  See if this is still used anywhere?  Duplicated ourProviders
    selectedUser: null,
    delegates: null,
    practiceAdmin: null,
    superUser: false,
    lastLoginIP: null,
    userInfo: {},
    allowSingleRequest: true,
    stateInformation: null,
    pdfBlob: null,
    usage: null,
    appointmentId: null, //TODO: merge with selectedApptid
    censusReport: null,
    outstandingPatients: [], //list of manually added patients who have not shown up in the patient list yet. ("firstname lastname dob")
    logoutTimer: 0, // Timer to log out
    logoutThreshold: 15, // number of minutes of inactivity before auto-logout.
    refreshTimer : 0,
    refreshThreshold: 5,
    profile: {},
    waitingForPatientData: false,
    skipPatientList: false,
    dashboardDoneLoading: false,
    canPushNotes: false,
    patientNotes: [],
    isNarcFacts: false,
    patientProviderMap: {},
    uniquePatientProviders: {},
    loginUserId: null,
    practicePatients: [],
    alertFilters: {},
    delegators: [],

    //
    // Utilities
    //
    getDateString: function (dt) {
        if (dt == null) {
            return "";
        }
        else {
            var month = dt.getMonth() + 1;
            month = month.toString();
            if(month.length == 1){
                month = "0" + month;
            }
            var date = dt.getDate();
            date = date.toString();
            if(date.length == 1){
                date = "0" + date;
            }
            return '' + month + '/' + date + '/' + dt.getFullYear();
        }
    },
    
    parseDateYYYYMMDD: function(str1){
        var yr1   = parseInt(str1.substring(0,4));
        var mon1  = parseInt(str1.substring(5,7));
        var dt1   = parseInt(str1.substring(8,10));
        var date1 = new Date(yr1, mon1-1, dt1);
        //set to midnight (for discrete days)
        date1.setHours(0,0,0,0);
        return date1;
    },

    getTodayAtMidnight: function(){
        var d = new Date();
        d.setHours(0,0,0,0);
        return d;
    },
    
    getYesterdayAtMidnight: function(){
        var d = this.getTodayAtMidnight();
        d.setDate(d.getDate() - 1);
        return d;
    },
    
    dateIsToday: function(dt){
        dt.setHours(0,0,0,0);
        var today     = this.getTodayAtMidnight();
        return (dt - today == 0);
    },
    
    dateIsTodayOrYesterday: function(dt){
        dt.setHours(0,0,0,0);
        var today     = this.getTodayAtMidnight();
        var yesterday = this.getYesterdayAtMidnight();
        return (dt - today == 0) || (dt - yesterday == 0);
    },

    dateIsInPast: function(date){
        var today = this.getTodayAtMidnight();
        date.setHours(0,0,0,0);
        return date < today;
    },

    dateIsInFuture: function(date){
        var today = this.getTodayAtMidnight();
        date.setHours(0,0,0,0);
        return date > today;
    },
    
    nullIfEmptyString: function(str){
        if(str == undefined || str == ""){
            return null;
        }
        return str;
    },
    
    changeTargetDate: function(date){
        if(date == null){
            date = document.querySelector("#picker").date;
        }
        var dateText = this.getDateString(date);
        console.log("Setting target date to: " + dateText);
        PASTRX.targetDate = dateText;
        PASTRX.refreshPatientListPage();
        var dialog = document.getElementById('targetdate-panel');
        dialog.close();
    },

    getMeddGaugeData: function(value, title, dataObj){
        if(PASTRX.practice == null || PASTRX.practice == undefined){
            console.log("missing PASTRX Practice Data.");
        } else {
            dataObj.maxValue = PASTRX.practice.medThreshold;
        }
        dataObj.value = value;
        dataObj.title = title;
        dataObj.unit  = "MME/Day"
        return dataObj;
    },
    
    //Works for Practice & Provider censuses.
    getCurrentMEDDGaugeData: function(pc){
        //Default empty values
        var dataObj = {
            value: 0,
            maxValue: 400,
            title: "Average Current MME/Day",
            unit: "MME/Day"
        }
        if (pc == undefined || pc == null || jQuery.isEmptyObject(pc)) {
            return dataObj;
        }

        console.log("Average MME/Day: " + pc.averageCurrentMEDD);

        return this.getMeddGaugeData(pc.averageCurrentMEDD, "Average Current MEDD", dataObj)
    },

    //Works for Practice & Provider censuses.
    getMaxMEDDGaugeData: function(pc){
        //Default empty values
        var dataObj = {
            value: 0,
            maxValue: 400,
            title: "Average Current MME/Day",
            unit: "MME/Day"
        }
        if (pc == undefined || pc == null || jQuery.isEmptyObject(pc)) {
            return dataObj;
        }
        return this.getMeddGaugeData(pc.averageMaxMEDD, "Average Current MEDD", dataObj)
    },

    //
    // Data
    //

    clearData: function () {
        PASTRX.pageHistory = [];
        PASTRX.currentPage = 0;
        PASTRX.map = null;
        PASTRX.email = null;
        PASTRX.alertData = null;
        PASTRX.activePrescriptionData = null;
        PASTRX.pmpData = null;
        PASTRX.PASTReport = null;
        PASTRX.mapData = null;
        PASTRX.pharmacyMarkers = null;
        PASTRX.prescriberMarkers = null;
        PASTRX.tdeGraphData = null;
        PASTRX.medThresh = null;
        PASTRX.trendData = null;
        PASTRX.discData = null;
        PASTRX.javascriptTimer = null;
        PASTRX.patientName = null;
        PASTRX.cageaid = null;
        PASTRX.crafft = null;
        PASTRX.auth_token = null;
        PASTRX.logoutURL = "/_ah/logout";
        PASTRX.loggedin = false;
        PASTRX.loggedinas = "";
        PASTRX.masquerade = null;
        PASTRX.selectedPrescriptions = [];
        PASTRX.selectedPrescriptionsDate = null;
        PASTRX.scriptMap = null;
        PASTRX.eventData = null;
        PASTRX.testData = null;
        PASTRX.encounterData = null;
        PASTRX.selectedPid = null;
        PASTRX.selectedEhrId = null;
        PASTRX.selectedPhotoId = null;
        PASTRX.selectedPhotoURLString = null;
        PASTRX.superUser = false;
        PASTRX.practice = null;
        PASTRX.prescribers = null;
        PASTRX.ourProviders = [];
        PASTRX.stateInformation = null;
        PASTRX.pdfBlob = null;
        PASTRX.usage = null;
        PASTRX.censusReport = null;
        PASTRX.profile = {};
        PASTRX.canPushNotes = false;
        PASTRX.patientNotes = [];
        PASTRX.loginUserId = null;
        PASTRX.alertFilters= {};
        PASTRX.delegators= [];
    },

    clearSelectedData: function () {
        PASTRX.tdeGraphData = null;
        PASTRX.mapData = null;
        PASTRX.pharmacyMarkers = null;
        PASTRX.prescriberMarkers = null;
        PASTRX.trendData = null;
        PASTRX.discData = null;
        PASTRX.eventData = null;
        PASTRX.testData = null;
        PASTRX.alertData = null;
        PASTRX.activePrescriptionData = null;
        PASTRX.ourPrescriptionData = null;
        PASTRX.pmpData = null;
        PASTRX.PASTReport = null;
        PASTRX.cageaid = null;
        PASTRX.crafft = null;
        PASTRX.vitalsData = null;
        PASTRX.systemsData = null;
        PASTRX.selectedPrescriptions = [];
        PASTRX.selectedPrescriptionsDate = null;
        PASTRX.scriptMap = null;
        PASTRX.encounterData = null;
        PASTRX.appointmentId = null ;
        PASTRX.selectedPid = null;
        PASTRX.selectedEhrId = null;
        PASTRX.selectedPhotoId = null;
        PASTRX.selectedPhotoURLString = null;
        PASTRX.stateInformation = null;
        PASTRX.canPushNotes = false;
        PASTRX.patientNotes = [];
    },

    showFeedbackDialog: function (e) {
        console.log("clicked Feedback Button");
        e.preventDefault();
        PASTRX.showCollectorDialog();
    },

    showBatchPdf: function (e){
        console.log("clicked batch pdf");

        var button = document.querySelector("#pdfBatchSection");
        console.log(button);

        button.refresh();
        button.open();

    },

    showRemovePatientControls: function (e){
        console.log("clicked batch pdf");

        var button = document.querySelector("#removePatientControls");
        console.log(button);

        button.refresh();
        button.open();

    },

    setId: function (newId) {
        PASTRX.selectedPid = newId;
    },

    setTitle: function (title, subTitle) {
        var pageTitle = $('#pagetitle');
            pageTitle.text(title);
        if ( subTitle ) {
            pageTitle.append($('<small/>', { 'class' : 'page-sub-title' }).text(subTitle));
        }
    },

    setProvider: function (providername) {
        $("#providername").text(providername);
    },

    setLogo: function() {
        var url = "/logo?id=" + PASTRX.practiceId;
        console.log(url);
        var h = document.querySelector('#help-logo');
        var m = document.querySelector('#main-logo');

        console.log("source: " + m.src);
        
        // If help-logo or main-logo undefined then log it
        if(h == null){
            console.log("Help Logo Source Is NULL. ");
        }else{
            h.src = url ;
        }
        
        if(m == null){
            console.log("Main Logo Source Is NULL. ");
        }else{
            m.src = url ;
        }

        console.log("source: " + m.src);

    },
  //TODO:  Remove this
  formatShortDate: function (dt) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var dtString = dt.getDate() + '-' + months[dt.getMonth()];
    return dtString;
  },
  //TODO:  Remove this
    truncateString: function (str, sub) {
        if (str != undefined) {
            var idx = str.indexOf(sub);
            if (idx >= 0) {
                str = str.substring(0, idx);
            }
        }
        return str;
    },
    setHtmlTitle: function (title) {
        $("#pagetitle").html(title);
    },

    showHelp: function () {
        Tipped.show('.simple-tooltip');
    },

  
    alertBox: function (options) {
        $("#alertMessage").text(options.message);

        $("#alertDialog").dialog({
            title: options.title,
            modal: options.modal,
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                    options.onOK();
                }
            }
        });
    },
    populateFields: function (data, prefix) {
        if (prefix == undefined) {
            prefix = "";
        }
        else {
            prefix += '_';
        }
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (typeof data[key] === 'object') {
                    PASTRX.populateFields(data[key], key);
                }
                else {
                    console.log(prefix + key + " -> " + data[key]);
                    if ($('#' + prefix + key).length) {
                        $('#' + prefix + key).val(data[key]);
                    }
                }
            }
        }
    },
    accessDenied: function () {
        PASTRX.pageHistory = [];
        PASTRX.setPage(11);
        var p = document.querySelector('past-access-denied');
        p.refresh();
    },
    locationDenied: function () {
        PASTRX.pageHistory = [];
        PASTRX.setPage(16);
        var p = document.querySelector('past-location-denied');
        p.refresh();
    },
    home: function () {
        PASTRX.pageHistory = [];
    },
    userSettings: function () {
        PASTRX.pageHistory = [];
    },
    showWebSite: function () {
        window.open("http://www.pastrx.com");
    },
    loginSplash: function () {
        PASTRX.pageHistory = [];
    },

    loadContentWindow: function (url) {

        if (PASTRX.pageHistory[++PASTRX.currentPage] != url) {
            PASTRX.pageHistory[++PASTRX.currentPage] = url;
        }
        ;
        setTimeout(function () {
            $('#app-content').load(url);
        }, 300);
    },

    getContentURL: function () {
        return PASTRX.pageHistory[PASTRX.currentPage];
    },

    loadPatient: function () {
        console.log('Patient request(' + url + ')');
        PASTRX.setTitle(PASTRX.selectedName);
    },

    loadDashboard: function () {
        PASTRX.setTitle(PASTRX.selectedName);
    },

    loadMap: function () {
        PASTRX.setTitle(PASTRX.selectedName);
    },

    loadGatewayRequest: function () {
        PASTRX.setTitle('PMP Gateway Request');
    },

    loadAdmin: function () {
        PASTRX.setTitle('Admin');
    },

    saveLocalData: function () {
        // Store
        localStorage.data = PASTRX.data;
    },

    uploadPDMP: function (patientId, patientName, patientDOB) {
        if (PASTRX.PMPMode == "PDF") {
            currentPatient = patientId;
            var url = 'uploadPDMP.html';
            PASTRX.pageHistory[++PASTRX.currentPage] = url;
            $('#app-content').load(url);
        }
        else {
            PASTRX.loadGatewayRequest(patientName, patientDOB);
        }
    },
    previousPage: function () {
        var thePage = --PASTRX.currentPage;
        thePage = thePage < 0 ? 0 : thePage;
        var url = PASTRX.pageHistory[thePage];
        $('#app-content').load(url);
    },

    nextPage: function () {
        var thePage = PASTRX.currentPage < (PASTRX.pageHistory.length - 1) ? ++PASTRX.currentPage : PASTRX.currentPage;
        thePage = thePage > 0 ? 0 : thePage;
        var url = PASTRX.pageHistory[thePage];
        $('#app-content').load(url);
    },

    showSystemMenu: function () {
        if (PASTRX.loggedin) {
            $("#pastco-system-menu-build").load("/app/build");
            var $box = $('#systemMenu');

            if ($box.width() > 0) {
                $box.animate({width: 0});
            } else {
                $box.animate({width: '260px'});
            }
        }
    },

    settings: function () {
        PASTRX.showSystemMenu();
        PASTRX.setTitle("System Settings");
    },
    log: function (message, obj) {
        console.log('Logging --------------------------------------------------------------------------');
        console.log(message);
        console.log(obj);
    },
    formatDate: function (isoDate) {
        if (isoDate != undefined) {
            if (isoDate.length > 10) {
                var month = isoDate.substring(5, 7);
                var day = isoDate.substring(8, 10);
                var year = isoDate.substring(0, 4);
                return month + '/' + day + '/' + year;
            }
        }
        return '';
    },
    disconnectUser: function (access_token) {
        var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
            access_token;

        // Perform an asynchronous GET request.
        $.ajax({
            type: 'GET',
            url: revokeUrl,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function (nullResponse) {
                // Do something now that user is disconnected
                // The response is always undefined.
            },
            error: function (e) {
                // Handle the error
                // console.log(e);
                // You could point users to manually disconnect if unsuccessful
                // https://plus.google.com/apps
            }
        });
    },

    setCanvasReady: function(category){
        var graphPanel;
        switch(category) {
            case "OPIOID":
                graphPanel = document.querySelectorAll('#med');
                break;
            case "STIMULANT":
                graphPanel = document.querySelectorAll('#stims');
                break;
            case "BENZODIAZEPINES":
                graphPanel = document.querySelectorAll('#benzos');
                break;
            case "Prescribers":
                graphPanel = document.querySelectorAll('#scribers');
                break;
            case "Pharmacies":
                graphPanel = document.querySelectorAll('#pharms');
                break;
        }
        for(var i = 0; i < graphPanel.length; i++){
            var loadingDialogue = graphPanel[i].querySelector('#loadingDialogue');
            loadingDialogue.className = "ready";
        }
    },


    /*
    This returns a date rounded down to the previous midnight
     */
    getDayFromCanvasCoordinate: function (canvas, xCoord){
        var width = canvas.width;
        console.log("canvas Width: " + width);
        console.log("X Coord: " + xCoord);
        //If margins change in plot functions, these need to change too.
        var leftMargin = 10;
        var rightMargin = 50;
        width  -= (leftMargin + rightMargin);
        xCoord -= leftMargin;
        if(xCoord > width){
            console.log("Click outside of graph bounds");
            return;
        }
        var daysInGraph = PASTRX.tdeGraphData.length;
        var day = (xCoord * daysInGraph / width);
        var reportDate = new Date(PASTRX.PASTReport.reportDate);
        var offset = new Date((daysInGraph - day) * 86400000); //Last day - total days in graph + selected day
        var selectedDate = new Date(reportDate - offset);
        selectedDate.setHours(0,0,0,0); // Round down to previous midnight
        return selectedDate;
    },

    getCanvasCoordinateFromDay: function (selectedDate, width, leftMargin, rightMargin){
        var graphWidth  = width - leftMargin - rightMargin
        var daysInGraph = PASTRX.tdeGraphData.length;
        var dayWidth    = graphWidth / daysInGraph;
        var reportDate  = new Date(PASTRX.PASTReport.reportDate);
        var daysBack    = PASTRX.getDaysBetween(selectedDate, reportDate);
        var offset      = (daysBack) * dayWidth + rightMargin;
        return width - offset;
    },

    getStartDateFromAlert: function(alert){
        var dateString = alert.startDate;  //"2015-11-04T00:00:00.000-05:00"
        var year = dateString.substring(0,4);
        var month = dateString.substring(5,7);
        var day   = dateString.substring(8,10);
        dateString = month + "/" + day + "/" + year;
        return new Date(dateString);
    },

    drawAlertRange: function (canvasId, alert) {
        var alertLength = PASTRX.getDaysBetween(new Date(alert.startDate), new Date(alert.endDate));
        var startDate   = PASTRX.getStartDateFromAlert(alert);
        var endDate     = PASTRX.getStartDateFromAlert(alert);
        endDate.setDate(startDate.getDate() + alertLength);
        if(alertLength != 0){
            //console.log("changing end date");
            endDate.setHours(23,59,0,0); //Draw at end of day
        }
        console.log("Drawing Start Date: " + startDate);
        console.log("Drawing End Date: " + endDate);

        var canvasNode  = document.querySelector(canvasId);
        PASTRX.clearCanvas(canvasNode);
        document.querySelector("#graphPanel").refresh();// redraw all graphs
        var leftMargin  = 10; //Should be a constant
        var rightMargin = 50; //Should be a constant
        var topMargin = 3;
        var bottomMargin;
        if(canvasId == "#medCanvas"){
            bottomMargin = 15;
        } else {
            bottomMargin = 1;
        }
        var width       = canvasNode.offsetWidth;
        var height      = canvasNode.offsetHeight;

        var topEdge     = topMargin;
        var bottomEdge  = height - bottomMargin;
        var leftEdge    = leftMargin;
        var rightEdge   = width - rightMargin;

        var coord  = PASTRX.getCanvasCoordinateFromDay(startDate, width, leftMargin, rightMargin);
        var coord2 = PASTRX.getCanvasCoordinateFromDay(endDate,   width, leftMargin, rightMargin);

        if(coord < leftEdge){
            coord = leftEdge;
        }
        if(coord2 > rightEdge){
            coord2 = rightEdge;
        }
        var bracketLen = 10;
        var alertWidth = coord2 - coord;
        if ( bracketLen > ((coord2-coord)/3) ) {
            bracketLen = ((coord2-coord)/3);
            }

        if ( bracketLen < 3 ){
            bracketLen = 3;
        }

        if (alertWidth < bracketLen){
            bracketLen = alertWidth;
        }


        var ctx = canvasNode.getContext("2d");
        ctx.scale(1.0, 1.0);
        ctx.strokeStyle = PASTRX.brightred;
        ctx.lineWidth = 4;
        // turn off line dash
        if(ctx.setLineDash !== undefined){
            ctx.setLineDash([]);
        }
        ctx.beginPath();
        ctx.moveTo(coord + bracketLen, topEdge);
        ctx.lineTo(coord, topEdge);
        ctx.lineTo(coord, bottomEdge);
        ctx.lineTo(coord + bracketLen, bottomEdge);
        ctx.stroke();
        if(bracketLen > 0) { //don't draw second line if they're on top of each other.
            ctx.beginPath();
            ctx.moveTo(coord2 - bracketLen, topEdge);
            ctx.lineTo(coord2, topEdge);
            ctx.lineTo(coord2, bottomEdge);
            ctx.lineTo(coord2 - bracketLen, bottomEdge);
            ctx.stroke();
        }

        //Write alert on MED page;
        canvasNode  = document.querySelector("#medCanvas");
        ctx = canvasNode.getContext("2d");
        ctx.font = "16px Arial";
        var metrics = ctx.measureText(alert.narrative);
        ctx.fillStyle = PASTRX.red;
        //ctx.globalAlpha=0.80;
        //ctx.fillRect(coord - metrics.width - 6, 2, metrics.width + 6, 20);
        //ctx.fillText(alert.narrative, coord - metrics.width - 10, 18);

        //Draw arrow if not drawing on MEDD canvas
        /*
        if(canvasId != "#medCanvas"){
            ctx.strokeStyle = PASTRX.orange;
            ctx.lineWidth = 3;
            if(ctx.setLineDash !== undefined){
                ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(coord - 8, 10);
            ctx.lineTo(coord, 10);
            ctx.lineTo(coord, 25);
            ctx.lineTo(coord - 4, 20);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(coord, 25);
            ctx.lineTo(coord + 4, 20);
            ctx.stroke();
            }
        */
    },

    loadPracticeData: function(callback, args){
        if(PASTRX.PracticeLock) {
            PASTRX.PracticeCallbacks.push({cb: callback, args: args});
        } else {
            //lock
            PASTRX.PracticeLock = true;
            PASTRX.PracticeCallbacks.push({cb: callback, args: args});//Put callback in queue
            gapi.client.pastAPI.getPractice({
                masquerade: PASTRX.masquerade
            }).execute(function (resp) {
                // console.log("Practice reponse ")
                // console.log(resp)
                if(resp == null){
                    PASTRX.practice = {};
                    console.warn("ERROR! -- NULL PRACTICE");
                }
                else {
                    PASTRX.practice = resp.result;
                    
                }
                //Call all callbacks in list
                while(PASTRX.PracticeCallbacks.length){
                    var thisCallback = PASTRX.PracticeCallbacks.shift();
                    var args         = thisCallback.args;
                    thisCallback.cb.apply(this, args);
                }
                //unlock
                PASTRX.PracticeLock = false;
            });
        }
    },

    loadPASTReportData: function(callback, args){
        if(PASTRX.PASTReportLock) {
            PASTRX.PASTReportCallbacks.push({cb: callback, args: args});
        } else {
            //lock
            PASTRX.PASTReportLock = true;
            PASTRX.PASTReportCallbacks.push({cb: callback, args: args});//Put callback in queue
            gapi.client.pastAPI.getPASTReport({'id': PASTRX.selectedPid}).execute(function (resp) {
                PASTRX.PASTReport = resp;
                gapi.client.pastAPI.getStateInfo({'state': resp.reportingState }).execute(function (resp) {
                    PASTRX.stateInformation = resp ;
                    //Call all callbacks in list
                    while(PASTRX.PASTReportCallbacks.length){
                        var thisCallback = PASTRX.PASTReportCallbacks.shift();
                        var args         = thisCallback.args;
                        thisCallback.cb.apply(this, args);
                    }
                    //unlock
                    PASTRX.PASTReportLock = false;

                    }) ;
            });
        }

    },

    loadTDEGraphData: function(canvasNode, category, callback){
        //Assumes that PASTRX.PASTReport.pmpReportId is not null;
        if(PASTRX.TDEDataLock) {
            PASTRX.TDEDataCallbacks.push({cb: callback, args: [canvasNode, category]});
        } else {
            //lock
            PASTRX.TDEDataLock = true;
            gapi.client.pastAPI.getTDEGraphData({
                'id': PASTRX.PASTReport.pmpReportId,
                'masquerade': PASTRX.masquerade
            }).execute(function (resp) {
                if (resp.items == undefined) {
                    //Error in TDE data
                    console.log("Unexpected response from getTDEGraphData: " + resp);
                    PASTRX.medThresh = 400;
                    PASTRX.tdeGraphData = [];
                } else if(resp.items.length != 2) {
                    console.log("Unexpected response from getTDEGraphData: " + resp);
                    PASTRX.medThresh = 400;
                    PASTRX.tdeGraphData = [];
                }else{
                    PASTRX.medThresh =  resp.items[0];
                    PASTRX.tdeGraphData = resp.items[1];
                }
                callback(PASTRX.tdeGraphData, canvasNode, category);//This callback
                //Call all other callbacks in list
                while(PASTRX.TDEDataCallbacks.length){
                    var thisCallback = PASTRX.TDEDataCallbacks.shift();
                    var args         = thisCallback.args;
                    args.unshift(PASTRX.tdeGraphData); //Add tdeGraphData to front of args
                    thisCallback.cb.apply(this, args);//args = [PASTRX.tdeGraphData, canvasNode ,category]
                }
                //unlock
                PASTRX.TDEDataLock = false;
            });
        }

    },

    clearCanvas: function (canvasNode) {
        var ctx = canvasNode.getContext("2d");

        var $width = canvasNode.offsetWidth;
        var $height = canvasNode.offsetHeight;

        ctx.scale(1.0, 1.0);
        ctx.clearRect(0, 0, $width, $height);
    },

    getTDEGraphData: function (canvasNode, category, callback) {
        //make sure PASTReport exists
        if (PASTRX.PASTReport == null && PASTRX.selectedPid != null) {
            PASTRX.loadPASTReportData(PASTRX.getTDEGraphData, [canvasNode,category, callback]);
            return;
        }
        //This function assumes the PASTReport has been generated
        if (PASTRX.PASTReport.pmpReportId == undefined) {
            console.log("Tried to call getTDEGraphData without valid PMPReportId ");
            callback([], canvasNode, category);
            return;
        }
        if(PASTRX.tdeGraphData == null){
            PASTRX.loadTDEGraphData(canvasNode,category,callback);
        } else {
            callback(PASTRX.tdeGraphData, canvasNode, category);
        }
    },

    plotTDEData: function (tableData, canvasNode, category) {
        // console.log("Plotting TDE Data")
        if (tableData == null || PASTRX.PASTReport == null) {
            // console.log('listTDE(' + PASTRX.selectedPid + ')' + category + canvasNode);
            if (PASTRX.selectedPid != null) {
                PASTRX.getTDEGraphData(canvasNode, category, PASTRX.plotTDEData);
            }
        } else {
            var reportDate = new Date(PASTRX.PASTReport.reportDate);
            var ctx = canvasNode.getContext("2d");

            var $width = canvasNode.offsetWidth;
            var $height = canvasNode.offsetHeight;

            ctx.scale(1.0, 1.0);
            //ctx.clearRect(0, 0, $width, $height);

            canvasNode.height = $height;
            canvasNode.width = $width;

            ctx.canvas.width = $width;
            ctx.canvas.height = $height;

            // console.log(category + 'canvas h:' + $height + '  w:' + $width);


            // Find Max Medd To Set Graph Height
            var maxMME = 0;
            for (var i = 0; i < tableData.length; i++) {
                var opioidCountIdx = 16;
                benzoCountIdx = opioidCountIdx + tableData[i][opioidCountIdx] + 1;
                if (category == "OPIOID") {
                    numScriptsIDX = opioidCountIdx;
                    dailyMEDIDX = 1;
                } else if (category == "STIMULANT") {
                    numScriptsIDX = benzoCountIdx + tableData[i][benzoCountIdx] + 1;
                    dailyMEDIDX = 3;
                } else if (category == "BENZODIAZEPINES") {
                    numScriptsIDX = benzoCountIdx;
                    dailyMEDIDX = 2;
                }
                if (tableData[i][dailyMEDIDX] > 0) {
                    var numScripts = tableData[i][numScriptsIDX];
                    var totalDose = 0;
                    for (var j = 0; j < numScripts; j++) {
                        totalDose += tableData[i][numScriptsIDX + 1 + j]; //add next prescription to dose
                    }
                    if(totalDose > maxMME) {
                        maxMME = totalDose;
                    }
                }
            }// For End
            // console.log("Theshhold: " + PASTRX.medThresh);
            // console.log("Graph Maximum MME?DAY Value: " + maxMME);
            if(maxMME < PASTRX.medThresh){
                maxMME = PASTRX.medThresh;
                // console.log("Graph Maximum MME?DAY Value: " + maxMME);
            }

            //axis
            if (category != "OPIOID") {
                var topMargin = 2;
                var bottomMargin = 2;
            } else {
                var topMargin = 20;
                var bottomMargin = 18;
            }
            var leftMargin = 10;
            var rightMargin = 50;
            var graphWidth = $width - leftMargin - rightMargin;
            var maxValue = maxMME * 1.25;//PASTRX.medThresh * 1.25; //Threshhold is always 4/5 of graph height

            ctx.font = "9px Arial";
            // axis
            ctx.beginPath();
            ctx.moveTo(leftMargin, topMargin);
            ctx.lineTo(leftMargin, $height - bottomMargin);
            ctx.lineTo($width - rightMargin, $height - bottomMargin);
            ctx.lineTo($width - rightMargin, topMargin);
            ctx.lineWidth = 1;
            ctx.stroke();

            //legends
            if (category == "OPIOID") {
                ctx.font = "12px Arial";
                ctx.fillStyle = 'black';
                var doseOffset = ($height - bottomMargin - topMargin) / maxValue;
                var stepSize = 100;
                var labelMargin = maxValue/16;
                for (var i = 100; i < maxValue && (($height - bottomMargin - (doseOffset * i)) > topMargin); i = i + stepSize) {
                    if(! (i < maxValue/10 || (i < PASTRX.medThresh + labelMargin && i > PASTRX.medThresh - labelMargin ))){ //Don't put mg markers near High Dose or Morphine Equiv markers
                        ctx.fillText('' + i + 'mg', $width - rightMargin + 10, $height - bottomMargin - (doseOffset * i));
                    }
                }
                var labels = ['Morphine', 'Milligram', 'Equiv.', 'Per','Day'];
                var metricsTop = [ ctx.measureText(labels[0]), ctx.measureText(labels[1]), ctx.measureText(labels[2]), ctx.measureText(labels[3]), ctx.measureText(labels[4])];
                ctx.font = "bold 10px Arial";
                ctx.fillText(labels[0], $width - rightMargin + 4, $height - bottomMargin - 40);
                ctx.fillText(labels[1], $width - rightMargin + 4 + ((rightMargin-metricsTop[1].width)/2), $height - bottomMargin - 30);
                ctx.fillText(labels[2], $width - rightMargin + 4 + ((rightMargin-metricsTop[2].width)/2), $height - bottomMargin - 20);
                ctx.fillText(labels[3], $width - rightMargin + 4 + ((rightMargin-metricsTop[3].width)/2), $height - bottomMargin - 10);
                ctx.fillText(labels[4], $width - rightMargin + 4 + ((rightMargin-metricsTop[4].width)/2), $height - bottomMargin - 1);
            }

            var barWidth = $width - rightMargin - leftMargin;
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var daysBack = 0;
            ctx.font = "12px Arial";

            for (var i = (barWidth + leftMargin); i > leftMargin; i = i - (barWidth / 360)) {
                var dayMarker = new Date(reportDate.getTime());
                dayMarker.setDate(reportDate.getDate() - daysBack);
                if (dayMarker.getDate() == 1) {
                    // console.log("Report Date: " + reportDate + "   dayMarker: " + dayMarker);
                    var dayString = months[dayMarker.getMonth()];
                    var metrics = ctx.measureText(dayString);

                    if (category == "OPIOID") {
                        ctx.fillText(dayString, i - metrics.width / 2, $height - bottomMargin + 12);
                    }
                    ctx.strokeStyle = '#000000';
                    ctx.lineWidth = 1;

                    ctx.beginPath();
                    ctx.moveTo(i, $height - bottomMargin + 2);
                    ctx.lineTo(i, topMargin);
                    ctx.stroke();
                }
                daysBack = daysBack + 1;
            }
            ctx.font = "12px Arial";
            ctx.fillStyle = 'black';

            var dayWidth = ($width - leftMargin - rightMargin) / 360;
            var doseOffset = ($height - bottomMargin - topMargin) / maxValue;

            //indices in data
            var categoryPrescribersIDX;
            var totalPharmaciesIDX = 11;
            var totalPrescribersIDX = 15;
            var numScriptsIDX;
            var dailyMEDIDX;
            var opioidCountIdx = 16;
            var benzoCountIdx;

            for (var i = 0; i < tableData.length; i++) {
                benzoCountIdx = opioidCountIdx + tableData[i][opioidCountIdx] + 1;
                if (category == "OPIOID") {
                    categoryPrescribersIDX = 8;
                    totalPharmaciesIDX = 11;
                    totalPrescribersIDX = 15;
                    numScriptsIDX = opioidCountIdx;
                    dailyMEDIDX = 1;
                } else if (category == "STIMULANT") {
                    categoryPrescribersIDX = 10;
                    numScriptsIDX = benzoCountIdx + tableData[i][benzoCountIdx] + 1;
                    dailyMEDIDX = 3;
                } else if (category == "BENZODIAZEPINES") {
                    categoryPrescribersIDX = 9;
                    numScriptsIDX = benzoCountIdx;
                    dailyMEDIDX = 2;
                }


                var numPrescribers = 0;
                if (tableData[i][categoryPrescribersIDX] > 0) {
                    for (var b = 1; b < 15; b++) {
                        if (tableData[i][categoryPrescribersIDX] & Math.pow(2, b)) {
                            ++numPrescribers;
                        }
                    }
                }

                var numPharmacies = 0;
                if (tableData[i][totalPharmaciesIDX] > 0) {
                    for (var b = 1; b < 15; b++) {
                        if (tableData[i][totalPharmaciesIDX] & Math.pow(2, b)) {
                            ++numPharmacies;
                        }
                    }
                }
                var totPrescribers = 0;
                if (tableData[i][totalPrescribersIDX] > 0) {
                    for (var b = 1; b < 15; b++) {
                        if (tableData[i][totalPrescribersIDX] & Math.pow(2, b)) {
                            ++totPrescribers;
                        }
                    }
                }

                if (tableData[i][dailyMEDIDX] > 0) {
                    var numScripts = tableData[i][numScriptsIDX];
                    var doseSize = 0;
                    var prevHeight = 0;
                    var top = 0;
                    var totalDose = 0;
                    for (var j = 0; j < numScripts; j++) {
                        doseSize = tableData[i][numScriptsIDX + 1 + j]; //add next prescription to dose
                        totalDose += doseSize;
                        var fromX = leftMargin + (dayWidth * i);
                        var toX = leftMargin + (dayWidth * (i + 1));
                        var currHeight = doseOffset * doseSize;
                        top = $height - bottomMargin - (currHeight + prevHeight);
                        top = Math.max(top, topMargin);
                        if (tableData[i][dailyMEDIDX] > PASTRX.medThresh || numPrescribers > 1) { //above max val or multiple prescribers of same type
                            ctx.fillStyle = PASTRX.red ;
                        } else {
                            ctx.fillStyle = ( totPrescribers > 1 ) || ( numPharmacies > 1 ) ? PASTRX.yellow : PASTRX.blue; //yellow for total prescribers or total Pharmacies > 1
                        }
                        ctx.strokeStyle = ctx.fillStyle;//'#000000';
                        ctx.lineWidth = 1;
                        var barWidth = (toX - fromX)-2 ;
                        if ( barWidth < 1 ) {
                            barWidth = 2 ;
                        }
                        currHeight = Math.min(currHeight, $height - top - bottomMargin);
//                        ctx.strokeRect(fromX, top, (toX - fromX), currHeight);
                        ctx.fillRect(fromX+1, top, barWidth, currHeight);
                        prevHeight += currHeight;
                    }
                }
            }
            // High-Dose Marker
            ctx.save();
            if(ctx.setLineDash !== undefined){
                ctx.setLineDash([5, 2]);
            }
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'black';
            ctx.font = "bold 10px Arial";
            var lineScale = PASTRX.medThresh/maxMME *(.8);
            console.log("LINE SCALE: " + lineScale);
            var threshPosition = ($height - bottomMargin - topMargin) * (1 - lineScale); //One fifth below MAX HEIGHT
            threshPosition += topMargin;//account for top margin
            ctx.beginPath();
            ctx.moveTo(leftMargin, threshPosition);
            ctx.lineTo($width - rightMargin, threshPosition);
            ctx.stroke();
            ctx.fillText('High', $width - rightMargin + 5,  threshPosition);
            ctx.fillText('Dose', $width - rightMargin + 5,  threshPosition + 10);

            ctx.restore();
            //Remove Loading div
            PASTRX.setCanvasReady(category);
        }

    },

    plotStimOrBenzoData: function (tableData, canvasNode, category) {
        if (tableData == null || PASTRX.PASTReport == null) {
            console.log('listTDE(' + PASTRX.selectedPid + ')' + canvasNode);
            if (PASTRX.selectedPid != null) {
                PASTRX.getTDEGraphData(canvasNode, category, PASTRX.plotStimOrBenzoData);
            }
        } else {
            var reportDate = new Date(PASTRX.PASTReport.reportDate);
            var ctx = canvasNode.getContext("2d");

            var $width = canvasNode.offsetWidth;
            var $height = canvasNode.offsetHeight;

            ctx.scale(1.0, 1.0);
            //ctx.clearRect(0, 0, $width, $height);

            canvasNode.height = $height;
            canvasNode.width = $width;

            ctx.canvas.width = $width;
            ctx.canvas.height = $height;

            //console.log(category + ' canvas h:' + $height + '  w:' + $width);

            //axis
            var topMargin = 4;
            var leftMargin = 10;
            var rightMargin = 50;
            var bottomMargin = 4;
            var graphWidth = $width - leftMargin - rightMargin;
            var maxValue = 425; // tableData[259][2];

            ctx.font = "9px Arial";
            // axis
            ctx.beginPath();
            ctx.moveTo(leftMargin, topMargin);
            ctx.lineTo(leftMargin, $height - bottomMargin);
            ctx.lineTo($width - rightMargin, $height - bottomMargin);
            ctx.lineTo($width - rightMargin, topMargin);
            ctx.lineWidth = 1;
            ctx.stroke();

            var barWidth = $width - rightMargin - leftMargin;
            var daysBack = 0;

            ctx.font = "12px Arial";
            for (var i = (barWidth + leftMargin); i > leftMargin; i = i - (barWidth / 360)) {
                var dayMarker = new Date(reportDate.getTime());
                dayMarker.setDate(reportDate.getDate() - daysBack);
                if (dayMarker.getDate() == 1) {
                    ctx.strokeStyle = '#000000';
                    ctx.lineWidth = 1;

                    ctx.beginPath();
                    ctx.moveTo(i, $height - bottomMargin + 2);
                    ctx.lineTo(i, topMargin);
                    ctx.stroke();
                }
                daysBack = daysBack + 1;
            }


            ctx.font = "12px Arial";
            ctx.fillStyle = 'black';

            var dayWidth = ($width - leftMargin - rightMargin) / 360;


            //indices in data
            var categoryPrescribersIDX;
            var totalPharmaciesIDX = 11;
            var totalPrescribersIDX = 15;
            var numScriptsIDX;
            var dailyMEDIDX;
            var opioidCountIdx = 16;
            var benzoCountIdx;

            for (var i = 0; i < tableData.length; i++) {
                benzoCountIdx = opioidCountIdx + tableData[i][opioidCountIdx] + 1;
                if (category == "STIMULANT") {
                    categoryPrescribersIDX = 10;
                    numScriptsIDX = benzoCountIdx + tableData[i][benzoCountIdx] + 1;
                    dailyMEDIDX = 3;
                } else if (category == "BENZODIAZEPINES") {
                    categoryPrescribersIDX = 9;
                    numScriptsIDX = benzoCountIdx;
                    dailyMEDIDX = 2;
                }
                var prescriptionCount = tableData[i][numScriptsIDX]; //Number of concurrent Prescriptions in category

                var numPrescribers = 0; //Prescribers in same category
                if (tableData[i][categoryPrescribersIDX] > 0) {
                    for (var b = 1; b < 15; b++) {
                        if (tableData[i][categoryPrescribersIDX] & Math.pow(2, b)) {
                            ++numPrescribers;
                        }
                    }
                }
                //TODO:  be able to handle more than 15 prescribers in a year?
                var numPharmacies = 0;
                if (tableData[i][totalPharmaciesIDX] > 0) {
                    for (var b = 1; b < 15; b++) {
                        if (tableData[i][totalPharmaciesIDX] & Math.pow(2, b)) {
                            ++numPharmacies;
                        }
                    }
                }
                var totPrescribers = 0;
                if (tableData[i][totalPrescribersIDX] > 0) {
                    for (var b = 1; b < 15; b++) {
                        if (tableData[i][totalPrescribersIDX] & Math.pow(2, b)) {
                            ++totPrescribers;
                        }
                    }
                }

                var fromX = leftMargin + (dayWidth * i);
                var toX = leftMargin + (dayWidth * (i + 1));

                //Only draw single bar
                if (prescriptionCount > 0) {
                    var prescriberLineHeight = $height / 2 ;
                    ctx.beginPath();
                    ctx.moveTo(fromX, prescriberLineHeight);
                    ctx.lineTo(toX, prescriberLineHeight);
                    if (numPrescribers > 1) { //Red for multiple prescribers of same type
                        ctx.strokeStyle = PASTRX.red;
                        }
                    else {
                        ctx.strokeStyle = ( totPrescribers > 1 ) || ( numPharmacies > 1 ) ? PASTRX.yellow : PASTRX.blue; //yellow for total prescribers or total Pharmacies > 1
                        }

                    ctx.lineWidth = 7;
                    ctx.stroke();
                }

            }
            //Remove Loading div
            PASTRX.setCanvasReady(category);
        }
    },

    plotPrescribersData: function (tableData, canvasNode, category) {
        if (tableData == null  || PASTRX.PASTReport == null) {
            console.log('listTDE(' + PASTRX.selectedPid + ')' + canvasNode);
            if (PASTRX.selectedPid != null) {
                PASTRX.getTDEGraphData(canvasNode, category, PASTRX.plotPrescribersData);
            }
        } else {
            var reportDate = new Date(PASTRX.PASTReport.reportDate);
            var ctx = canvasNode.getContext("2d");

            var $width = canvasNode.offsetWidth;
            var $height = canvasNode.offsetHeight;

            ctx.scale(1.0, 1.0);
            //ctx.clearRect(0, 0, $width, $height);

            canvasNode.height = $height;
            canvasNode.width = $width;

            ctx.canvas.width = $width;
            ctx.canvas.height = $height;

            //console.log('Prescribers canvas h:' + $height + '  w:' + $width);

            //axis
            var topMargin = 4;
            var leftMargin = 10;
            var rightMargin = 50;
            var bottomMargin = 4;
            var graphWidth = $width - leftMargin - rightMargin;
            var maxValue = 425; // tableData[259][2];

            ctx.font = "9px Arial";
            // axis
            ctx.beginPath();
            ctx.moveTo(leftMargin, topMargin);
            ctx.lineTo(leftMargin, $height - bottomMargin);
            ctx.lineTo($width - rightMargin, $height - bottomMargin);
            ctx.lineTo($width - rightMargin, topMargin);
            ctx.lineWidth = 1;
            ctx.stroke();

            var barWidth = $width - rightMargin - leftMargin;
            var daysBack = 0;
            ctx.font = "12px Arial";
            for (var i = (barWidth + leftMargin); i > leftMargin; i = i - (barWidth / 360)) {
                var dayMarker = new Date(reportDate.getTime());
                dayMarker.setDate(reportDate.getDate() - daysBack);

                if (dayMarker.getDate() == 1) {
                    ctx.strokeStyle = '#000000';
                    ctx.lineWidth = 1;

                    ctx.beginPath();
                    ctx.moveTo(i, $height - bottomMargin + 2);
                    ctx.lineTo(i, topMargin);
                    ctx.stroke();
                }
                daysBack = daysBack + 1;
            }

            ctx.font = "12px Arial";
            ctx.fillStyle = 'black';

            var dayWidth = ($width - leftMargin - rightMargin) / 360;

            for (var i = 0; i < tableData.length; i++) {
                var fromX = leftMargin + (dayWidth * i);
                var toX = leftMargin + (dayWidth * (i + 1));


                var numPrescribers = 0;
                if (tableData[i][15] > 0) {
                    for (var b = 1; b < 15; b++) {
                        if (tableData[i][15] & Math.pow(2, b)) {
                            ++numPrescribers;
                        }
                    }
                }
                //TODO: Make spacing between bars adjustable to number of prescribers (currently if we go over 8 or 9 they will be drawn off the graph)
                for (var b = 1; b < 15; b++) {
                    if (tableData[i][15] & Math.pow(2, b)) {
                        var prescriberLineHeight = $height - bottomMargin - (b * 5);
                        ctx.beginPath();
                        ctx.moveTo(fromX, prescriberLineHeight);
                        ctx.lineTo(toX, prescriberLineHeight);
                        ctx.strokeStyle = numPrescribers > 1 ? PASTRX.red : PASTRX.blue;
                        ctx.lineWidth = 2.5;
                        ctx.stroke();
                    }
                }
            }
            //Remove Loading div
            PASTRX.setCanvasReady(category);
        }

    },
    plotPharmaciesData: function (tableData, canvasNode, category) {
        if (tableData == null  || PASTRX.PASTReport == null) {
            console.log('listTDE(' + PASTRX.selectedPid + ')' + canvasNode);
            if (PASTRX.selectedPid != null) {
                PASTRX.getTDEGraphData(canvasNode, category, PASTRX.plotPharmaciesData);
            }
        } else {
            var reportDate = new Date(PASTRX.PASTReport.reportDate);
            var ctx = canvasNode.getContext("2d");

            var $width = canvasNode.offsetWidth;
            var $height = canvasNode.offsetHeight;

            ctx.scale(1.0, 1.0);
            //ctx.clearRect(0, 0, $width, $height);

            canvasNode.height = $height;
            canvasNode.width = $width;

            ctx.canvas.width = $width;
            ctx.canvas.height = $height;

            //console.log('Pharmacies canvas h:' + $height + '  w:' + $width);

            //axis
            var topMargin = 4;
            var leftMargin = 10;
            var rightMargin = 50;
            var bottomMargin = 4;
            var graphWidth = $width - leftMargin - rightMargin;
            var maxValue = 425; // tableData[259][2];

            ctx.font = "9px Arial";
            // axis
            ctx.beginPath();
            ctx.moveTo(leftMargin, topMargin);
            ctx.lineTo(leftMargin, $height - bottomMargin);
            ctx.lineTo($width - rightMargin, $height - bottomMargin);
            ctx.lineTo($width - rightMargin, topMargin);
            ctx.lineWidth = 1;
            ctx.stroke();

            var barWidth = $width - rightMargin - leftMargin;
            var daysBack = 0;
            ctx.font = "12px Arial";
            for (var i = (barWidth + leftMargin); i > leftMargin; i = i - (barWidth / 360)) {
                var dayMarker = new Date(reportDate.getTime());
                dayMarker.setDate(reportDate.getDate() - daysBack);
                if (dayMarker.getDate() == 1) {
                    ctx.strokeStyle = '#000000';
                    ctx.lineWidth = 1;

                    ctx.beginPath();
                    ctx.moveTo(i, $height - bottomMargin + 2);
                    ctx.lineTo(i, topMargin);
                    ctx.stroke();
                }
                daysBack = daysBack + 1;
            }

            ctx.font = "12px Arial";
            ctx.fillStyle = 'black';

            var dayWidth = ($width - leftMargin - rightMargin) / 360;

            for (var i = 0; i < tableData.length; i++) {
                var fromX = leftMargin + (dayWidth * i);
                var toX = leftMargin + (dayWidth * (i + 1));

                var numPharmacies = 0;
                for (var b = 1; b < 15; b++) {
                    if (tableData[i][14] & Math.pow(2, b)) {
                        ++numPharmacies;
                    }
                }

                for (var b = 1; b < 15; b++) {
                    if (tableData[i][14] & Math.pow(2, b)) {
                        var pharmacyLineHeight = $height - bottomMargin - (b * 5);
                        ctx.beginPath();
                        ctx.moveTo(fromX, pharmacyLineHeight);
                        ctx.lineTo(toX, pharmacyLineHeight);
                        ctx.strokeStyle = numPharmacies > 1 ? PASTRX.red : PASTRX.blue;
                        ctx.lineWidth = 2.5;
                        ctx.stroke();
                    }
                }
            }
            //Remove Loading div
            PASTRX.setCanvasReady(category);
        }

    },

    displayActivePrescriptionData: function () {

    },
    //TODO: move to dash-panel-pmp-report
    wrapText: function (context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(/[, -]/);
        var line = '';

        context.textAlign = 'left';
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);

    },

    afterLoadingAdditionalLibs: function () {
        console.log("-- -- -- -- -- --- -- Loading Additional libraries -- --- --- --")
        var remaining = --PASTRX.numLibsToLoad;

        if (remaining == 0) {
            console.log("afterLoading:" + PASTRX.client_id);
            PASTRX.initialize();
            gapi.client.pastAPI.getApplicationId().execute(function (resp) {
                console.log("id response:" + resp.data);
                $("#application-id-string").text(PASTRX.mode + '-' + resp.data);
            });
        }
        else {
            console.log(remaining + " lib(s) left to load");
        }
    },

    setLoginUserId: function(){
        var userid = PASTRX.getQueryVariable("userid");
        if(userid != null && userid != ""){
            PASTRX.loginUserId = userid;
        }else{
            PASTRX.loginUserId = null;
        }
    },
    
    getQueryVariable: function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
                }
            }
        console.log('Query variable %s not found', variable);
    },

    initializeClientApiKeys: function(){
        console.log("Initializeing API Keys and Client IDs");
        if (window.location.search.toLowerCase().indexOf("omnis") > -1) {
            PASTRX.queryMode = "OMNIS";
        }

        if (window.location.search.toLowerCase().indexOf("demo") > -1) {
            PASTRX.optionMode = PASTRX.optionMode + "DEMO";
        }

        if (window.location.search.toLowerCase().indexOf("masquerade=") > -1) {
            PASTRX.masquerade = PASTRX.getQueryVariable("masquerade");
        }

        if (window.location.search.toLowerCase().indexOf("ehrid=") > -1) {
            PASTRX.selectedEhrId = PASTRX.getQueryVariable("ehrid");
        }

        if (window.location.search.toLowerCase().indexOf("targetdate=") > -1) {
            PASTRX.targetDate = PASTRX.getQueryVariable('targetdate');
        }

        if (window.location.host == 'localhost:8080' || window.location.host == 'localhost:4200' || window.location.host.indexOf('10.0.2.2:8080') != -1) {
            PASTRX.mode = "LOCAL";
            PASTRX.client_id = "514107028499-ndtkrqili2d5ci9aofke9gkspu44r16s.apps.googleusercontent.com";
            PASTRX.maps_api_key = "AIzaSyAZQ1lESaG06NlzF9aOXb2ya3gMzC-hyXo";
        }
        else if (window.location.host.indexOf('pastrx-prod') != -1 || window.location.host.indexOf('app.narcfacts') != -1) {
            PASTRX.mode = "PRODUCTION";
            PASTRX.client_id = "497660666127-cmi4pv4np9hpag6oki136k0ph6tkemp9.apps.googleusercontent.com";
            PASTRX.maps_api_key = "AIzaSyBtAdskdJug4VHr8xvqKhFSDw1vWsSVTBw";
        }
        else if (window.location.host.indexOf('pastrx-demo1') != -1) {
            PASTRX.mode = "DEMO1";
            PASTRX.client_id = "422320775827-0pi2tbuedniomvsv18qt87il1p6m3qbi.apps.googleusercontent.com" ;
            PASTRX.maps_api_key = "AIzaSyCeQl6kb9fcjXO2zO95vb6UExT2VowbuLs";
        }
        else if (window.location.host.indexOf('pastrx-demo2') != -1) {
            PASTRX.mode = "DEMO2";
            PASTRX.client_id = "887233596998-dmcs2bjcst65i7ime8d6sktcpdctj2i0.apps.googleusercontent.com" ;
            PASTRX.maps_api_key = "AIzaSyAwQglUHtPgqm4PsEVCNscAmmtCIM5ISP4";
        }
        else if (window.location.host.indexOf('pastrx-demoa') != -1) {
            PASTRX.mode = "DEMOA";
            PASTRX.client_id = "932143284857-ik7g5emf6svk4s6dt573i5m241eeue79.apps.googleusercontent.com" ;
            PASTRX.maps_api_key = "AIzaSyA3mpK16pgwBVv-13SrSsPpfEjpxGhhomI";
        }
        else if (window.location.host.indexOf('pastrx-qa') != -1) {
            PASTRX.mode = "QA";
            PASTRX.client_id = "441490496197-dpsvblcg3ommqovt5l3a357dfuhpe3sc.apps.googleusercontent.com";
            PASTRX.maps_api_key = "AIzaSyCFT86TgyC3d0mk4fZXa0YwStBXqRP_uc4";
        }
        else if (window.location.host.indexOf('pastrx-dev1') != -1) {
            PASTRX.mode = "DEV1";
            PASTRX.client_id = "471095455031-omhq4m0ks1946a173dpegcb25ntufq4i.apps.googleusercontent.com";
            PASTRX.maps_api_key = "AIzaSyD-OF6rBxDQEEWaZm5Hju6zR2Cz7t6Kq6o";
        }
        else if (window.location.host.indexOf('pastrx-edu1') != -1) {
            PASTRX.mode = "EDU1";
            PASTRX.client_id = "1513499911-o7r5p6hnkkq2k46ht6dvt1noojg0dnbt.apps.googleusercontent.com";
            PASTRX.maps_api_key = "AIzaSyB19XNacOHXVb-Q8qFFnE9e5WUa35sfzuU";
        }
        else if (window.location.host.indexOf('pastrx-demohcx') != -1 || window.location.host.indexOf('app-dev.narcfacts') != -1) {
            PASTRX.mode = "DEMOHCX";
            PASTRX.client_id = "655210243667-2pbdfv9hg4491gr56loj0c8idpdbhsk2.apps.googleusercontent.com";
            PASTRX.maps_api_key = "AIzaSyASFMYZNZq0TP0TqVoaz8urek6jI8TDXeM";
        }
        else {
            PASTRX.mode = "DEV";
            PASTRX.client_id = "514107028499-hkeel8akqgbdrp86tsi622be9c9a08au.apps.googleusercontent.com";
            PASTRX.maps_api_key = "AIzaSyAZQ1lESaG06NlzF9aOXb2ya3gMzC-hyXo";
        }
    },

    initialize: function () {
        console.log("ready(" + window.location.host + ")");
        console.log("search:" + window.location.search);
        if(PASTRX.client_id == null){
            PASTRX.initializeClientApiKeys();
        }
        this.setupFeedbackButton();
    },

    checkBySelector: function(selector){
        if(document.querySelector(selector) == null){
            console.log(selector + " Not Found");
            return false;
        }
        return true;
    },
    
    isAdmin: function(){
        return (window.location.href.toLowerCase().indexOf("/app/pastrxadmin.html") > -1 ||
            window.location.href.toLowerCase().indexOf("/app/narcfactsadmin.html") > -1 )
    },
    isApp: function(){
        return (window.location.href.toLowerCase().indexOf("/app/pastrxapp.html") > -1 ||
            window.location.href.toLowerCase().indexOf("/app/narcfactsapp.html") > -1 )
    },

    elementsLoaded: function(){
        if (PASTRX.numLibsToLoad > 0) {
            console.log("Waiting to load libraries: " + PASTRX.numLibsToLoad);
            console.log(gapi);
            return false
        };
        //TODO: add more elements here to check.
        //App Only
        if(! PASTRX.isAdmin()){
            if(!PASTRX.checkBySelector('#mainpatientlist') ){return false;}
            if(!PASTRX.checkBySelector('#dashboard') ){return false;}
            if(!PASTRX.checkBySelector('#graphPanel')){return false;}
            if(!PASTRX.checkBySelector('#alerts')){return false;}
            if(!PASTRX.checkBySelector('#mapPanel') ){return false;}
            if(!PASTRX.checkBySelector('#pmpreport')){return false;}
        }
        //Admin Only
        if(PASTRX.isAdmin()){
            if(!PASTRX.checkBySelector('#practiceDash')){return false;}
            if(!PASTRX.checkBySelector('#practiceWizard')){return false;}
            if(!PASTRX.checkBySelector('#practicePage')){return false;}
        }
        //both
        if(!PASTRX.checkBySelector('#app-pages')){return false;}

        return true;
    },
    
    afterSignin: function (token_object) {
        if (PASTRX.elementsLoaded() == false) {
            console.log("Elements Not Loaded.  Waiting 500ms...")
            setTimeout(function () {
                PASTRX.afterSignin(token_object);
            }, 500);
            return;
        }
        PASTRX.loggedin = false;
        PASTRX.loggedinas = "";
        PASTRX.practiceId = 1;
        PASTRX.hidePatientPhoto();
        $("#logged-in-as-string").text(PASTRX.loggedinas);
        PASTRX.auth_token = token_object;
        gapi.auth.setToken({
            access_token: token_object
        });
        console.log("afterSignin(" + window.location.host + ")");

        var athenaPatId = null;
        var athenaDeptId = null;
        var athenaPracId = null;
        if(PASTRX.isApp()) {
            if (PASTRX.profile != {}) {
                //Parse Patient ID from Profile
                if (PASTRX.profile["https://pastrx-prod.appspot.com/patientID"] != undefined ) {
                    athenaPatId  = PASTRX.profile["https://pastrx-prod.appspot.com/patientID"];
                }
                //Parse Department ID from Profile
                if(PASTRX.profile["https://pastrx-prod.appspot.com/departmentID"] != undefined ){
                    athenaDeptId = PASTRX.profile["https://pastrx-prod.appspot.com/departmentID"];
                }
                if(PASTRX.profile["https://pastrx-prod.appspot.com/practiceID"] != undefined ){
                    athenaPracId = PASTRX.profile["https://pastrx-prod.appspot.com/practiceID"];
                }
            }
        }

        // DEBUG
        // athenaPatId = '6171'
        // athenaDeptId = '150'

        //Parse appointment data
        if (window.location.search.toLowerCase().indexOf("apt=") > -1) {
            PASTRX.selectedApptid = PASTRX.getQueryVariable('apt');
            PASTRX.appointmentId = PASTRX.getQueryVariable('apt'); //TODO: merge these.
        }

        gapi.client.pastAPI.login({
            "location": window.location.host,
            'masquerade': PASTRX.masquerade,
            'athenaPatId': athenaPatId,
            'athenaDeptId': athenaDeptId
        }).execute(function (resp) {
            // console.log("login response:" + JSON.stringify(resp));
            if(resp.practice != undefined && resp.practice != null){
                PASTRX.practice = resp.practice;
                PASTRX.practiceId = resp.practice.id;
            }
            if(resp.alertFilters != undefined && resp.alertFilters != null)
                PASTRX.alertFilters = resp.alertFilters;
            if(resp.resultMap != undefined && resp.resultMap != null)
                PASTRX.delegators = resp.resultMap;
            PASTRX.lastLoginIP = resp.lastLoginIP;
            
            //Show app page.
            var loading = document.getElementById('PASTLoadingApp');
            var app = document.getElementById('mainApp');
            loading.style.display = "none";
            app.style.display = "block";
            
            if (resp.user != undefined && resp.user != null && resp.user.id != undefined) {
                //Get on demand patient if NOT in Admin
                if("Multiple Delegators" == resp.statusMessage ){
                    var obj = {
                        patient: resp.patient,
                        delegators: PASTRX.delegators,
                    };
                    var feedback = document.querySelector("#userFeedback");
                    feedback.displayResponse(obj, "queryPatient");
                }

                //TODO: Handle this load on the Back End.
                if (PASTRX.isApp()) {
                    if(resp.appointment != undefined && resp.appointment != null){
                        PASTRX.selectedApptid = resp.appointment.id;
                        PASTRX.appointmentId  = resp.appointment.id; //TODO: merge these.
                    }
                    if(PASTRX.selectedApptid != null){
                        console.log("Loading Appointment: " + PASTRX.selectedApptid);
                        PASTRX.loadContextualApptData(PASTRX.selectedApptid,athenaPatId);
                    }
                }
                
                //set params
                PASTRX.loggedin = true;
                PASTRX.userName = resp.user.firstName + " " + resp.user.lastName;
                PASTRX.loggedinas = "Logged in as " + PASTRX.userName;
                $("#logged-in-as-string").text(PASTRX.loggedinas);
                
                // Save User Window Information
                gapi.client.pastAPI.getUserWindowData({
                    "userID": resp.user.id,
                    "screenWidth": window.innerWidth, "screenHeight": window.innerHeight,
                    "browserType": navigator.userAgent, "operatingSystemType": navigator.userAgent
                }).execute(function (resp) {
                    console.log("Execute User Window Data")
                });
                
                //TODO: Why do I get users AND prescribers?
                gapi.client.pastAPI.getOurUsers({
                    'masquerade': PASTRX.masquerade
                }).execute(function (resp) {
                    // console.log('Providers:' + resp);
                    PASTRX.ourProviders = resp.items;
                    if (PASTRX.ourProviders != null) {
                        PASTRX.ourProviders.sort(function (a, b) {
                            var textA = a.lastName.toUpperCase();
                            var textB = b.lastName.toUpperCase();
                            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                        });
                        
                    }
                });
                
                gapi.client.pastAPI.listPrescribers({
                    'masquerade': PASTRX.masquerade
                }).execute(function (resp) {
                    // console.log('Providers:' + resp);
                    PASTRX.prescribers = resp.items;
                    if (PASTRX.prescribers != null) {
                        PASTRX.prescribers.sort(function (a, b) {
                            var textA = a.lastName.toUpperCase();
                            var textB = b.lastName.toUpperCase();
                            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                        });
                        
                        var pmpreq = document.querySelector('dash-panel-req-pmp');
                        if (pmpreq != null) {
                            pmpreq.providers = PASTRX.prescribers;
                        }
                        
                        // hide precriber loading icon inside the pmp req panel
                        var prescriberLoader = document.querySelector("#prescriberListLoader");
                        if (prescriberLoader !== undefined && prescriberLoader !== null) {
                            prescriberLoader.style.display = "none";
                        }
                    }
                });
                
                if (resp.user.practiceAdmin != undefined) {
                    PASTRX.practiceAdmin = resp.user.practiceAdmin; //only practice admin can see admin controls in AdminDash
                }
                
                if (resp.user.superUser != undefined && resp.user.superUser) {
                    PASTRX.superUser = true;
                }


                if (!PASTRX.validateSpecialty(resp.user.specialty)) {
                    // TODO: find less intrusive way to display this.
                    // var feedback = document.querySelector("#userFeedback");
                    // feedback.displayResponse("Your current specialty is not authorized to make request through the pmp gateway.", "Alert");
                }
                
                
                //save user info for admin screens
                PASTRX.saveUserInfo(resp.user);
                
                if (!PASTRX.isNarcFacts) { //no logo change on NarcFacts.
                    console.log("NOT NARC FACTS.");
                    PASTRX.setLogo();
                }
                
                $("#menuLink").prop("disabled", false);
                $("#signin-button").hide();
                
                PASTRX.setPageAfterSignin(); //Different behaviour in Admin app vs main app
            } else {
                if (resp.email != undefined){
                    PASTRX.email = resp.email;
                }else{
                    PASTRX.email = "NO_EMAIL_PROVIDED";
                }
                if (resp.lastLoginIP == undefined) {
                    PASTRX.accessDenied();
                } else {
                    if(resp.message != undefined && resp.message.indexOf("tried to login without being allowed") >= 0){
                        PASTRX.accessDenied();
                    }else{
                        PASTRX.locationDenied();
                    }
                }
            }
        });
        $('#PASTSignin').hide();
    },

    loadContextualPatientResponse: function(resp){
        var p = document.querySelector('#dashboard');
        PASTRX.waitingForPatientData = false;
        console.log(resp);
        console.log(resp.message);
        var feedback = document.querySelector("#userFeedback");
        if(resp.success){
            if(resp.patient != undefined && resp.patient != null){
                var patient = resp.patient;
                if(resp.appointment != undefined){
                    console.log("found appointment in response");
                    PASTRX.selectedApptid = resp.appointment.id;
                    patient.status = resp.appointment.processingStatus;
                }
                if(patient.status != undefined && patient.status != null) {
                    p.loadingStatus = patient.status;
                    console.log("Patient Status: " + patient.status);
                    if (patient.status == "Ready") {
                        PASTRX.selectedName = patient.lastName + ', ' + patient.firstName;
                        PASTRX.selectedDOB = patient.dobString;
                        PASTRX.providername = patient.provider;
                        PASTRX.selectedPid = patient.id;
                        PASTRX.selectedPhotoId = patient.photoId;
                        PASTRX.dashboardDoneLoading = true;
                    } else if (patient.status == "NO DATA") {
                        console.log("NO Data in state PMP");
                        alert("No Data was found in the State PMP for: " + patient.lastName + ', ' + patient.firstName);
                        PASTRX.dashboardDoneLoading = true;
                        PASTRX.setPatientListPage();
                    } else if (patient.status == "ERROR Processing" || patient.status == "ERROR Analyzing") {
                        console.log("ERROR: " + patient.status);
                        alert("There was an error processing the patient: " + patient.lastName + ', ' + patient.firstName);
                        PASTRX.dashboardDoneLoading = true;
                        PASTRX.setPatientListPage();
                    }else{
                        console.log("Non-final status.  Not done loading.")
                        PASTRX.dashboardDoneLoading = false;
                    }
                    return;
                }else{
                    p.loadingStatus = "Processing Patient Request";
                    return;
                }
            }else{
                console.log("The Contextual Patient Response did not contain a patient...")
            }
        }else{
            PASTRX.dashboardDoneLoading = true;
            var feedback = document.querySelector("#userFeedback");
            var obj = {
                patient: resp.patient,
                delegators: PASTRX.delegators,
                message: ((resp.message != undefined) ? resp.message : null)
            };
            feedback.displayResponse(obj,"loadPatient");
            PASTRX.setPatientListPage();
        }
    },
    
    loadContextualApptData: function(aptId,athenaPatId){ //Athena id is null when not Athena
        console.log("loading Appointment: " + aptId);
        PASTRX.skipPatientList = true;
        PASTRX.waitingForPatientData = true;
        var p = document.querySelector('#dashboard');
        p.showLoadingStatus = true;
        p.athenaPatId = athenaPatId;
        gapi.client.pastAPI.getPatientFromAptId({
            'masquerade': PASTRX.masquerade,
            'appointmentId': aptId
        }).execute(function (resp) {
            PASTRX.loadContextualPatientResponse(resp);
        });
    },
    
    checkPatientStatus: function(athenaId, patientId){
        console.log("Checking Patient Processing Status")
        PASTRX.waitingForPatientData = true;
        var p = document.querySelector('#dashboard');
        p.showLoadingStatus = true;
        p.athenaPatId = athenaId;
        gapi.client.pastAPI.checkPatientStatus({
            'masquerade': PASTRX.masquerade,
            'ehrid': PASTRX.selectedEhrId,
            'athenaPatientId': athenaId,
            'patientId': patientId
        }).execute(function (resp) {
            PASTRX.waitingForPatientData = false;
            console.log(resp.message);
            if(resp.success){
                if(resp.patient != undefined && resp.patient != null){
                    console.log(resp.patient);
                    var patient = resp.patient;
                    if(resp.appointment != undefined){
                        console.log("found appointment in response");
                        PASTRX.selectedApptid = resp.appointment.id;
                        patient.status = resp.appointment.processingStatus;
                    }
                    p.loadingStatus        = patient.status;
                    if(patient.status == "Ready") {
                        PASTRX.selectedName = patient.lastName + ', ' + patient.firstName;
                        PASTRX.selectedDOB = patient.dobString;
                        PASTRX.providername = patient.provider;
                        PASTRX.selectedPid = patient.id;
                        PASTRX.selectedPhotoId = patient.photoId;
                    }else if (patient.status == "NO DATA") {
                        console.log("NO Data in state PMP");
                        alert("No Data was found in the State PMP for: " + patient.lastName + ', ' + patient.firstName);
                        PASTRX.setPatientListPage();
                    } else if (patient.status == "ERROR Processing" || patient.status == "ERROR Analyzing") {
                        console.log("ERROR: " + patient.status);
                        alert("There was an error processing the patient: " + patient.lastName + ', ' + patient.firstName);
                        PASTRX.setPatientListPage();
                    }
                    return;
                }
            }else{
                PASTRX.dashboardDoneLoading = true;
                alert(resp.message);
                PASTRX.setPatientListPage();
            }
        });
    },
    
    saveUserInfo: function(user){
        // console.log("-- -- -- -- \n\n USER INFO\n\n -- -- -- ");
        // console.log(JSON.stringify(user, null, 2))
        this.userInfo = {
            id: user.id,
            loginAllowed: user.loginAllowed,
            active: user.active,
            practiceAdmin: user.practiceAdmin,
            email: user.email,
            specialty: user.specialty,
            lastName: user.lastName,
            firstName: user.firstName,
            prescriberNPI: user.prescriberNPI,
            prescriberDEANumber: user.prescriberDEANumber,
            baselineRequests: user.baselineRequests,
            serviceDayPerWeek: user.serviceDayPerWeek,
            superUser: user.superUser,
            prescriber: user.prescriber
        }
    },

    setLogoutTimer: function(){
        if(PASTRX.practice.automaticLogoutTimer != undefined && PASTRX.practice.automaticLogoutTimer != null ) {
            PASTRX.logoutThreshold = PASTRX.practice.automaticLogoutTimer;
        }else{
            PASTRX.practice.automaticLogoutTimer = 15;
            PASTRX.logoutThreshold = 15;
        }
    },

    setRefreshTimer: function(){
        if(PASTRX.practice.automaticRefreshTimer != undefined && PASTRX.practice.automaticRefreshTimer != null ) {
            PASTRX.refreshThreshold = PASTRX.practice.automaticRefreshTimer;
        }else{
            PASTRX.practice.automaticRefreshTimer = 5;
            PASTRX.refreshThreshold = 5;
        }
    },
    
    setPageAfterSignin: function(){
        PASTRX.setLogoutTimer();
        PASTRX.setRefreshTimer();
        if(PASTRX.practice == null) {
            console.log("ERROR - PRACTICE DID NOT LOAD")
            PASTRX.practice = {};
            PASTRX.practiceId = 0;
        }
        if(PASTRX.isAdmin()){
            // console.log("\n--- --- --- --- --- --- On Admin Page\n- - - - -- ---\n- - - - -- ---")
            PASTRX.adminAfterSignin();
        } else {
            // console.log("\n--- --- --- --- --- --- On APP Page\n- - - - -- ---\n- - - - -- ---")
            PASTRX.appAfterSignin();
        }
    },

    appAfterSignin: function(){
        var req = document.querySelector('dash-panel-req-pmp');
        req.patientDataList = [];
        document.querySelector("#searchPatient").selectedItemLabel = null;
        req.loadPatientList(null);
        if(! PASTRX.isNarcFacts){
            console.log("NOT NARC FACTS")
            PASTRX.setLogo();
        }
        var p = document.querySelector('#mainpatientlist');
        p.refreshpatients(PASTRX.patientDataList);
        var ds = document.querySelector('#delegateproviderlist');
        ds.refresh();
        //Set PDF Preference
        if( PASTRX.practice.useLegacyPdf != undefined && PASTRX.practice.useLegacyPdf != null){
            console.log("Setting legacy report to: " + PASTRX.practice.useLegacyPdf);
            document.querySelector("#pmpreport").isLegacyReport = PASTRX.practice.useLegacyPdf;
            document.querySelector("#pmpReportPage").isLegacyReport = PASTRX.practice.useLegacyPdf;
        }
        //set TargetDate
        if(this.targetDate == null){
            this.targetDate = this.getDateString(new Date());
        }
        //Code for targetDate picker
        document.querySelector("#picker").date = new Date(PASTRX.targetDate);
        document.querySelector("#picker").maxDate = new Date();

        if (this.skipPatientList){
            PASTRX.setLoadingMasterDashboard();
        } else{
            //only with no selected EHR ID
            PASTRX.setPatientListPage();
        }
    },
    
    adminAfterSignin: function(){
        //Get Masqueraded user First
        if(PASTRX.masquerade != null) {
            gapi.client.pastAPI.getUserData({
                masquerade: PASTRX.masquerade
            }).execute(function (resp) {
                //This needs to be set to Masqueraded user
                if (resp.practiceAdmin != undefined) {
                    PASTRX.practiceAdmin = resp.practiceAdmin; //only practice admin can see admin controls in AdminDash
                } else {
                    PASTRX.practiceAdmin = false;
                }
                PASTRX.setAdminDashPage();
            });
        } else {
            //Do admin dash
            PASTRX.setAdminDashPage();
        }
    },

    setAdminDashPage: function(){
        if( PASTRX.userInfo.superUser == undefined || ! PASTRX.userInfo.superUser ){
            PASTRX.hideSuperUserStuff();
            if(PASTRX.isNarcFacts){
                PASTRX.hideNarcFactsStuff();
            }
        }
        document.querySelector("#app-stack").style.display   = "inline-block";
        if(PASTRX.practice.wizardProgress != undefined && PASTRX.practice.wizardProgress == -1){
            // Edit Settings (no wizard)
            PASTRX.setTitle("Administration Console: " + PASTRX.practice.practiceName);
            document.querySelector("#practiceDash").refresh();
            PASTRX.displaySuperOptions();
            document.querySelector("#practice-stack").style.display    = "none";

            if(PASTRX.practiceAdmin == null || PASTRX.practiceAdmin == false){
                PASTRX.setUserDashPage();
            }else{
                PASTRX.setPage(1);
            }
        }else{
            if(PASTRX.practiceAdmin == null || PASTRX.practiceAdmin == false){
                //non admin doesn't get practice wizard
                PASTRX.setUserDashPage(); //TODO: make user wizard?
            } else {
                var selectedPage = 0;
                if(PASTRX.practice.wizardProgress != undefined){
                    selectedPage = PASTRX.practice.wizardProgress;
                }
                //First time get wizard
                var wiz = document.querySelector("#practiceWizard");
                wiz.refresh();
                PASTRX.setTitle("Setup Wizard: " + PASTRX.practice.practiceName);
                wiz.goToPage(selectedPage);
                PASTRX.setPage(2);
            }
        }
    },

    setUserDashPage: function(){
        PASTRX.setPage(1);
        document.querySelector('#adminTabSelector').select(4); //load MyUserSettings
    },
    
    hidePracticeAdminStuff: function(){
        var adminOnlyPages = document.querySelectorAll(".adminOnly");
        for(var i = 0; i < adminOnlyPages.length; i++){
            adminOnlyPages[i].style.display = 'none'; //don't show admin only settings
        }
    },
    
    hideSuperUserStuff: function(){
        var adminOnlyPages = document.querySelectorAll(".superUserOnly");
        for(var i = 0; i < adminOnlyPages.length; i++){
            adminOnlyPages[i].style.display = 'none'; //don't show Super User Only settings
        }
    },
    
    hideNarcFactsStuff: function(){
        var adminOnlyPages = document.querySelectorAll(".narcFactsHidden");
        for(var i = 0; i < adminOnlyPages.length; i++){
            adminOnlyPages[i].style.display = 'none'; //don't show narcFacts Hidden settings
        }
        var adminOnlyPages = document.querySelectorAll(".narcFactsOnly");
        for(var i = 0; i < adminOnlyPages.length; i++){
            adminOnlyPages[i].style.display = "inline-block"; //show narcFacts Only sections
        }
    },

    setPage: function (num) {
        $("#req-button").hide();

        console.log('setPage(' + num + ')');
        $("#add-button").hide();
        $("#save-button").hide();
        $("#enable-button").hide();
        $("#disable-button").hide();
        this.resetContentHeight();
        var p = document.querySelector('#app-pages');
        p.selected = num;
    },

    getSelectedPage: function() {
        var p = document.querySelector('#app-pages');
        return p.selected ;
        },


    setPracticePage: function () {
        PASTRX.setTitle("Practice Administration");
        $("#list-stack").css("display", "inline-block").prop("hidden", false);

        PASTRX.setPage(15);

    },

    setAdminPage: function () {
        PASTRX.setTitle("Administration");

        PASTRX.setPage(8);
        var p = document.querySelector('past-admin');
        p.refresh();

        $("#save-button").show();
        $("#enable-button").show();
        $("#disable-button").show();
    },

    setLoadingPage: function () {
        PASTRX.setPage(4);
    },

    setSelectedPrescriptionPage: function (alert) {
        var p = document.querySelector('past-selected-prescriptions');
        var gantt = p.querySelector("#gantt");
        gantt.provlabels = false;
        gantt.pharmlabels = false;
        if(alert != undefined){
            p.setAttribute("titlename",alert.typeString);
            gantt.alert = alert;
            var ganttSort = "";
            var alertType    = alert.alertType;
            var alertSubType = alert.alertSubtype;
            if (alertSubType == undefined){
                alertSubType = "";
            }

            if(alertType == "PrivatePay" || alertType == "WriteFillGap" || alertType == "HighDose" || alertType == "UnexpectedPatient" || alertType == "LabTestDiscrepancy" || alertType == "Identical"){
                ganttSort = "standard"
            }else if(alertSubType == "Pharmacy" ){
                ganttSort = "pharmacy";
            } else if (alertSubType == "Prescriber" || alertType == "NotOurPrescription" || alertType == "MultiplePrescribers") {
                ganttSort = "prescriber";
            }
            if(ganttSort == "prescriber") {
                gantt.provlabels = true;
            }
            if(ganttSort == "pharmacy") {
                gantt.pharmlabels = true;
            }
        }else{
            gantt.alert = {};
        }


        p.refreshprescriptions();
        //PASTRX.setPage(12);
        p.open();
    },

    setPMPRequestPage: function () {  // replaces setAddPatientPage
        // document.querySelector("#download-stack").style.display   = "none";
        document.querySelector("#print-stack").style.display   = "none";
        PASTRX.setTitle("Submit PMP Request");
        var p = document.querySelector('dash-panel-req-pmp');
        p.refresh();
        PASTRX.setPage(5);
    },

    setSuperPage: function () {
        document.querySelector("#super-stack").style.display   = "none";
        document.querySelector("#actives-stack").style.display = "none";
        document.querySelector("#note-stack").style.display = "none";
        //document.querySelector("#encounters-stack").style.display = "none";
        document.querySelector("#print-stack").style.display   = "none";
        // document.querySelector("#download-stack").style.display   = "none";
        document.querySelector("#list-stack").style.display    = "inline-block";
        var p = document.querySelector('dash-panel-super');
        p.refresh();

        PASTRX.setPage(6);
    },

    setSuperAdminPage: function () {
        PASTRX.setTitle("Super User Administration Console " );
        document.querySelector("#super-stack").style.display   = "none";
        document.querySelector("#practice-stack").style.display    = "inline-block";
        var p = document.querySelector('admin-panel-super');
        p.refresh();
        PASTRX.setPage(6);
    },

    checkBrowser: function () {
        var ua = "User-agent header sent: " + navigator.userAgent;
        // console.log("ua("+ua+")");
        if ( ua.indexOf("Chrome") > -1 ) {
            // console.log("OK - "+ua);
        }
        else if ( ua.indexOf("Safari") > -1 ) {
            // console.log("OK - "+ua);
        }
    },

    checkForEncounterStart: function() {
        PASTRX.setMasterDashboardPage();

        $("#start-review-button").show();
        $("#start-encounter-button").show();
        $("#end-encounter-button").hide();
        $("#no-action-encounter-button").show();

        $("#prescribed-question").hide();
        $("#expected-question").hide();
        $("#affected-question").hide();



        if ( PASTRX.practice.checkForEncounterStart == true ) {

            // TODO: Open Encounter Control Page Here?
            document.querySelector('past-encounter-controls').open();
            
            //document.querySelector('#drawer').openDrawer();
            }
        else {
            gapi.client.pastAPI.startEncounter({
                'appointmentId': PASTRX.selectedApptid
            }).execute(function (resp) {
                console.log("Encounter Started:"+resp);
            });
        }
    },

    checkForEncounterEnd: function() {
        console.log('ending patient encounter');

        if(PASTRX.canPushNotes){
            if(PASTRX.patientNotes.length == 0){
                PASTRX.popupNotes();
            }
        }
        
        $("#start-review-button").hide();
        $("#start-encounter-button").hide();
        $("#end-encounter-button").show();
        $("#no-action-encounter-button").show();

        var el = document.querySelector("#alerts");
        el.closeMenu();

        if ( PASTRX.appointmentId != null && PASTRX.appointmentId != undefined ) {
            if (PASTRX.practice.checkForEncounterEnd == true) {
                PASTRX.setPatientListPage();

                // TODO: OPEN THE ENCOUNTER CONTROL PAGE HERE?
                document.querySelector('past-encounter-controls').open();
                //document.querySelector('#drawer').openDrawer();

                if ( PASTRX.practice.askIfPrescribedAtEncounterEnd == true ) {
                    $("#prescribed-question").show();
                }
                else {
                    $("#prescribed-question").hide();
                }
                if ( PASTRX.practice.askIfExpectedAtEncounterEnd == true ) {
                    $("#expected-question").show();
                }
                else {
                    $("#expected-question").hide();
                }
                if ( PASTRX.practice.askIfAffectedAtEncounterEnd == true ) {
                    $("#affected-question").show();
                }
                else {
                    $("#affected-question").hide();
                }
            }
            else {
                PASTRX.setPatientListPage();
                gapi.client.pastAPI.endEncounter({
                    'appointmentId': PASTRX.selectedApptid
                }).execute(function (resp) {
                    console.log("Encounter Ended:" + resp);
                });
            }
        } else {
            console.log("No appointmentId. Batch printing reports?");
            PASTRX.setPatientListPage();
        }

    },

    startEncounter: function(event) {
        gapi.client.pastAPI.startEncounter({
            'appointmentId': PASTRX.selectedApptid
        }).execute(function (resp) {
            console.log("Encounter Started:"+resp);
        });

        // Close The Encounter Control Page
        document.querySelector('past-encounter-controls').close();
        //document.querySelector('#drawer').closeDrawer();
        
        PASTRX.setMasterDashboardPage();
    },

    endEncounter: function(event) {
        gapi.client.pastAPI.endEncounter({
            'appointmentId': PASTRX.selectedApptid
        }).execute(function (resp) {
            console.log("Encounter Ended:"+resp);
        });

        // Close The Encounter Control Page
        document.querySelector('past-encounter-controls').close();
        
        //document.querySelector('#drawer').closeDrawer();
    },

    startReview: function(event) {
        console.log("Review Started");

        // Close The Encounter Control Page
        document.querySelector('past-encounter-controls').close();
        
        //document.querySelector('#drawer').closeDrawer();
        PASTRX.setMasterDashboardPage();
    },

    noEncounterAction: function(event) {
        console.log("No Action");
        
        // Close The Encounter Control Page
        document.querySelector('past-encounter-controls').close();

        //document.querySelector('#drawer').closeDrawer();
    },

    hasExpectedPatient: function(expectedPat, patientList){
        for(var i = 0; i < patientList.length; i++){
            var pat = patientList[i];
            var patString = pat.patientFirst.trim() + " " + pat.patientLast.trim() + " " + pat.dobString;
            if(expectedPat.toUpperCase == patString.toUpperCase){
                return true;
            }
        }
        return false;
    },
    
    statusesAreFinalState: function (patientList) {
        // Final States are "Ready" "NO DATA" "ERROR Processing" and "ERROR Analyzing"  other states are still loading/processing
        var allFinal = true;
        for (var i = 0; i < patientList.length; i++) {
            var pat = patientList[i];
            var status = pat.processingStatus;
            if ((status == undefined || status == null) && pat.metadata != undefined) {
                status = pat.metadata.apptProcessingStatus;
            }
            if (status != "Ready" &&
                status != "NO DATA" &&
                status != "ERROR Processing" &&
                status != "ERROR Analyzing"
            ) {
                console.log(pat.patientLast + " " + pat.patientFirst + " has status: " + status);
                allFinal = false;
            }
            
        }
        return allFinal;
    },

    autoRefreshPatientList: function(patientNameDOB, maxRetries){
        console.log("Auto Refreshing Patient List Data");
        if(maxRetries < 0){
            console.log("No More Retries.  Auto Refresh has timed out")
            return;
        } else {
            console.log("Max Retries: " + maxRetries);
        }
        if(patientNameDOB != null){
            console.log("Adding: " + patientNameDOB + " to outstanding patients");
            PASTRX.outstandingPatients.push(patientNameDOB);
            // console.log(PASTRX.outstandingPatients);
        }
        PASTRX.patientDataList = null; //clear list
        function afterLoad() {
            console.log("Handling check for outstanding patients...");
            var stillOutstandingPatients = [];
            for(var i = 0; i < PASTRX.outstandingPatients.length; i++){
                var expectedPatient = PASTRX.outstandingPatients[i];
                if(PASTRX.hasExpectedPatient(expectedPatient, PASTRX.patientDataList)){
                    console.log("Found Expected Patient: " + expectedPatient);
                } else {
                    console.log(expectedPatient + " NOT in Patient List");
                    stillOutstandingPatients.push(expectedPatient);
                }
            }
            PASTRX.outstandingPatients = stillOutstandingPatients;
            if(PASTRX.outstandingPatients.length == 0){
                //Appointment found for all expected patients, but some may still be processing.
                console.log("Appointment found for all patients: Checking statuses");
                // Check statuses
                if(! PASTRX.statusesAreFinalState(PASTRX.patientDataList)){
                    console.log(" Some Patients NOT  IN FINAL state, Refresh in 5s");
                    setTimeout(function(){ PASTRX.autoRefreshPatientList(null, maxRetries - 1) }, 5000);
                    return;
                }
            } else {
                console.log("Patients are still outstanding.  Refreshing in 5s");
                setTimeout(function(){ PASTRX.autoRefreshPatientList(null, maxRetries - 1) }, 5000);
                return;
            }
            //All expected patients have appointments AND all appointments in a final state.
            console.log("All Expected patients in final state!");
    
    
            //Update remove-patient-list
            document.querySelector('#removePatientControls').updateRemoveCheckBox();
            document.querySelector('#removePatientControls').close();
        };
        var p = document.querySelector('#mainpatientlist');
        p.loadPatientData(afterLoad);
    },

    validateSpecialty : function(specialty){
        if(specialty == undefined || specialty == null){ return false; }
        var spec_list = [   "1223",  "175F00000X", "363L", "152W", "1835P0018X", "207", "208", "213E",
            "363A", "103T", "174M00000X", "1835", "3336", "183700000X", "183500000X", "174400000X" ]; // TODO: 1744 only allowed in CA.
        for(var s in spec_list){
            if(specialty.lastIndexOf(spec_list[s], 0) === 0){
                return true;
            }
        }
        return false;
    },

    refreshPatientListPage: function () {
        PASTRX.patientDataList = null;
        PASTRX.setPatientListPage();
    },
    
    navigateToAdmin: function(){
        var curr = window.location.href.toLowerCase();
        console.log(curr);
        var admin = "";
        if(curr.indexOf("pastrxapp") != -1){
            admin = curr.replace("pastrxapp","pastrxadmin");
        }else if(curr.indexOf("narcfactsapp") != -1){
            admin = curr.replace("narcfactsapp","narcfactsadmin");
        }
        console.log(admin);
        window.location.href = admin;
    },
    
    navigateToApp: function(){
        var curr = window.location.href.toLowerCase();
        console.log(curr);
        var app = "";
        if(curr.indexOf("pastrx") != -1){
            app = curr.replace("pastrxadmin","pastrxapp");
        }else if(curr.indexOf("narcfacts") != -1){
            app = curr.replace("narcfactsadmin","narcfactsapp");
        }
        console.log(app);
        window.location.href = app;
    },
    

    setPatientListPage: function () {
        PASTRX.setLoadingPage();
        PASTRX.clearSelectedData();
        PASTRX.setPatientPhoto();
        PASTRX.hidePatientPhoto();

        PASTRX.setTitle("Patients for: " + this.targetDate);
        PASTRX.setProvider("");
        
        //IE10 Compatibility
        PASTRX.displaySuperOptions();

        document.querySelector("#targetdate-stack").style.display   = "inline-block";
        document.querySelector("#refresh-stack").style.display   = "inline-block";
        document.querySelector("#admin-stack").style.display   = "inline-block";
        document.querySelector("#actives-stack").style.display = "none";
        document.querySelector("#note-stack").style.display = "none";
        //document.querySelector("#encounters-stack").style.display = "none";
        document.querySelector("#list-stack").style.display    = "none";
        document.querySelector("#print-stack").style.display   = "none";
        // document.querySelector("#download-stack").style.display   = "inline-block";
        document.querySelector("#feedback-stack").style.display   = "inline-block";
        document.querySelector("#remove-stack").style.display   = "inline-block";
    
        // only display PDF download if allowed
        if(PASTRX.practice.noDelegatePDFDownloads != undefined && PASTRX.practice.noDelegatePDFDownloads == true){
            console.log("Practice configured so delegates may not download PDF reports")
            if(PASTRX.userInfo.prescriber)
                document.querySelector("#pdf-batch-stack").style.display   = "inline-block";
        }else{
            document.querySelector("#pdf-batch-stack").style.display   = "inline-block";
        }
        
    
        var p = document.querySelector('#mainpatientlist');
        function afterLoad() {
            PASTRX.setPage(1);
            $("#req-button").show();
        };
        p.loadPatientData(afterLoad);
        this.checkIfUserDelegate(); //TODO: Only do once.
    },
    
    checkIfUserDelegate: function(){
        var isADelegate;
        if (this.delegators != [] && this.delegators.length > 0) {
            isADelegate = true;
        } else {
            isADelegate = false;
        }
        document.querySelector("#mainpatientlist").setSeePatients(isADelegate);
    },
    
    setAddPatientPage: function () {
        PASTRX.setTitle("Submit PMP Request");
        PASTRX.setPage(5);
    },
    setAssessmentPage: function () {
        var p = document.querySelector('past-assessment');

        PASTRX.setTitle("Assessment Tools");
        PASTRX.setPage(9);
        p.refreshCageAid();
        p.refreshCRAFFT();

    },

    setMonitorPage: function () {
        PASTRX.setTitle("PastRx Monitor");
        PASTRX.setLoadingPage();
        gapi.client.pastAPI.listMonitor({'filter': 'ALL'}).execute(function (resp) {
            console.log(resp);

            var p = document.querySelector('past-monitor-list');
            p.refreshMonitor(resp.items);

            PASTRX.setPage(10);
        });
    },

    /**
     *
     * Patient Photo
     *
     *
     */

    hidePatientPhoto: function() {
        document.querySelector("#patient-photo").style.display = "none";
    },

    showPatientPhoto: function() {
        document.querySelector("#patient-photo").style.display = "inline-block";
    },
    
    setPatientPhoto: function () {
        var url = "/image?" ;
        var querystring = "";
        if ( PASTRX.selectedPhotoId != null && PASTRX.selectedPhotoURLString == null ) {
            querystring = querystring +  "id=" + PASTRX.selectedPhotoId;
            if(PASTRX.selectedPid != null){
                querystring = querystring + "&";
            }
        }
        if(PASTRX.selectedPid != null){
            querystring = querystring + "patId" + PASTRX.selectedPid;
        }
        var p = document.querySelector('#patient-photo');
        p.src = url + querystring;
    },

    displaySuperOptions: function() {
        if ( PASTRX.superUser ) {
            document.querySelector("#super-stack").style.display   = "inline-block";
        }
        else {
            document.querySelector("#super-stack").style.display   = "none";
        }
    },



    /**
     *
     * Dashboard
     *
     *
     */

    setLoadingMasterDashboard: function(){
        var p = document.querySelector('#dashboard');
        p.setIcons();
        p.setLoading();
        PASTRX.setTitle("Loading Patient Data...");
        PASTRX.setPage(2);
        PASTRX.checkLoadingMasterDashboard();
    },
    
    checkLoadingMasterDashboard: function(){
        console.log("checkLoadingMasterDashboard()")
        var p = document.querySelector('#dashboard');
        if(PASTRX.dashboardDoneLoading){
            console.log("dashboard done loading");
            p.showLoadingStatus = false;
            if(p.loadingStatus == "Ready"){
                PASTRX.setMasterDashboardPage();
            }else{
                console.log("dashboard status: " + p.loadingStatus);
            }
            return;
        }
        console.log("dashboard NOT done loading")
        if(!p.readyForDisplay()){
            console.log("#dashboard is not readyForDisplay()");
            console.log("Waiting for Patient Data: " + PASTRX.waitingForPatientData + "p.athenapatId: " + p.athenaPatId);
            if(PASTRX.waitingForPatientData || p.athenaPatId == undefined || p.athenaPatId == null) { //TODO: what is this if/else?
                console.log("Patient Data Not Loaded.  waiting for Response...")
                setTimeout(function () {
                    PASTRX.checkLoadingMasterDashboard();
                }, 2000);
                return;
            }else{
                PASTRX.checkPatientStatus(p.athenaPatId,null);
                console.log("Patient Data Not Loaded.  Rechecking Status...")
                setTimeout(function () {
                    PASTRX.checkLoadingMasterDashboard();
                }, 1000);
                return;
            }
        }
        console.log("Stop Showing Loading Status...")
        p.showLoadingStatus = false;
        PASTRX.setMasterDashboardPage();
    },
    
    setMasterDashboardPage: function () {
        var p = document.querySelector('#dashboard');
        p.setIcons();
        PASTRX.setPage(2);
        PASTRX.setPatientPhoto();
        PASTRX.showPatientPhoto();
        PASTRX.setTitle(PASTRX.selectedName, PASTRX.selectedDOB);
        PASTRX.setProvider("Provider: " + PASTRX.providername);
        p.refreshDashboard();
    },

    setMapPage: function () {
        PASTRX.setPage(3);
        var c = document.querySelector('#content-area');
        var p = document.querySelector('#big-map');
        p.reheight(c.offsetHeight) ;
        p.refresh();
        p.fitToMarkers();

    },

    setPMPReportPage: function () {
        PASTRX.setPage(7);
        var p = document.querySelector('#pmpReportPage');
        p.resize();
    },

    prescriptionMatch: function (script1, script2) {
        if (script1.pastDrugKey == script2.pastDrugKey) {
            if (script1.writtenDateString == script2.writtenDateString) {
                if (script1.prescriber.firstName == script2.prescriber.firstName) {
                    if (script1.prescriber.lastName == script2.prescriber.lastName) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    toggleHelpScreen: function () {
        console.log("Click -- toggleHelpScreen");
        var pageNumber = document.querySelector('core-animated-pages').selected;
        //make separate help-screen-pages for each page.
        if (pageNumber == 6) {
            document.getElementById("help-screen-sadash").toggle();
        }

    },

    selectActivesInCanvas: function(event, m){
        if(PASTRX.PASTReport != undefined) {
            var totalOffsetX = 0;
            var totalOffsetY = 0;
            var canvasX = 0;
            var canvasY = 0;
            var currentElement = m;
            console.log("EVENT: " + event);
            do {
                totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
                totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
            }
            while (currentElement = currentElement.offsetParent)
            console.log("OFFSET: " + totalOffsetX);
            canvasX = event.pageX - totalOffsetX - document.body.scrollLeft;
            canvasY = event.pageY - totalOffsetY - document.body.scrollTop;

            var selectedDate = PASTRX.getDayFromCanvasCoordinate(m, canvasX);
            console.log("Clicked on day: " + selectedDate.toString());
            PASTRX.selectPrescriptionsOnDate(selectedDate);
        } else {
            console.log("SELECTACTIVESERROR: The PASTReport was not yet loaded")
        }
    },
    
    popupNotes: function(){
        var p = document.querySelector('past-chart-note');
        p.setAttribute("titlename","Add Chart Notes");
        p.setAttribute("appointmentid", PASTRX.appointmentId);
        p.open();
    },
    
    selectActivePrescriptions: function(){
        var activeDate = new Date();
        if (PASTRX.targetDate != null){
            activeDate = new Date(PASTRX.targetDate);
        }
        PASTRX.selectPrescriptionsOnDate(activeDate);
    },
    
    selectPrescriptionsOnDate: function(selectedDate){
        if(PASTRX.PASTReport != undefined && PASTRX.PASTReport.prescriptions != undefined) { //Check both for patients with no PMP(no prescriptions)
            PASTRX.selectedPrescriptionsDate = selectedDate;
            PASTRX.selectedPrescriptions = [];
            for (var i = 0; i < PASTRX.PASTReport.prescriptions.length; i++) {
                var script = PASTRX.PASTReport.prescriptions[i];
                // Fix for time zone offsets
                var year = new Date(script.fillDate).getFullYear();
                var fillDate = new Date(script.fillDateString + " " + year); //makes sure to get the correct date ie(Aug 11)
                if (selectedDate < fillDate) {
                    continue;
                }
                var endDate = new Date(script.fillDateString + " " + year);
                endDate.setDate(fillDate.getDate() + script.prescribedLen - 1 ); // Assume we take medicine the day it is prescribed.
                if (selectedDate > endDate) {
                    continue;
                }
                //console.log(script.displayName + " \nFILL: " + fillDate.toString() + " \nEND: " + endDate.toString() + " \nLen: " + script.prescribedLen);
                PASTRX.selectedPrescriptions.push(script);
            }
            var p = document.querySelector('past-selected-prescriptions');
            p.setAttribute("titlename","Active Prescriptions on: " + PASTRX.getDateString(selectedDate));
            PASTRX.setSelectedPrescriptionPage();
        } else {
            console.log("SELECTPRESCRIPTIONERROR: The PASTReport was not yet loaded")
        }
    },

    setAlertsPage: function () {
        PASTRX.setPage(12);
        var p = document.querySelector('#past-alerts-page');
        p.refresh();
    },

    setTestsPage: function () {
        PASTRX.setPage(13);
        var p = document.querySelector('#past-test-page');
        p.refresh();
        p.resetHeight();
        },

    setEncountersPage: function () {
            PASTRX.setPage(14);
            var p = document.querySelector('#past-encounters-page');
            //console.log("REFRESH ENCOUNTER PAGE " +  PASTRX.practice.usesEHRIntegration);
            p.refresh();
    },

    mapPrescriptionsByID: function (){
        if(PASTRX.scriptMap == null) {//only have to do once per patient
            PASTRX.scriptMap = {};
            for (var i = 0; i < PASTRX.PASTReport.prescriptions.length; i++) {
                var script = PASTRX.PASTReport.prescriptions[i];
                PASTRX.scriptMap[script.id] = script;
            }
        }
    },

    showSelectedPrescriptions: function(selectedDate, selectedPrescriptions){
        PASTRX.selectedPrescriptionsDate = selectedDate;
        PASTRX.selectedPrescriptions = selectedPrescriptions;
        var p = document.querySelector('past-selected-prescriptions');
        p.setAttribute("titlename","Prescriptions Associated With Alert");
        PASTRX.setSelectedPrescriptionPage();
    },

    getDaysBetween: function(date1, date2) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        return Math.round(difference_ms / one_day);
    },
    resetContentHeight: function(){
        //have to do this because IE10 does not adjust height the same as chrome for scrolling.
        var headHeight = $("#main-toolbar").outerHeight();
        var footHeight = $("#footer").outerHeight();
        var windowHeight = $(window).height();
        var appPagesHeight = windowHeight - footHeight - headHeight - 30; //the 30 is to account for padding
        document.querySelector("#app-pages").style.height = appPagesHeight + "px";
        //make fullpage panels fit in the appPage height
        var fullPageHeight = appPagesHeight;
        var fullPagePanels = document.querySelectorAll(".fullpage");
        for(var i = 0; i < fullPagePanels.length; i++){
            fullPagePanels[i].style.height = fullPageHeight + "px";
        }
        var reqButton = document.querySelector("#req-button");
        if(reqButton != null){
            reqButton.style.top = ($(window).height() - footHeight - 60) + 'px' ;
        }
    },

    setupFeedbackButton: function(){
        if(!window.jQuery){
            console.log("Waiting for jQuery to load");
            setTimeout();
        }else{
            console.log("Setting up feedback button");
            if(PASTRX.isNarcFacts){
                jQuery.ajax({
                    url: "https://pastco.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/-p6r7zz/b/5/e73395c53c3b10fde2303f4bf74ffbf6/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=c673f724",
                    type: "get",
                    cache: true,
                    dataType: "script"
                });
            }else{
                jQuery.ajax({
                    url: "https://pastco.atlassian.net/s/6d491891786c7149f0ca788a4aaa5c8f-T/en_USa3mwsx/65000/8/1.4.25/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=51a31d4a",
                    type: "get",
                    cache: true,
                    dataType: "script"
                });
            }

            console.log("feedback init");
            window.ATL_JQ_PAGE_PROPS =  {
                "triggerFunction": function(showCollectorDialog) {
                    console.log("feedback trigger");
                    PASTRX.showCollectorDialog = showCollectorDialog ;
                }};
        }
    },

    printReport: function(){
        var drawerPanel     = document.querySelector('paper-drawer-panel');
        var printerFriendly = document.querySelector('past-printer-friendly')
        drawerPanel.style.display = "none";
        printerFriendly.style.display = "inherit";
        document.body.style.backgroundColor = "white";
        printerFriendly.refresh();
        setTimeout(function() {
            window.print();
            drawerPanel.style.display = "inherit";
            printerFriendly.style.display = "none";
            document.body.style.backgroundColor = "#1c3944";
            var dash = document.querySelector("#dashboard");
            dash.refreshDashboard();
        }, 2000);
    },

    //TODO: Deprecate this.
    saveAsPDF: function(filename, blobString){ //blobString is the blob in myResponseObject
        if(navigator.msSaveBlob){
            //IE10
            blob = PASTRX.b64toBlob(blobString, 'application/pdf')
            navigator.msSaveOrOpenBlob(blob, filename)
        }else{
            var element = document.createElement('a');
            element.setAttribute('href', 'data:application/pdf;base64,' + encodeURIComponent(blobString));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    },

    isSafari: function(){
        var is = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        return is;
    },

    isIE11: function(){
        var is = !!window.MSInputMethodContext && !!document.documentMode;
        return is;
    },

    downloadPastReport: function(appointmentId){
        if(appointmentId == null || appointmentId == undefined){
            console.log("Selected Appointment ID: " + PASTRX.appointmentId);
            appointmentId = PASTRX.appointmentId;
        }
        var element = document.createElement('a');
        var url = '/pastreport?appointmentId='+appointmentId+'&masquerade='+PASTRX.masquerade+'&targetDate='+PASTRX.targetDate +'&Authorization='+PASTRX.auth_token;
        console.log(url);

        if(PASTRX.isSafari() || PASTRX.isIE11()) {
            // Open New Tab
            console.log("Open PDF In New Tab/Window");
            var win = window.open(url, '_blank');
            win.focus();
        }else{
            // Call Download
            element.setAttribute('href', url);
            var filename = 'PastRxReport';
            if(PASTRX.isNarcFacts){
                filename = 'NarcFactsReport';
            }
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    },
    
    b64toBlob: function(b64Data, contentType, sliceSize) {
        //Used to create blob on IE10
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    },

    saveCensusReport: function(fileName){
        gapi.client.pastAPI.censusGetPDF({
            'fileName': fileName
        }).execute(function (resp) {
            if(resp.success){
                console.log(resp.message);
                PASTRX.saveAsPDF("CensusReport.pdf", resp.blob);
                PASTRX.censusReport = resp.censusReport;
            }else{
                console.warn("Bad Census Response: " + resp);
            }
        });
    },

    setPDFPage: function(loadAllPatients){
        var pdfPage = document.querySelector("#pdfPage");
        pdfPage.setLoadingImage();
        if(loadAllPatients){
            pdfPage.loadAllPDFReports(true);
        } else {
            pdfPage.loadSinglePDFReport(true);
            //TODO: add button back to dashboard?
        }
        document.querySelector("#super-stack").style.display      = "none";
        document.querySelector("#targetdate-stack").style.display    = "none";
        document.querySelector("#refresh-stack").style.display    = "none";
        document.querySelector("#admin-stack").style.display    = "none";
        document.querySelector("#actives-stack").style.display    = "none";
        document.querySelector("#note-stack").style.display    = "none";
        //document.querySelector("#encounters-stack").style.display = "none";
        document.querySelector("#print-stack").style.display      = "none";
        // document.querySelector("#download-stack").style.display   = "none";
        document.querySelector("#list-stack").style.display       = "inline-block";
        PASTRX.setPage(17);
        pdfPage.refresh();
    },

    showPageAfterLoading: function(){
        console.log("Showing page");
        //document.querySelector("#drawer").style.display = "inherit";
        document.querySelector("#circleIconSet").style.display = "inherit";
        // document.querySelector("#practiceDialog").style.display = "inherit";
        // document.querySelector("#help-dialog").style.display = "inherit";

    },
    
    validateDateMMDDYYYY: function (date) {
        var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
        if(date_regex.test(date)){
            //check for months
            var MM = date.substring(0,2);
            var DD = date.substring(3,5);
            if(MM == "02"){
                if(DD == "30" || DD == "31"){
                    return false;
                }
            } else if(MM == "09" || MM == "04" || MM == "06" || MM == "11" ) {//30 days has September, April, June and November
                if(DD == "31"){
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    
    st2: function(f){
        return !f ? [] :
            this.st2(f.caller).concat([f.toString().split('(')[0].substring(9) + '(' + f.arguments.join(',') + ')']);
    },
    
    printStack: function() {
        try{
            console.log(this.st2(arguments.callee.caller));
        }catch(err) {
            console.log(err);
            console.log("Error trying to print stack trace :(")
        }
    },
    
    // Show Encounter Controls Overlay
    selectEncounterControls: function(){
        var p = document.querySelector('past-encounter-controls');
        //alert(p.tagName);
        //p.refreshprescriptions();

        p.open();
        
    },
    
    patientHasNoData: function(patient){
        if(patient.metadata != undefined && patient.metadata.apptProcessingStatus != undefined) {
            if (patient.metadata.apptProcessingStatus == "Ready") {
                return true;
            }
        }
        return false;
    }

};
