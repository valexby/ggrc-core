# Copyright (C) 2020 Google Inc.
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>

from sqlalchemy import and_

from ggrc import db
from ggrc.app import app
from ggrc.models.assessment import Assessment
from ggrc.models.relationship import Relationship
from ggrc.models.person import Person


_EXTERNALIZED_ATTRS = [
    "end_date",
    "start_date",
    "status",
    "title",
    "context_id",
    "audit_id",
    "assessment_type",
]


_EXTERNAL_AUDITORS = [
    "mikitah@google.com",
    "pglebov@google.com",
]


@app.route("/api/assessments/externalize/<int:assessment_id>", methods=["POST"])
def externalize_assessment(assessment_id):
  internal_assessment = Assessment.query.get(assessment_id)

  external_assessment = Assessment()

  for attr in _EXTERNALIZED_ATTRS:
      setattr(
          external_assessment,
          attr,
          getattr(internal_assessment, attr),
      )

  external_auditors = Person.query.filter(
      Person.email.in_(_EXTERNAL_AUDITORS),
  ).all()

  if len(external_auditors) != len(_EXTERNAL_AUDITORS):
    return app.make_response(
        (
            "External auditors do not exist. Please create",
            400,
            [("Content-Type", "text/json")],
        ),
    )

  for auditor in external_auditors:
    external_assessment.add_person_with_role_name(
        auditor,
        "Verifiers",
    )

  for ac_person in internal_assessment.get_acl_with_role_name("Assignees").access_control_people:
     external_assessment.add_person_with_role_name(
        ac_person.person,
        "Assignees",
    )

  db.session.add(external_assessment)
  db.session.flush()

  internal_snapshot_relationship = Relationship.query.filter(
      and_(
          Relationship.source_type == internal_assessment.type,
          Relationship.source_id == internal_assessment.id,
          Relationship.destination_type == "Snapshot",
      ),
  ).first()

  if internal_snapshot_relationship is None:
    db.session.rollback()

    return app.make_response(
        (
            "Audit is not mapped to any object",
            400,
            [("Content-Type", "text/json")],
        ),
    )

  external_snapshot_relationship = Relationship(
      destination_type=internal_snapshot_relationship.destination_type,
      destination_id=internal_snapshot_relationship.destination_id,
      source_type=internal_snapshot_relationship.source_type,
      source_id=external_assessment.id,
  )

  db.session.add(external_snapshot_relationship)
  db.session.commit()

  return app.make_response(
      (
          "Assessment successfully externalized",
          200,
          [("Content-Type", "text/json")],
      ),
  )


@app.route("/api/people/create_external_auditors", methods=["POST"])
def create_external_auditors():
  for auditor_email in _EXTERNAL_AUDITORS:
    db.session.add(
        Person(
            name=auditor_email.split("@")[0],
            email=auditor_email,
        )
    )

  db.session.commit()

  return app.make_response(
      (
          "External auditors successfully created",
          200,
          [("Content-Type", "text/json")],
      ),
  )
