import React from "react";
import { CalciteList, CalciteListItem } from "@esri/calcite-components-react";

const List = (props) => (
  <CalciteList selection-follows-focus style={{ overflowY: "auto" }}>
    {props.results.map((item) => (
      <CalciteListItem
        style={{ marginBottom: "5px", height: "60px" }}
        label={item.attributes.NAME}
        description={`${
          Math.round((item.attributes.dist + Number.EPSILON) * 100) / 100
        } ${props.units}`}
        onClick={() => {
          props.onSelection(item);
        }}
      >
        {/* <CalciteLink
            slot="actions-end"
            href={`https://maps.google.com/maps?daddr=${item.geometry.latitude},${item.geometry.longitude}&amp;ll=`}
          >
            Directions
          </CalciteLink> */}
      </CalciteListItem>
    ))}
  </CalciteList>
);

export default List;
