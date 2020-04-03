# Copyright (C) 2020 Google Inc.
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>

"""Login handler for using App Engine authentication with Flask-Login

Assumes app.yaml is configured with:

..
  handlers:
    - url: /login
      script: <wsgi_app path>
      login: required

E.g., ``login: required`` must be specified *at least* for the '/login' route.
"""

import logging

import flask
import flask_login
from google.appengine.api import users

from ggrc.login import common
from ggrc.utils.user_generator import find_or_create_user_by_email

logger = logging.getLogger(__name__)


def get_user():
  """Get current user using appengine authentication."""
  ae_user = users.get_current_user()
  email = ae_user.email()
  nickname = ae_user.nickname()
  user = find_or_create_user_by_email(email, name=nickname)
  return user


def login():
  """Log in current user."""
  user = get_user()
  return common.login_user(user)


def logout():
  flask_login.logout_user()
  return flask.redirect(users.create_logout_url(common.get_next_url(
      flask.request, default_url=flask.url_for('index'))))


def request_loader(request):
  """Get the user provided in X-GGRC-user if whitelisted App id provided."""
  if not common.check_appengine_appid(request):
    return None

  return common.get_ggrc_user(request, True)
