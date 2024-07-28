import React from "react";
import { post } from "../api";
import FormattedDate from "./FormattedDate";

// referencing CrimeEditor, create an InvestigationNotesEditor component
// that takes in a close and onSave prop
function InvestigationNotesEditor({ close, onSave }) {
  const [content, setContent] = React.useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };
  return (
    <>
      <div>
        <input
          type="text"
          value={content}
          onChange={handleChange}
          placeholder="Add a note here."
        />
      </div>
      <button onClick={() => onSave(content)}>Save</button>{" "}
      <button onClick={close}>Cancel</button>
    </>
  );
}

// reference the Crimes method in Crimes.js to create an InvestigationNotes method
function InvestigationNotes({ investigationNotes, investigationId }) {
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [currentInvestigationNotes, setCurrentInvestigationNotes] =
    React.useState(investigationNotes);

  function onSave(text) {
    post(`/v1/investigations/${investigationId}/notes`, {
      investigation_note: {
        content: text,
      },
    }).then((result) => {
      setEditorOpen(false);
      setCurrentInvestigationNotes(currentInvestigationNotes.concat(result));
    });
  }
  const content =
    currentInvestigationNotes.length === 0 ? (
      <p>
        This investigation does not yet have investigation notes associated with
        it.
      </p>
    ) : (
      <>
        <ul>
          {currentInvestigationNotes.map((investigationNote) => {
            const investigationNoteData = investigationNote.data.attributes;
            const content = investigationNoteData.content;
            const date = FormattedDate(investigationNoteData.date);
            const f_name =
              investigationNoteData.officer.data.attributes.first_name;
            const l_name =
              investigationNoteData.officer.data.attributes.last_name;
            return (
              <li key={`note-${investigationNote.data.id}`}>
                <p>
                  {date}: {content}{" "}
                </p>
                <p>
                  - {f_name} {l_name}
                </p>
              </li>
            );
          })}
        </ul>
      </>
    );

  return (
    <>
      <div class="card yellow lighten-5">
        <div class="card-content">
          <span class="card-title">Investigation Notes</span>
          {content}
          {editorOpen && (
            <InvestigationNotesEditor
              close={() => setEditorOpen(false)}
              onSave={onSave}
            />
          )}
          <hr></hr>
          {!editorOpen && (
            <button onClick={() => setEditorOpen(true)}>Add</button>
          )}
        </div>
      </div>
    </>
  );
}

export default InvestigationNotes;
