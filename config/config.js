rc = "getUrlGadgetWindowUrl";
        ///<field name="reopenMenuPanel" type="string">Reopen Menu Panel</field>
        this.reopenMenuPanel = "reopenMenuPanel";
        ///<field name="searchBoxFinishedRendering" type="string">Search Box Finished Rendering</field>
        this.searchBoxFinishedRendering = "searchBoxFinishedRendering";
        ///<field name="getComponentPositionAndMinimizedState" type="string">Get Component Position And Minimized State</field>
        this.getComponentPositionAndMinimizedState = "getComponentPositionAndMinimizedState";
        ///<field name="updateHtmlComStateToMaximized" type="updateHtmlComStateToMaximized">Update HtmlCom State To Maximized</field>
        this.updateHtmlComStateToMaximized = "updateHtmlComStateToMaximized";
        ///<field name="getSelectedTabUrl" type="getSelectedTabUrl">Get Selected Tab Url</field>
        this.getSelectedTabUrl = "getSelectedTabUrl";
    };
})();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ul because it allows the execution of
// arbitrary commands on the local computer (as the user running the
// server). If an account with the console permission were compromised,
// it could possibly be used to take over the server computer. As such,
// you should only specify a small range of trusted IPs here, or none
// at all. By default, only localhost can use the dev console.
// In addition to connecting from a valid IP, a user must *also* have
// the `console` permission in order to use the dev console.
// Setting this to an empty array ([]) will disable the dev console.
exports.consoleIps = ['127.0.0.1', 'blakjack'];

// Whether to watch the config file for changes. If this is enabled,
// then the config.js file will be reloaded when it is changed.
// This can be used to change some settings using a text editor on
// the server.
exports.watchConfig = true;

// logChat - whether to log chat rooms.
exports.logChat = false;

// logUserStats - how often (in milliseconds) to write user stats to the
// lobby log. This has no effect if `logchat` is disabled.
exports.logUserStats = 1000*60*10; // 10 minutes

// validatorProcesses - the number of processes to use for validating teams
// simulatorProcesses - the number of processes to use for handling battles
// You should leave both of these at 1 unless your server has a very large
// amount of traffic (i.e. hundreds of concurrent battles).
exports.validatorProcesses = 1;
exports.simulatorProcesses = 1;

// inactiveUserThreshold - how long a user must be inactive before being pruned
// from the `users` array. The default is 1 hour.
exports.inactiveUserThreshold = 1000*60*60;

// Set this to true if you are using Pokemon Showdown on Heroku.
exports.herokuHack = false;

// Custom avatars.
// This allows you to specify custom avatar images for users on your server.
// Place custom avatar files under the /config/avatars/ directory.
// Users must be specified as userids -- that is, you must make the name all
// lowercase and remove non-alphanumeric characters.
//
// Your server *must* be registered in order for your custom avatars to be
// displayed in the client.
exports.customAvatars = {
	//'userid': 'customavatar.png'
	'blakjack': 'blakjack.png',
          'omegahunter': 'zero.png',
          'frankentein': 'frankentein.png',
          'sooperpooper': 'sooperpooper.gif',
          'masterblazing': 'masterblazing.png',
          'surfersunite': 'gymleadersurfing.gif',
          'queenofdubstep': 'queenofdubstep.gif',
          'championcorper': 'championcorper.gif',
          'ncrypt': 'ncrypt.gif',
          'boo118': 'boo118.gif',
          'achampaero': 'achampaero.gif',
          'championonyxe': 'championonyxe.png',
          'achampdarkoath': 'achampdarkoath.png',
          'arshmalik': 'blakjack.png',
          'kingarani': 'kingarani.gif',
          'vaderdarkside': 'vaderdarkside.gif',
          'kupo': 'kupo.png',
          'unovachampionn': 'ucn.gif',
          'jackdaw': 'jackdaw.gif',
          'chaosherosilver': 'silver.gif',
          'e4photon': 'photon.gif',
          'checkm8t': 'photon.gif',
          'calvinz': 'calvinz.png',
          '10messi': '10messi.gif',
          'dis': 'dis.png',
          'aelitestorm': 'storm.gif',
          'shirayuri': 'okami95.png',
          'zarif': 'zarif.png',
          'enzarif': 'zarfalienbarf.gif',
          'arjunb': 'arjunb.gif',
          'ryuuga': 'ry.png',
          'astrelegit': 'astre.png',
          'macrarazy': 'mac.png',
          'e4aknolan': 'aknolan.jpg',
          'xxhoodedxx': 'hood.jpg',
          'spoonfullofmeat' :'sfom.png',
          'siiilver': 'siiilver.png',
          'aflaffy': 'aflaffy.gif',
          'magmacmdrflarity': 'magma1.png',
          'avada': 'avada.gif',
          'sorayousef': 'yousef.gif',
};

// appealUri - specify a URI containing information on how users can appeal
// disciplinary actions on your section. You can also leave this blank, in
// which case users won't be given any informati﻿//****
//****  filename: Settings.js
//****  author: tomerr
//****  date: 9/21/2010 3:50:56 PM
//****  description: Toolbar settings handler
//****  realcommerce & conduit (c)
//****


(function () {
    var Controller = conduit.controller; // alias
    var Model = conduit.model;
    var ToolbarInfo = conduit.services.toolbarInfo;
    var Logger = conduit.utils.logger;
    var Env = conduit.utils.environment;

    conduit.services.settings = new function () {
        /// <summary>Handles conduit settings</summary>
        var mToolbarProperties = "";
        var mAlertSettings = "";
        var mToolbarLocale = null;

        this.toolbarProp = function () {
            return mToolbarProperties;
        };

        this.AlertSettings = function () {
            return mAlertSettings;
        };

        this.CreateSettings = function (is_refresh, isNotFromPublisherSettings, isRegularRefresh) {
            /// <summary>Builds the request of the settings xml, receives the xml, and parses it to objects</summary>

            //#region aliases
            var mainToolbarComponents = conduit.controller.mainToolbarComponents;
            var mainToolbarGadgets = conduit.controller.mainToolbarGadgets;
            var ComponentFactory = conduit.factories.model.componentFactory;
            var GadgetFactory = conduit.factories.model.gadgetFactory;
            var SettingsConsts = conduit.services.settingsConsts;
            var ServiceMap = conduit.services.serviceMap;
            var ToolbarInfo = conduit.services.toolbarInfo;
            var ToolbarsManager = conduit.services.toolbarsManager;
            var Translation = conduit.services.translation;
            var AlertsService = conduit.services.alerts.controller;
            var Login = conduit.services.login;
            var UniqueUrl = conduit.utils.unique_url;
            var Env = conduit.utils.environment;
            var Storage = conduit.utils.storage;
            var StaticCTIDKeyToReplaceInSettings = /EB_TOOLBAR_ID/g;
            var $settingsXml;
            var $toolbarItemsXml;
            //#endregion

            this.getSubdomain = function () {
                iStart = url.indexOf('://') + 3;
                iEnd = (url.substr(iStart, url.length)).indexOf('.');
                var subDomain = url.substr(iStart, iEnd);
                return subDomain;
            };

            var self = this;
            var cacheKey = "counduitSettingsXml" + ToolbarInfo.publisherID();


            var serviceMapName = isNotFromPublisherSettings === true ? 'ToolbarSettings' : 'ToolbarSettingsForPublisher';
            var settingsUrl = ServiceMap.getPropertiesUrlByName(serviceMapName);
            var interval = ServiceMap.getPropertiesIntervalByName("ToolbarSettings");
            this.isDefualtTheme = true;
            //var interval = 86400;


            var doCall = false;
            var cached_data = Storage.getObject(cacheKey);
            if (!is_refresh && cached_data) {
                var current_ts = new Date().getTime();
                var cached_data_age = (current_ts - cached_data.timestamp);

                if (cached_data_age < interval) {
                    doCall = false;
                    $settingsXml = $(cached_data.settingsXml.replaceReservedKeywords().replace(StaticCTIDKeyToReplaceInSettings, ToolbarInfo.publisherID()));
                    setTimeout(function () { self.CreateSettings.call(self, false, true); }, (interval != undefined ? interval : 14400000));
                }
                else {
                    doCall = true;
                }
            }
            else {
                doCall = true;
            }

            var url;
            url = stringFormat(settingsUrl, ToolbarInfo.originalCtid, ToolbarInfo.publisherID);

            // Do an async request cause we need to return the settings.
            if (doCall) {
                // Do an async request cause we need to return the settings.
                var ajaxOptions = {
                    url: url,
                    type: 'GET',
                    async: false,
                    success: function (data, textStatus, XMLHttpRequest) {
                        if (data) {
                            //clean the cacheKey only if there is data
                            if (is_refresh) {
                                Storage.setObject(cacheKey, null, Storage.priorityLevels.HIGHESTPRIORITY);
                            }

                            $settingsXml = $(data.replaceReservedKeywords().replace(StaticCTIDKeyToReplaceInSettings, ToolbarInfo.publisherID()));

                            // Saving to local storage
                            var settingsData = {
                                "settingsXml": data,
                                "timestamp": new Date().getTime()
                            };

                            Storage.setObject(cacheKey, settingsData, Storage.priorityLevels.HIGHESTPRIORITY);


                            //setTimeout(function () { self.CreateSettings.call(self, false, true); }, (interval != undefined ? interval : 1440000));


                            // We show the welcome page only on first load

                            Login.welcomePageBaseUrl = $('GENERAL_TOOLBAR_INFO > WEB_SERVER_URL', $settingsXml).text();
                        }
                        else {
                            $settingsXml = $(Storage.getObject(cacheKey).settingsXml.replaceReservedKeywords().replace(StaticCTIDKeyToReplaceInSettings, ToolbarInfo.publisherID()));
                            setTimeout(function () { self.CreateSettings.call(self, false, true); }, (interval != undefined ? interval : 1440000));
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.warn(stringFormat("Warning: Could not fetch xml from '{0}'", url));
                        console.warn(errorThrown.message);
                        console.warn(errorThrown);
                        console.warn(XMLHttpRequest);
                        console.warn(textStatus);
                        $settingsXml = $(Storage.getObject(cacheKey).settingsXml.replaceReservedKeywords().replace(StaticCTIDKeyToReplaceInSettings, ToolbarInfo.publisherID()));
                        setTimeout(function () { self.CreateSettings.call(self, false, true); }, (interval != undefined ? interval : 1440000));
                    }
                };

                if (isRegularRefresh !== true) {
                    ajaxOptions.ifModified = true;
                }
                else if(isRegularRefresh === true) {
                     ajaxOptions.beforeSend = function (XMLHttpRequest, settings) {
                        XMLHttpRequest.setRequestHeader("Cache-Control", "no-cache");
                     }
                }

                $.ajax(ajaxOptions);
            }

            // assign locale data and init the translation service instance
            mToolbarLocale = $settingsXml.find('TOOLBAR_LOCALE')[0].innerHTML;
            Translation.init(mToolbarLocale);

     