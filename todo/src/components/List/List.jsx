import React from "react";
import style from "./../../index.module.scss";
import list from "./List.scss";
import classNames from "classnames";
import Badge from "../Badge/Badge";
import axios from "axios";
import removeSvg from "./../../assets/img/remove.svg";
const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => {
        return (
          <li
            key={index}
            className={classNames(item.className, { active: item.active })}
          >
            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
            <span>{item.name}</span>
            {isRemovable && (
              <img
                className="list__remove-icon"
                src={removeSvg}
                alt=""
                onClick={() => removeList(item)}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;