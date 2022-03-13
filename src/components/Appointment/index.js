import React from "react";
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import { useVisualMode } from "components/hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  async function loadDelete(id) {
    try {
      await props.cancelInterview(id);
      transition(EMPTY);
    } catch (err) {
      transition(ERROR_DELETE, true);
    }
  }

  async function loadSave(id, interview) {
    try {
      await props.bookInterview(id, interview);
      transition(SHOW);
    } catch (err) {
      transition(ERROR_SAVE, true);
    }
  }

  function destroy() {
    transition(DELETING, true);
    loadDelete(props.id);
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    loadSave(props.id, interview);
  }

  function confirm() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}

      {mode === ERROR_SAVE && (
        <Error message="Error Saving" onClose={() => back()} />
      )}

      {mode === ERROR_DELETE && (
        <Error message="Error Deleting" onClose={() => back()} />
      )}

      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRM && (
        <Confirm
          message="Delete Appointment?"
          onCancel={() => back()}
          onConfirm={destroy}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}
    </article>
  );
}
