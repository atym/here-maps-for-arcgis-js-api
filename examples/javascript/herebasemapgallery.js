/**
 * @author lapinek
 * @copyright (c) 2014 lapinek
 */

var LOCAL,
    dojoConfig;

LOCAL = {};

function getJSPath() {
    'use strict';

    var jsPath;

    jsPath = location.pathname.replace(/\/[^\/]*$/, '').split('/');
    jsPath.splice(jsPath.length - 1, 1, 'src');
    jsPath = jsPath.join('/');

    return jsPath;
}

dojoConfig = {
    paths: {
        'jsPath': getJSPath()
    }
};

require(
    [
        'dojo/parser',
        'dojo/domReady!',

        'dijit/layout/BorderContainer',
        'dijit/layout/ContentPane',
        'dijit/TitlePane',

        'esri/map',
        'esri/geometry/Extent',

        'javascript/Services.js',

        //dojo seems to use it as relative path
        dojoConfig.paths.jsPath + '/BasemapGallery.js'
    ],
    function (
        arrayUtils/*,
        urlUtils*/
    ) {
        'use strict';

        var localServices,
            ismobile,
            map,
            basemapGallery;

        function addBasemapsGallery() {
            var options;

            options = {};

            options.map = map;
            options.services = localServices.getBasemapServices();

            options.titlePaneID = 'basemap-gallery-title-pane';
            options.basemapGalleryID = 'basemap-gallery';
            options.defaultServiceURL = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer';
            options.showArcGISBasemaps = false;
            //options.bingMapsKey = 'your Bing Maps Key';

            basemapGallery = new LOCAL.BasemapGallery(options);

            basemapGallery.add();
        }

        function addMap() {
            map = new esri.Map('map', {
                logo: false,
                extent: new esri.geometry.Extent({'xmin': -20655932.75304122, 'ymin': 1325437.4651960218, 'xmax': -5344067.246958782, 'ymax': 10874562.534803983, 'spatialReference': new esri.SpatialReference({'wkid': 102100, 'latestWkid': 3857})}),
                showAttribution: true,
                sliderStyle: ismobile ? 'small' : 'large'
            });

            //for development
            LOCAL.map = map;

            map.on('load', function () {
                basemapGallery.selectDefaultBasemap();
            });

            addBasemapsGallery();
        }

        function init() {
            ismobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            localServices = new LOCAL.Services();

            addMap();
        }

        dojo.parser.parse();

        init();
    }
);
