# Copyright (C) 2019 Google Inc.
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>

"""SOX application."""

from ggrc.sox.notifications import init_hooks


# pylint: disable=unused-argument
def init_app(app):
  """Init apps."""
  init_hooks()
