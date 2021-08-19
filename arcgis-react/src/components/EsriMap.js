import React from "react";
import { loadModules, setDefaultOptions } from "esri-loader";
export default class EsriMap extends React.Component {
  state = {
    map: null,
    view: null,
    search: null,
    graphicsLayer: null,
    graphicsLayerView: null,
    highlight: null,
  };

  componentDidMount() {
    // load js api css and map
    setDefaultOptions({ css: true });
    this.loadMap();
  }

  componentDidUpdate(nextProps) {
    // this section is for zooming to and selecting a point
    // when the corresponding feature is clicked in the List component
    const { selected } = this.props;

    if (nextProps.selected !== selected) {
      if (selected) {
        this.state.view.goTo({ target: selected.geometry, zoom: 15 }); // go to feature

        // if a feature is already highlighted
        // remove it
        if (this.state.highlight) {
          this.state.highlight.remove(); // this part is not actually removing the highlight
          this.setState({ highlight: null });
        }

        // find the feature that was clicked on based on the geometry
        // could cause issues if there are two hospitals in the exact same spot
        // for some reason the attributes weren't showing up so I couldn't use OBJECTID
        let sg = this.state.graphicsLayer.graphics.items.filter(function (g) {
          return g.geometry === selected.geometry;
        });
        if (sg.length > 0) {
          // highlights the graphic
          let h = this.state.graphicsLayerView.highlight(sg[0]);
          this.setState({highlight: h})
        }
      }
    }
  }

  loadMap() {
    // this is not accessible inside of the load module function
    const that = this;
    loadModules([
      "esri/views/MapView",
      "esri/Map",
      "esri/layers/FeatureLayer",
      "esri/layers/GraphicsLayer",
      "esri/Graphic",
      "esri/geometry/geometryEngine",
      "esri/widgets/Search",
      "esri/geometry/Polyline",
    ]).then(
      ([
        MapView,
        EsriMap,
        FeatureLayer,
        GraphicsLayer,
        Graphic,
        geometryEngine,
        Search,
        Polyline,
      ]) => {
        // init graphics layer
        that.state.graphicsLayer = new GraphicsLayer();

        // init feature layer
        const facilitiesLayer = new FeatureLayer({
          url:
            "https://services.arcgis.com/Wl7Y1m92PbjtJs5n/ArcGIS/rest/services/hospitalTestData/FeatureServer/0",
          outFields: ["*"],
        });

        // init map
        that.state.map = new EsriMap({
          basemap: "topo",
          layers: [that.state.graphicsLayer],
        });

        // init view
        that.state.view = new MapView({
          container: "viewDiv",
          map: that.state.map,
          zoom: 4,
          center: [-99, 37],
          popup: {collapseEnabled: false}
        });


        // init search widget
        that.state.search = new Search({
          view: that.state.view,
          popupEnabled: false,
        });

        // don't zoom to search location
        that.state.search.goToOverride = () => {
          return;
        };

        // when the view is finished loading
        that.state.view.when(() => {
          // add the search widget
          that.state.view.ui.add(that.state.search, {
            position: "top-right",
            index: 2,
          });

          // run query after search completes
          // use search result location as the query center location
          that.state.search.on("search-complete", (event) =>
            // pass the search results location and the feature layer to query
            findFacilities(
              event.results[0].results[0].feature.geometry,
              facilitiesLayer
            )
          );
          // creating layerview for highlighting
          that.state.view
            .whenLayerView(that.state.graphicsLayer)
            .then((layerView) => {
              that.state.graphicsLayerView = layerView;
            });
        });

        // query nearby facilities within a certain radius
        function findFacilities(loc, layer) {
          const query = layer.createQuery();
          query.returnGeometry = true; // return feature geometries
          query.distance = that.props.options.radius; // chosen in the Options component
          query.units = that.props.options.units; // chosen in the Options component
          query.outFields = ["*"]; // return all feature attributes
          query.geometry = loc; // query within a radius of the search location
          layer.queryFeatures(query).then((results) => {
            // if there are hospitals in the radius
            if (results.features.length) {
              layer.queryExtent(query).then(function (results) {
                // go to the extent of the results satisfying the query
                that.state.view.goTo(results.extent);
              });
              // init res array used for sorting by closest distance to search location
              let res = [];
              // for each feature in the results
              results.features.forEach((feature) => {
                // calculate the distance between the feature and the search location
                const dist = getDistance(loc, feature.geometry);
                // add the dist as a new attribute in the res array
                feature.attributes.dist = dist;
                res.push(feature);
              });
              // sort the res array by dist
              res.sort((a, b) =>
                a.attributes.dist > b.attributes.dist ? 1 : -1
              );
              // populate map with the results
              displayLocations(res);
              // change the Search component's 'results' state so that the List component populates
              that.props.onResultsChange(res);
            } else {
              // if there are no results, set the results to nothing and zoom to the search location
              that.props.onResultsChange([]);
              that.state.view.goTo({ target: loc, zoom: 10 });
            }
          });
        }

        /***
         * To calculate distance between two points using geodesic length
         * Need to create a polyline between the two points, then calculate
         * The geodesic lenght of the polyline
         ***/
        function getDistance(searchPoint, facilityLocation) {
          var polyline = new Polyline({
            paths: [
              [searchPoint.longitude, searchPoint.latitude],
              [facilityLocation.longitude, facilityLocation.latitude],
            ],
            spatialReference: { wkid: 4326 },
          });

          return geometryEngine.geodesicLength(
            polyline,
            that.props.options.units
          );
        }

        function displayLocations(features) {
          // clear existing graphics first
          that.state.graphicsLayer.removeAll();

          // var symbol = {
          //   type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
          //   url: 'place.com/thing.jpg',
          //   width: "64px",
          //   height: "64px"
          // };

          // create a marker using svg path
          const facilitySymbol = {
            type: "simple-marker",
            path:
              "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
            color: "#5cb85c",
            // path: "M15.999 0C11.214 0 8 1.805 8 6.5v17l7.999 8.5L24 23.5v-17C24 1.805 20.786 0 15.999 0zM16 14.402A4.4 4.4 0 0 1 11.601 10a4.4 4.4 0 1 1 8.798 0A4.4 4.4 0 0 1 16 14.402z",
            //color: "#9900ff",
            size: "16px",
          };

          // for each feature being added to the map
          features.forEach((feature) => {
            // create a graphic
            const graphic = new Graphic({
              geometry: feature.geometry,
              symbol: facilitySymbol,
            });

            let url = "";
            console.log(feature);
            if (
              // if we're on iOS, open in Apple Maps
              navigator.platform.indexOf("iPhone") !== -1 ||
              navigator.platform.indexOf("iPad") !== -1 ||
              navigator.platform.indexOf("iPod") !== -1
            )
              url = `maps://maps.google.com/maps?daddr=${feature.geometry.latitude},${feature.geometry.longitude}&amp;ll=`;
            // else use Google
            else
              url = `https://maps.google.com/maps?daddr=${feature.geometry.latitude},${feature.geometry.longitude}&amp;ll=`;

            // and add a popup
            graphic.popupTemplate = {
              title: feature.attributes.NAME,
              content: function () {
                var d =
                  Math.round((feature.attributes.dist + Number.EPSILON) * 100) /
                    100 +
                  " " +
                  that.props.options.units;
                var div = document.createElement("div");
                div.innerHTML = `${d}<br><br><a href=${url} target="_blank">Directions</a>`;
                return div;
              },
            };
            that.state.graphicsLayer.add(graphic);
          });
        }
      }
    );
  }

  render() {
    return <div id="viewDiv"></div>;
  }
}
