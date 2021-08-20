import React from "react";
import MapView from "@arcgis/core/views/MapView";
import ArcGISMap from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import Search from "@arcgis/core/widgets/Search";
import Polyline from "@arcgis/core/geometry/Polyline";

export default class EsriMap extends React.Component {
  state = {
    graphicsLayer: new GraphicsLayer(),
    mapView: null,
    graphicsLayerView: null,
    highlight: null,
  };

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(nextProps) {
    const { selected } = this.props;
    const { highlight, graphicsLayer, graphicsLayerView, mapView } = this.state;
    if (nextProps.selected !== selected) {
      if (selected) {
        mapView.goTo({ target: selected.geometry, zoom: 15 }); // go to feature

        // remove a feature if it is already highlighted
        if (highlight) {
          highlight.remove();
          this.setState({ highlight: null });
        }

        // find the feature that was clicked on based on the geometry
        // could cause issues if there are two hospitals in the exact same spot
        // for some reason the attributes weren't showing up so I couldn't use OBJECTID
        let selectedGeometry = graphicsLayer.graphics.items.filter((g) => {
          return g.geometry === selected.geometry;
        });
        if (selectedGeometry.length > 0) {
          // highlights the graphic
          let h = graphicsLayerView.highlight(selectedGeometry[0]);
          this.setState({ highlight: h });
        }
      }
    }
  }

  loadMap() {
    const { graphicsLayer } = this.state;
    // this is not accessible inside of the load module function
    // init feature layer
    const facilitiesLayer = new FeatureLayer({
      url: "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/NursingHomes/FeatureServer/0",
      outFields: ["*"],
    });

    const map = new ArcGISMap({
      basemap: "topo",
      layers: [graphicsLayer],
    });

    const view = new MapView({
      map,
      container: "viewDiv",
      zoom: 4,
      center: [-99, 37],
      popup: { collapseEnabled: false },
    });

    this.setState({ mapView: view });

    // init search widget
    const searchWidget = new Search({
      view: view,
      popupEnabled: false,
      goToOverride: () => {
        return;
      },
    });

    // add the search widget
    view.ui.move(["zoom"], "top-right");
    view.ui.add(searchWidget, {
      position: "top-left",
      index: 2,
    });

    // run query after search completes
    // use search result location as the query center location
    searchWidget.on("search-complete", (event) =>
      // pass the search results location and the feature layer to query
      this.findFacilities(
        event.results[0].results[0].feature.geometry,
        facilitiesLayer,
        view
      )
    );
    // layerview for highlighting
    view.whenLayerView(graphicsLayer).then((layerView) => {
      this.setState({ graphicsLayerView: layerView });
    });
  }

  // query nearby facilities within a certain radius
  findFacilities(loc, layer, view) {
    const { units, radius } = this.props;
    const query = layer.createQuery();
    query.returnGeometry = true; // return feature geometries
    query.distance = radius; // chosen in the Options component
    query.units = units; // chosen in the Options component
    query.outFields = ["*"]; // return all feature attributes
    query.geometry = loc; // query within a radius of the search location
    layer
      .queryFeatures(query)
      .then((results) => {
        // if there are hospitals in the radius
        if (results.features.length) {
          layer.queryExtent(query).then(function (results) {
            // go to the extent of the results satisfying the query
            view.goTo(results.extent);
          });

          const res = this.sortResults(results, loc);

          // populate map with the results
          this.displayLocations(res);
          // change the Search component's 'results' state so that the List component populates
          this.props.onResultsChange(res);
        } else {
          // if there are no results, set the results to nothing and zoom to the search location
          this.props.onResultsChange([]);
          view.goTo({ target: loc, zoom: 10 });
        }
      })
      .catch((error) => console.log(error));
  }

  // sorts the results by distance from search location
  sortResults(results, searchLocation) {
    // init res array used for sorting by closest distance to search location
    let res = [];
    // for each feature in the results
    results.features.forEach((feature) => {
      // calculate the distance between the feature and the search location
      const dist = this.getDistance(searchLocation, feature.geometry);
      // add the dist as a new attribute in the res array
      feature.attributes.dist = dist;
      res.push(feature);
    });
    // sort the res array by dist
    return res.sort((a, b) => (a.attributes.dist > b.attributes.dist ? 1 : -1));
  }

  getDistance(searchPoint, facilityLocation) {
    /***
     * To calculate distance between two points using geodesic length
     * Need to create a polyline between the two points, then calculate
     * The geodesic length of the polyline
     ***/
    var polyline = new Polyline({
      paths: [
        [searchPoint.longitude, searchPoint.latitude],
        [facilityLocation.longitude, facilityLocation.latitude],
      ],
      spatialReference: { wkid: 4326 },
    });

    return geometryEngine.geodesicLength(polyline, this.props.units);
  }

  // add features to a graphics layer and display them on map
  displayLocations(features) {
    // clear existing graphics
    this.state.graphicsLayer.removeAll();
    // create a marker using svg path
    const facilitySymbol = {
      type: "simple-marker",
      path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
      color: "#007AC2",
      // path: "M15.999 0C11.214 0 8 1.805 8 6.5v17l7.999 8.5L24 23.5v-17C24 1.805 20.786 0 15.999 0zM16 14.402A4.4 4.4 0 0 1 11.601 10a4.4 4.4 0 1 1 8.798 0A4.4 4.4 0 0 1 16 14.402z",
      //color: "#9900ff",
      size: "16px",
    };

    // create graphics for each feature
    features.forEach((feature) => {
      const graphic = new Graphic({
        geometry: feature.geometry,
        symbol: facilitySymbol,
      });

      // google maps directions link
      let url = `maps://maps.google.com/maps?daddr=${feature.geometry.latitude},${feature.geometry.longitude}&amp;ll=`;

      graphic.popupTemplate = {
        title: feature.attributes.NAME,
        content: () => {
          // readable distance string
          const d = `${
            Math.round((feature.attributes.dist + Number.EPSILON) * 100) / 100
          } ${this.props.units}`;
          const div = document.createElement("div");
          div.innerHTML = `${d}<br><br><a href=${url} target="_blank">Directions</a>`;
          return div;
        },
      };
      this.state.graphicsLayer.add(graphic);
    });
  }

  render() {
    return <div id="viewDiv"></div>;
  }
}
