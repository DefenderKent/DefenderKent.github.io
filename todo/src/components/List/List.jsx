import React from "react";
import style from "./../../index.module.scss";
import list from "./List.scss";

const List = (props) => {
  return (
    <ul className="list">
      {props.items.map((item, index) => {
        return (
          <li key={index} className={item.active ? "active" : ""}>
            <i>
              {item.icon ? (
                item.icon
              ) : (
                <i className={`badge badge--${item.color}`}> </i>
              )}
            </i>
            <span>{item.name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
