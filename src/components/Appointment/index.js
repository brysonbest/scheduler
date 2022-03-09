import React from "react";
import "components/Appointment/styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import { useVisualMode } from "components/hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  async function loadSave(function1){
    await function1;
    transition(SHOW);
  }

  async function loadDelete(function1){
    await function1;
    transition(EMPTY);
  }

  function deleteInt() {
    transition(DELETING);
    loadDelete(props.cancelInterview(props.id));
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    loadSave(props.bookInterview(props.id, interview));
  }

  function confirm() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        
        {mode === SHOW && ( <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={confirm} onEdit={()=> transition(EDIT)} />
        )}

        {mode === SAVING && ( <Status message="Saving" />
        )}

        {mode === DELETING && ( <Status message="Deleting" />
        )}

        {mode === CONFIRM && ( <Confirm message="Delete Appointment?" onCancel={() => back()} onConfirm={deleteInt} />
        )}

        {mode === CREATE && ( <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>
        )}

        {mode === EDIT && ( <Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer.id} onCancel={() => transition(SHOW)} onSave={save}/>
        )}

      </article>
  );
}