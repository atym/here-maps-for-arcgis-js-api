/**
 * @author lapinek
 * @copyright (c) 2014 lapinek
 */

define(
    [
        'dojo/_base/declare',
        'esri/dijit/BasemapGallery',
        dojoConfig.paths.jsPath + '/HERETiledMapServiceLayer.js'
    ],

    function () {
        'use strict';

        /**
         * @class This class allows for using Non-ArcGIS tiled services in the BasemapGallery widjet
         * @name BasemapGallery
         * @param {Object} options Options to initialize the component with
         * @param {Object} options.map ArcGIS Map
         * @param {Object} options.services Configuration for tiled services to be added to the BasemapGallery dijit
         * @param {String} options.titlePaneID The BasemapGallery dijit title pane ID
         * @param {String} options.basemapGalleryID The BasemapGallery dijit DOM node ID
         * @param {String} options.defaultServiceURL URL to an ArcGIS tiled service to be added first to the map and set it up, in case there isn't one specified in services
         * @param {Boolean} options.showArcGISBasemaps Indicates whether or not to include basemaps from ArcGIS Online
         * @param {String} [options.bingMapsKey] Bing Maps Key if Bing Maps are included in services
         * @memberof LOCAL
         */

        /**
         * @overview
         * <p><strong>HERE Maps content for ArcGIS Server JavaScript API</strong></p>
         * <p><a href="../examples/herebasemapgallery.html" target="_blank">Example</a></p>
         */

        return dojo.declare('LOCAL.BasemapGallery', null, {
            constructor: function (options) {
                var services,
                    nonArcGISServices,
                    defaultService,
                    defaultVisibleServiceID,
                    basemapGalleryTitlePane,
                    basemapGallery;

                function init() {
                    var k,
                        service,
                        basemapService;

                    services = [];
                    nonArcGISServices = [];

                    basemapGalleryTitlePane = dijit.byId(options.titlePaneID);

                    for (k = 0; k < options.services.length; k += 1) {
                        basemapService = options.services[k];

                        service = {};

                        switch (basemapService.type) {
                        case 'WebTiledLayer':
                            service.layer = new esri.dijit.BasemapLayer({
                                url: basemapService.url,
                                type: basemapService.type,
                                copyright: basemapService.copyright,
                                id: basemapService.id,
                                subDomains: basemapService.subDomains
                            });

                            break;

                        case 'ArcGISTiledMapServiceLayer':
                            service.layer = new esri.dijit.BasemapLayer({
                                url: basemapService.url,
                                id: basemapService.id,
                                copyright: basemapService.copyright
                            });

                            if (!defaultService && basemapService.defaultVisible && basemapService.layer) {
                                defaultService = basemapService;
                            }

                            break;

                        case 'HERETiledMapServiceLayer':
                            service = {};

                            service.layer = new LOCAL.HERETiledMapServiceLayer({
                                id: basemapService.id,
                                //commented out are optional
                                //componentsNames: ['Behavior', 'ZoomBar'],
                                //APIURL: 'api.maps.nlp.nokia.com/2.5.1/jsl.js',
                                baseMapTypeName: basemapService.baseMapTypeName,
                                visible: basemapService.defaultVisible,
                                app_id: basemapService.app_id,
                                app_code: basemapService.app_code,
                                nonArcGISService: true
                            });

                            nonArcGISServices.push(service);

                            break;
                        }

                        dojo.mixin(basemapService, service);

                        services.push(basemapService);
                    }

                    if (!defaultService && options.defaultServiceURL) {
                        defaultService = {
                            defaultVisible: false,
                            layer: new esri.layers.ArcGISTiledMapServiceLayer(options.defaultServiceURL, {id: 'Basemaps_Gallery_defaultService_Layer', visible: false, showAttribution: false})
                        };
                    }
                }

                //privileged methods
                //this should be called on the map 'load' event
                this.selectDefaultBasemap = function () {
                    //timeout is not really necessary if/when handled correctly in the calling template
                    setTimeout(function () {
                        basemapGallery.select(defaultVisibleServiceID);

                        basemapGalleryTitlePane.toggle();
                    }, 100);
                };

                //this should be called right after the map is constructed
                this.add = function () {
                    var i,
                        basemapOptions,
                        basemap,
                        basemaps,
                        basemapGalleryParams,
                        service;

                    if (options.map.getLevel() === 0) {
                        options.map.setLevel(1);
                    }

                    options.map.addLayer(defaultService.layer, 0);

                    basemaps = [];

                    for (i = 0; i < services.length; i += 1) {
                        service = services[i];

                        basemapOptions = {
                            layers: [service.layer],
                            id: service.id,
                            title: service.name,
                            thumbnailUrl: service.thumbnailUrl
                        };

                        if (service.layer.options && service.layer.options.nonArcGISService) {
                            options.map.addLayer(service.layer, 1);

                            service.layer.hide();

                            if (typeof service.layer.onVisibilityChange === 'function') {
                                service.layer.onVisibilityChange(false);
                            }
                        }

                        basemap = new esri.dijit.Basemap(basemapOptions);

                        basemaps.push(basemap);
                    }

                    basemapGalleryParams = {
                        basemaps: basemaps,
                        map: options.map,
                        showArcGISBasemaps: options.showArcGISBasemaps
                    };

                    if (options.bingMapsKey) {
                        basemapGalleryParams.bingMapsKey = options.bingMapsKey;
                    }

                    basemapGallery = new esri.dijit.BasemapGallery(
                        basemapGalleryParams,
                        options.basemapGalleryID || 'basemapGallery'
                    );

                    //development only
                    this.basemapGallery = basemapGallery;

                    basemapGallery.on('error', function (error) {
                        console.log('error: ', error);
                    });

                    basemapGallery.startup();

                    for (i = 0; i < services.length; i += 1) {
                        service = services[i];

                        if (service.defaultVisible) {
                            defaultVisibleServiceID = service.id;

                            break;
                        }
                    }

                    basemapGallery.on('selection-change', function () {
                        var layer2;

                        function showBasemapsLayer(layer) {
                            options.map.addLayer(defaultService.layer, 0);

                            if (options.map.getLevel() === 0) {
                                options.map.setLevel(1);
                            }

                            layer.show();

                            if (typeof layer.onVisibilityChange === 'function') {
                                layer.onVisibilityChange(true);
                            }
                        }

                        service = basemapGallery.getSelected();

                        for (i = 0; i < nonArcGISServices.length; i += 1) {
                            layer2 = nonArcGISServices[i].layer;

                            if (layer2 !== service.layer) {
                                layer2.hide();

                                if (typeof layer2.onVisibilityChange === 'function') {
                                    layer2.onVisibilityChange(false);
                                }
                            }
                        }

                        if (service.layers[0].options && service.layers[0].options.nonArcGISService) {
                            showBasemapsLayer(service.layers[0]);
                        }

                        basemapGalleryTitlePane.toggle();
                    });
                };

                init();
            },

            //public methods
            test: function (a) {
                console.log(a);
            }
        });
    }
);
