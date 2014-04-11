/**
 * @author lapinek
 * @copyright (c) 2014 lapinek
 */

define(
    [
        'esri/urlUtils',

        'dojo/_base/declare'
    ],

    function (urlUtils) {
        'use strict';

        return dojo.declare(
            'LOCAL.Services',
            null,
            {
                constructor: function () {
                    function getHERESettings() {
                        var query,
                            hereSettings;

                        query = urlUtils.urlToObject(window.location.href).query;

                        hereSettings = {
                            //populate these with your HERE application settings or provide them in the query string
                            app_id: null,
                            app_code: null
                        };

                        if (query && query.app_id) {
                            hereSettings.app_id = query.app_id;
                        }

                        if (query && query.app_code) {
                            hereSettings.app_code = query.app_code;
                        }

                        return hereSettings;
                    }

                    function getHEREBasemapServices() {
                        var services,
                            service,
                            hereService,
                            hereSettings;

                        services = [];

                        hereService = {};
                        hereService.id = 'HEREMapsService';
                        hereService.name = 'HERE Maps';
                        hereService.copyright = '(c) 1987-2014 HERE';

                        hereSettings = getHERESettings();

                        //NORMAL
                        service = {};

                        service.baseMapTypeName = 'NORMAL';
                        service.baseMapTypeURL = 'base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day';
                        service.app_id = hereSettings.app_id;
                        service.app_code = hereSettings.app_code;

                        service.id = hereService.id + service.baseMapTypeName;
                        service.name = hereService.name + ' Map';
                        service.url = 'http://${subDomain}.' + service.baseMapTypeURL + '/${level}/${col}/${row}/256/png8?app_id=' + service.app_id + '&app_code=' + service.app_code;
                        service.type = 'WebTiledLayer';
                        service.subDomains = ['1', '2', '3', '4'];
                        service.copyright = hereService.copyright;
                        service.defaultVisible = true;
                        service.thumbnailUrl = 'images/basemap_' + service.id + '_100x67.png';

                        services.push(service);

                        //SATELLITE
                        service = {};

                        service.baseMapTypeName = 'SATELLITE';
                        service.baseMapTypeURL = 'aerial.maps.api.here.com/maptile/2.1/maptile/newest/hybrid.day';
                        service.app_id = hereSettings.app_id;
                        service.app_code = hereSettings.app_code;

                        service.id = hereService.id + service.baseMapTypeName;
                        service.name = hereService.name + ' Hybrid';
                        service.url = 'http://${subDomain}.' + service.baseMapTypeURL + '/${level}/${col}/${row}/256/png8?app_id=' + service.app_id + '&app_code=' + service.app_code;
                        service.type = 'WebTiledLayer';
                        service.subDomains = ['1', '2', '3', '4'];
                        service.copyright = hereService.copyright;
                        service.defaultVisible = false;
                        service.thumbnailUrl = 'images/basemap_' + service.id + '_100x67.png';

                        services.push(service);

                        //SATELLITE_PLAIN - using HERE API: in IE9/IE10 requires ArcGIS API 2.6, Compatibility View, and Document Mode: Internet Explorer 7 Standards;
                        service = {};

                        service.baseMapTypeName = 'SATELLITE_PLAIN';
                        service.app_id = hereSettings.app_id;
                        service.app_code = hereSettings.app_code;

                        service.id = hereService.id + service.baseMapTypeName;
                        service.name = hereService.name + ' JS API';
                        service.type = 'HERETiledMapServiceLayer';
                        service.defaultVisible = false;
                        service.thumbnailUrl = 'images/basemap_' + service.id + '_100x67.png';

                        services.push(service);

                        return services;
                    }

                    //privileged

                    //services for BasemapGallery
                    this.getBasemapServices = function () {
                        var services,
                            service;

                        services = [];

                        //HERE services
                        services = services.concat(getHEREBasemapServices());

                        //ArcGIS services
                        service = {};

                        service.id = 'ArcGISWorldImagery';
                        service.name = 'ArcGIS World Imagery';
                        service.url = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer';
                        service.type = 'ArcGISTiledMapServiceLayer';
                        service.defaultVisible = false;
                        service.thumbnailUrl = 'images/basemap_' + service.id + '_100x67.png';
                        service.copyright = 'Source: Esri, DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community';

                        services.push(service);

                        return services;
                    };

                    //ArcGIS services
                    this.getServices = function () {
                        var services;

                        services = [];

                        services.push({
                            id: 'a-service-id',
                            type: 'ArcGISDynamicMapServiceLayer',
                            visible: true,
                            opacity: 0.5,
                            url: 'a-service-url'
                        });

                        return services;
                    };
                }
            }
        );
    }
);
