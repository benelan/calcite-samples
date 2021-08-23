import React from "react";
import { CalciteList, CalciteListItem } from "@esri/calcite-components-react";

export default class List extends React.Component {
  render() {
    const listItems = this.props.results.map((item) => (
      <CalciteListItem
        style={{ marginBottom: "5px", height: "60px" }}
        label={item.attributes.NAME}
        description={`${
          Math.round((item.attributes.dist + Number.EPSILON) * 100) / 100
        } ${this.props.units}`}
        onClick={() => {
          this.props.onSelection(item);
        }}
      >
        {/* <CalciteLink
            slot="actions-end"
            href={`https://maps.google.com/maps?daddr=${item.geometry.latitude},${item.geometry.longitude}&amp;ll=`}
          >
            Directions
          </CalciteLink> */}
      </CalciteListItem>
    ));

    return (
      <CalciteList selection-follows-focus style={{ overflowY: "auto" }}>
        {listItems}
      </CalciteList>
    );
  }
}
