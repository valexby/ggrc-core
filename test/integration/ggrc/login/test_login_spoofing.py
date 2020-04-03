# Copyright (C) 2020 Google Inc.
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>

"""Tests for ggrc login model."""
import mock

from ggrc import db
from integration.ggrc import Api
from integration.ggrc import TestCase
from integration.ggrc.models import factories


class TestLoginSpoofing(TestCase):
  """Class for testing login logic"""

  def setUp(self):
    super(TestLoginSpoofing, self).setUp()
    self.api = Api()

  @mock.patch('ggrc.models.person.Person.system_wide_role',
              new_callable=mock.PropertyMock)
  def test_user_logs_out_when_given_invalid_email(self, mock_system_wide_role):   # noqa pylint: disable=invalid-name
    """Test of user spoofing"""
    mock_system_wide_role.return_value = u'Administrator'
    user = factories.PersonFactory(email='email@email.com')
    self.api.set_user(user)
    user.email = 'another@email.com'
    db.session.add(user)
    db.session.commit()

    response = self.api.client.get("/dashboard")

    self.assertRedirects(response, "/login?next=%2Fdashboard")
