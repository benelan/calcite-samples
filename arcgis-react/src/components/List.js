import React, { memo } from "react";
import { CalciteValueList, CalciteValueListItem } from "@esri/calcite-components-react";
import VirtualScroll from "./VirtualScroll";

export default class List extends React.Component {
  state = {
    apple: false,
  };

  componentDidMount() {
    if (
      /* if we're on iOS, open in Apple Maps */
      navigator.platform.indexOf("iPhone") !== -1 ||
      navigator.platform.indexOf("iPad") !== -1 ||
      navigator.platform.indexOf("iPod") !== -1
    )
      this.setState({ apple: true });
  }

  render() {
    const Item = memo(({ index }) => (
      <CalciteValueListItem
        style={{ marginBottom: "5px", height: "50px" }}
        label={this.props.results[index].attributes.NAME}
        description= {Math.round(
          (this.props.results[index].attributes.dist + Number.EPSILON) *
            100
        ) / 100 + this.props.options.units}
        onClick={() => {
          this.props.onSelection(this.props.results[index]);
        }}
      />
      ));

              /* <Button
                style={{ marginTop: "10px" }}
                color="success"
                tag="a"
                href={
                  this.state.apple // if it is an apple device
                    ? `maps://maps.google.com/maps?daddr=${this.props.results[index].geometry.latitude},${this.props.results[index].geometry.longitude}&amp;ll=`
                    : // otherwise tell the user they need to search
                      `https://maps.google.com/maps?daddr=${this.props.results[index].geometry.latitude},${this.props.results[index].geometry.longitude}&amp;ll=`
                }
              >
                Directions
              </Button>  */


    return (
      <CalciteValueList>
        <VirtualScroll
          itemCount={this.props.results.length}
          height={this.props.h}
          childHeight={55}
          Item={Item}
        />
      </CalciteValueList>
    );
  }
}
