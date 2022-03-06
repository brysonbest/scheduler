import React from "react";
import "components/Appointment/styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import { useVisualMode } from "components/hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  async function load(function1){
    await function1;
    transition(SHOW);
  }
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    load(props.bookInterview(props.id, interview));
  }

  return (
    <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        
        {mode === SHOW && ( <Show student={props.interview.student} interviewer={props.interview.interviewer} />
        )}

        {mode === SAVING && ( <Status message="Saving" />
        )}

        {mode === CREATE && ( <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>
        )}
      </article>
  );
}