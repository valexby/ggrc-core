# Copyright (C) 2019 Google Inc.
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>

"""Sox notifications."""

from ggrc.sox.notifications import hooks


def init_hooks():
  """Init hooks."""
  hooks.init_hook()
