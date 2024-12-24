/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import React from "react";
import { v4 as uuid } from "uuid";

const MultiEntity: React.FC<{
  entityData: any;
  schema: any;
  setEntityData: (data: any) => void;
}> = ({ entityData, schema, setEntityData }) => {
  const [editRowId, setEditRowId] = React.useState("");
  const [data, setData] = React.useState(entityData);

  function iconClick(name: any, id: any) {
    if (name == "add") {
      const newRow = data.find((d: any) => d.id == 999999);
      if (newRow) {
        newRow.id = uuid();
      }
      data.push({ id: 999999 });
      setData(data);
      setEntityData(data);
      setEditRowId(newRow.id);
    } else if (name == "delete") {
      if (window.confirm("Are you sure, you want to delete record?")) {
        const d = data.filter((d: any) => d.id != id);
        setData(d);
        setEntityData(d);
      }
    }
  }

  function setField(name: any, value: any) {
    // eslint-disable-next-line no-var
    var editRow = data.find((d: any) => d.id == editRowId);
    if (editRow) {
      editRow[name] = value;
    }
  }

  function getDataItem(name: string, type: string, width: string, id: string) {
    switch (type) {
      case "string":
        return (
          <input
            type="textbox"
            style={{ width: width, margin: "0.5rem" }}
            onChange={(e) => {
              setField(name, e.target.value);
            }}
          ></input>
        );

      case "icon":
        return (
          <Image
            src={`/Icon/${name}.svg`}
            style={{ padding: "0.3rem" }}
            width={30}
            height={20}
            alt="Icon/add.svg"
            onClick={() => iconClick(name, id)}
          ></Image>
        );
      case "date":
        return (
          <input
            type="date"
            style={{ width: width, margin: "0.5rem" }}
            onChange={(e) => {
              setField(name, e.target.value);
            }}
          ></input>
        );

      default:
        return (
          <input
            type="textbox"
            style={{ width: width, margin: "0.5rem" }}
          ></input>
        );
    }
  }

  function isAddMode(id: any) {
    return id == 999999;
  }

  return (
    <div>
      <table>
        <thead key="thead">
          <tr>
            {schema.map((c: any, i: any) => {
              return (
                <th style={{ width: c.width }} key={`th_${c.name}_${i}`}>
                  {c.displayName}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody key="tbody">
          {data.map((d: any, i: any) => {
            return (
              <tr key={`tr_${i}`} className={d.id == editRowId ? "addRow" : ""}>
                {schema.map((c: any, j: any) => {
                  return (
                    <td
                      style={{ width: c.width }}
                      key={`td_${i}_${j}`}
                      className={c.type == "icon" ? "pl-0" : ""}
                    >
                      {(isAddMode(d.id) && c.name == "add") ||
                      (c.type != "icon" && d.id == editRowId) ||
                      (!isAddMode(d.id) && c.name == "delete")
                        ? getDataItem(c.name, c.type, c.width, d.id)
                        : d[c.name]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MultiEntity;
