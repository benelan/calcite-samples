import React from "react";
import {
  CalciteShell,
  CalciteShellPanel,
  CalciteLabel,
  CalciteInput,
  CalciteRadioGroup,
  CalciteRadioGroupItem,
} from "@esri/calcite-components-react";
import EsriMap from "./components/EsriMap";
import List from "./components/List";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleResultsChange = this.handleResultsChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.state = {
      radius: 15,
      units: "miles",
      results: [], // search features
      searched: false, // populate list?
      selected: {}, // featured clicked on from search widget. Zooms to the point on the map
    };
  }

  handleResultsChange(r) {
    // when results are populated from the search, show them in the List
    this.setState({ results: r, searched: true });
  }

  handleSelection(s) {
    this.setState({ selected: s });
  }

  render() {
    const { radius, units, results, selected, searched } = this.state;
    return (
        <CalciteShell dir="ltr" class="calcite-theme-light">
          <header style={{ marginLeft: "1rem" }} slot="header">
            <div style={{ margin: ".25rem" }}>
              <div
                style={{
                  width: "10rem",
                  display: "inline-block",
                  marginRight: "1rem",
                }}
              >
                <CalciteLabel>
                  Radius
                  <CalciteInput
                    type="number"
                    value={radius}
                    onCalciteInputInput={(e) =>
                      this.setState({
                        radius: e.target.value,
                        results: [],
                        searched: false,
                      })
                    }
                  ></CalciteInput>
                </CalciteLabel>
              </div>
              <div style={{ display: "inline-block" }}>
                <CalciteLabel>
                  Units
                  <CalciteRadioGroup
                    id="radio-group"
                    onCalciteRadioGroupChange={(e) =>
                      this.setState({
                        units: e.detail,
                        results: [],
                        searched: false,
                      })
                    }
                  >
                    <CalciteRadioGroupItem
                    value="miles"
                    {...(units === "miles" ? { checked: true } : {})}
                    >
                      Miles
                    </CalciteRadioGroupItem>
                    <CalciteRadioGroupItem
                    value="kilometers"
                    {...(units === "kilometers" ? { checked: true } : {})}
                    >
                      Kilometers
                    </CalciteRadioGroupItem>
                  </CalciteRadioGroup>
                </CalciteLabel>
              </div>
            </div>
          </header>
          <EsriMap
            radius={radius}
            units={units}
            onResultsChange={this.handleResultsChange}
            selected={selected}
          />
          <CalciteShellPanel
            slot="contextual-panel"
            position="end"
            detached-height-scale="l"
            width-scale="m"
            className="bg-color"
          >
            <div style={{ marginLeft: ".5rem" }}>
              {searched ? ( // if there are results show the total
                <p>
                  There is a total of <b>{results.length}</b> nursing homes
                  within{" "}
                  <b>
                    {radius} {units}
                  </b>
                  .
                </p>
              ) : (
                // otherwise tell the user they need to search
                "Search a location on the Map to find the nearest nursing homes."
              )}
            </div>
            <List
              results={results}
              radius={radius}
              units={units}
              onSelection={this.handleSelection}
            />
          </CalciteShellPanel>
          <footer
            slot="footer"
            style={{ marginLeft: ".25rem", fontSize: "10px" }}
          >
            Oak Ridge National Laboratory (ORNL), National
            Geospatial-Intelligence Agency (NGA) Homeland Security
            Infrastructure Program (HSIP) Team
          </footer>
        </CalciteShell>
    );
  }
}
