# Copyright (C) 2019 Google Inc.
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>

"""Sox notifications types."""

from datetime import timedelta
from enum import Enum


# pylint: disable=too-few-public-methods
class SoxNotificationTypes(Enum):
  """Enum class for storing sox notifications types."""
  DUE_DATE_BEFORE_1_DAY = 'sox_302_due_before_1_day'
  DUE_DATE_BEFORE_3_DAY = 'sox_302_due_before_3_day'
  DUE_DATE_BEFORE_7_DAY = 'sox_302_due_before_7_day'
  DUE_DATE_TODAY = 'sox_302_due_today'
  DUE_DATE_EXPIRATION = 'sox_302_due_expiration'

  @property
  def timedelta(self):
    """Get timedelta of notification type."""
    if self == self.DUE_DATE_BEFORE_1_DAY:
      return timedelta(days=-1)
    if self == self.DUE_DATE_BEFORE_3_DAY:
      return timedelta(days=-3)
    if self == self.DUE_DATE_BEFORE_7_DAY:
      return timedelta(days=-7)
    if self == self.DUE_DATE_TODAY:
      return timedelta(days=0)

    return timedelta(days=1)
