import React from "react";
import {
  CalciteShell,
  CalciteShellPanel,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/calcite/calcite.css";

import EsriMap from "./components/EsriMap";
import List from "./components/List";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleResultsChange = this.handleResultsChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.state = {
      options: {
        radius: 5,
        units: "miles",
      },
      results: [], // search features
      height: 0, // of the browser window
      searched: false, // populate list?
      selected: {}, // featured clicked on from search widget. Zooms to the point on the map
    };
  }

  componentDidMount() {
    // set height depending on how big the window is
    const height = this.divElement.clientHeight;
    this.setState({ height });
    // device detection
  }

  handleResultsChange(r) {
    // when results are populated from the search, show them in the List
    this.setState({ results: r, searched: true });
  }

  handleSelection(s) {
    this.setState({ selected: s });
  }

  render() {
    return (
      <div
        style={{ height: "70vh" }}
        ref={(divElement) => {
          this.divElement = divElement;
        }}
      >
        <CalciteShell dir="ltr" class="calcite-theme-light">
          <header slot="header">
            <h2>Marble Reality</h2>
          </header>
          {this.state.searched ? ( // if there are results show the total
            <React.Fragment>
              There is a total of <b>{this.state.results.length}</b> hospitals
              within{" "}
              <b>
                {this.state.options.radius} {this.state.options.units}
              </b>
              .
            </React.Fragment>
          ) : (
            // otherwise tell the user they need to search
            "Search a location on the Map to find the nearest hospitals."
          )}
          <EsriMap
            options={this.state.options}
            onResultsChange={this.handleResultsChange}
            h={this.state.height}
            selected={this.state.selected}
          />
          <CalciteShellPanel
            slot="contextual-panel"
            position="end"
            detached-height-scale="l"
            width-scale="m"
          >
            <List
              results={this.state.results}
              options={this.state.options}
              h={this.state.height}
              onSelection={this.handleSelection}
            />
          </CalciteShellPanel>
        </CalciteShell>
      </div>
    );
  }
}
