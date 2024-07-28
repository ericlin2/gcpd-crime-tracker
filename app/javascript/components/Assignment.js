import React from "react";
import FormattedDate from "./FormattedDate";

function Assignment({ investigation }) {
  const investigationData = investigation.data.attributes;
  const assignments = investigationData.current_assignments;

  // referencing the content method in Crimes.js, create a content method that
  // shows the assignment of officers who are currently working on the investigation
  // each assignment should show the officer's rank, first name, last name, and the start date of the assignment
  // if there are no assignments, the content should show a message of that effect
  const content =
    assignments.length === 0 ? (
      <p>There are no officers currently assigned to this investigation.</p>
    ) : (
      <>
        <ul>
          {assignments.map((assignment) => {
            return (
              <ul>
                <li>
                  &bull;{" "}
                  {assignment.data.attributes.officer.data.attributes.rank}{" "}
                  {
                    assignment.data.attributes.officer.data.attributes
                      .first_name
                  }{" "}
                  {assignment.data.attributes.officer.data.attributes.last_name}{" "}
                  (as of: {FormattedDate(assignment.data.attributes.start_date)}
                  )
                </li>
              </ul>
            );
          })}
        </ul>
      </>
    );

  return (
    <>
      <div class="card yellow lighten-5">
        <div class="card-content">
          <span class="card-title">Current Assignments</span>
          {content}
        </div>
      </div>
    </>
  );
}

export default Assignment;
