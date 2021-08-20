import React, { memo } from "react";
import {
  CalciteList,
  CalciteListItem,
} from "@esri/calcite-components-react";
import VirtualScroll from "./VirtualScroll";

export default class List extends React.Component {
  render() {
    const Item = memo(({ index }) => (
      <>
        <CalciteListItem
          style={{ marginBottom: "5px", height: "50px" }}
          label={this.props.results[index].attributes.NAME}
          description={`${
            Math.round(
              (this.props.results[index].attributes.dist + Number.EPSILON) * 100
            ) / 100
          } ${this.props.units}`}
          onClick={() => {
            this.props.onSelection(this.props.results[index]);
          }}
        >
          {/* <CalciteLink
            slot="actions-end"
            href={`https://maps.google.com/maps?daddr=${this.props.results[index].geometry.latitude},${this.props.results[index].geometry.longitude}&amp;ll=`}
          >
            Directions
          </CalciteLink> */}
        </CalciteListItem>
      </>
    ));

    return (
      <CalciteList selection-follows-focus>
        <VirtualScroll
          itemCount={this.props.results.length}
          height={this.props.h}
          childHeight={55}
          Item={Item}
        />
      </CalciteList>
    );
  }
}
