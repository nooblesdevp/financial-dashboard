import React from "react";
import { Grid, GridCellProps, GridColumn } from "@progress/kendo-react-grid";
import { getPositions } from "../services/dataService";
import { Position } from "../data/models";

export default function PositionsPanel() {
  const [positions, setPositions] = React.useState<Position[]>();
  React.useEffect(() => {
    getPositions().then((data: Position[]) => {
      setPositions(data);
    });
  }, []);
  const ChangeCell = (props: GridCellProps) => {
    const value = props.dataItem[props.field || ""]
    return (
      <td style={{ color: value > 0 ? "green" : "red"}}>
        {value} %
      </td>
    )
  }

  return (
    <Grid data ={positions} style={{height: 700}}>
      <GridColumn title="Symbol" field="symbol" locked={true} width={100}/>
      <GridColumn title="Name" field="name"/>
      <GridColumn title="Change" field="day_change" cell={ChangeCell}/>
      <GridColumn title="% Change" field="change_pct" cell={ChangeCell}/>
      <GridColumn title="Volume" field="volume"/>
      <GridColumn title="Market Cap" field="market_cap"/>
    </Grid>
  );
}
