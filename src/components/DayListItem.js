import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames({"day-list__item": !props.selected && props.spots !== 0}, {"day-list__item--selected": props.selected}, {"day-list__item--full": props.spots===0 });
  let spots = props.spots;
  const formatSpots = () => {
    if(props.spots === 0) {
      spots = `no spots remaining`;
    } else if(props.spots === 1) {
      spots = `1 spot remaining`;
    } else {
      spots += " spots remaining";
    }
  }
  formatSpots();

  return (
    <li onClick={() => props.setDay(props.name) } className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spots}</h3>
    </li>
  );
}