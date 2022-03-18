import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

const formatSpots = (spots) => {
  if (spots === 0) {
    spots = `no spots remaining`;
  } else if (spots === 1) {
    spots = `1 spot remaining`;
  } else {
    spots += " spots remaining";
  }

  return spots;
};

export default function DayListItem(props) {
  const { selected, setDay, spots, name } = props;

  const dayClass = classNames(
    { "day-list__item": !selected && spots !== 0 },
    { "day-list__item--selected": selected },
    { "day-list__item--full": spots === 0 }
  );

  return (
    <li onClick={setDay} className={dayClass} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
