# Copyright (C) 2019 Google Inc.
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>

"""Hooks for creating sox notifications."""

from ggrc.models import all_models
from ggrc.services import signals

from ggrc.sox.notifications import utils


def init_hook():
  """Initializes hooks."""
  # pylint: disable=unused-argument, unused-variable
  @signals.Restful.model_posted_after_commit.connect_via(all_models.Assessment)
  def handle_assessment_post(sender, obj=None, src=None, service=None,
                             event=None):
    """Handles assessment post event."""
    if obj.start_date and obj.sox_302_enabled:
      utils.create_sox_notifications(obj)
