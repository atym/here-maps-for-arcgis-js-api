HERE Maps for ArcGIS JavaScript API
=======================================

## About

HERETiledMapServiceLayer module allows for adding a reference layer with content provided by [HERE Maps API for JavaScript](http://developer.here.com/javascript-apis) to a map constructed with ArcGIS API for JavaScript. 
 
Please see HERE [Licensing and Terms](http://developer.here.com/faqs#l&t)

Please see the docs for constructor options.

## Use

An example can be found at: your-working-copy/examples/nokiamapslayer.html.

It is necessary to provide valid <em>app\_id</em> and <em>app\_code</em> either in the code of the example or in the query string, i.e. <em>?app\_id=xxx&app\_code=yyy</em>  
(Without valid <em>app\_id</em> and <em>app\_code</em> access to the HERE content will be limited.)

The application settings can be obtained at <a href="https://developer.here.com/myapps" target="_blank">https://developer.here.com/myapps</a> and are issued under one's Nokia account. 

To include in a page, one will need to load the script and the ArcGIS API. The minified and non-minified version of the module will be located at: your-working-copy/src.     

The HERE API is loaded when the layer is added to the map and the layer's visibility is set to true.

## Known Limitations

This was originally developed for internal needs and tested only against ArcGIS API for JavaScript version 2.6.  

While the script provides ArcGIS Tiled Map Service Layer interface for HERE content the use of the HERE API may be limited.

In IE9/IE10 it requires Compatibility View and Document Mode: Internet Explorer 7 standards (can be set with X-UA-Compatible Meta Tag).

## Alternatives
As of version 3.2, ArcGIS API for JavaScript allows for adding non-ArcGIS tiled services with the WebTiledLayer class. 

An example of consuming HERE content provided by REST or/and JavaScript API-s with a customized BasemapGallery dijit can be found at: your-working-copy/examples/herebasemapgallery.html. 

This one you will not be able to run from your file system (you'll need to use a web server). This is because of the same-origin policy and the fact that the local JS is to be loaded as Dojo AMD Modules via HTTP.

## License

The MIT License (MIT)

Copyright (c) 2013 lapinek

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
