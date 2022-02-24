import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames({"interviewers__item": !props.selected}, {"interviewers__item--selected":props.selected})
  return (
  <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt="Sylvia Palmer"
  />
  {props.selected ? props.name : ""}
  </li>
  );
}