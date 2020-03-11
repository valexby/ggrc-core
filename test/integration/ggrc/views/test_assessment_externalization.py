# Copyright (C) 2020 Google Inc.
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
# pylint: disable=missing-docstring,invalid-name

import json

from ggrc.models.assessment import Assessment
from ggrc.views.assessment_externalization import (
    _EXTERNALIZED_ATTRS,
    _EXTERNAL_AUDITORS,
)

from integration import ggrc
from integration.ggrc.models import factories


class TestAssessmentExternalization(ggrc.TestCase):
  def setUp(self):
    self._api = ggrc.api_helper.Api()

    super(TestAssessmentExternalization, self).setUp()

  def test_basic_externalization(self):
    with factories.single_commit():
      audit = factories.AuditFactory()
      asmt = factories.AssessmentFactory(audit=audit)
      audit_tester = factories.PersonFactory(
        name="artsioma",
        email="artsioma@google.com",
      )

      asmt.add_person_with_role_name(
          audit_tester,
          "Assignees",
      )

      asmt_id = asmt.id

      control = factories.ControlFactory()
      snapshot = self._create_snapshots(audit, [control])[0]

      factories.RelationshipFactory(source=asmt, destination=audit)
      factories.RelationshipFactory(source=asmt, destination=snapshot)

    response = self._api.client.post(
        "/api/people/create_external_auditors",
    )

    self.assertEqual(
        json.loads(response.data)["message"],
        "External auditors successfully created",
    )

    response = self._api.client.post(
        "/api/assessments/externalize/{}".format(asmt_id)
    )

    self.assertEqual(
        json.loads(response.data)["message"],
        "Assessment successfully externalized",
    )

    internal_assessment = Assessment.query.get(asmt_id)
    external_assessment = Assessment.query.get(asmt_id + 1)

    for attr in _EXTERNALIZED_ATTRS:
      self.assertEqual(
          getattr(internal_assessment, attr),
          getattr(external_assessment, attr),
      )

    self.assertEqual(
        internal_assessment.related_destinations[0].destination_type,
        external_assessment.related_destinations[0].destination_type,
    )

    self.assertEqual(
        internal_assessment.related_destinations[0].destination_id,
        external_assessment.related_destinations[0].destination_id,
    )

    self.assertEqual(
        internal_assessment.related_destinations[1].destination_type,
        external_assessment.related_destinations[1].destination_type,
    )

    self.assertEqual(
        internal_assessment.related_destinations[1].destination_id,
        external_assessment.related_destinations[1].destination_id,
    )


    self.assertEqual(
        len(internal_assessment.access_control_list), 1,
    )
    self.assertEqual(
        len(external_assessment.access_control_list), 1 + len(_EXTERNAL_AUDITORS),
    )
    self.assertEqual(
        len(internal_assessment.get_acl_with_role_name("Assignees").access_control_people),
        1,
    )
    self.assertEqual(
        len(external_assessment.get_acl_with_role_name("Assignees").access_control_people),
        1,
    )
    self.assertEqual(
        len(internal_assessment.get_acl_with_role_name("Verifiers").access_control_people),
        0,
    )
    self.assertEqual(
        len(external_assessment.get_acl_with_role_name("Verifiers").access_control_people),
        len(_EXTERNAL_AUDITORS),
    )
