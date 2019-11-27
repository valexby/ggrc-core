# Copyright (C) 2019 Google Inc.
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>

"""
Add sox302 notifications types.

Create Date: 2019-11-19 19:03:19.940907
"""
# disable Invalid constant name pylint warning for mandatory Alembic variables.
# pylint: disable=invalid-name

from alembic import op


# revision identifiers, used by Alembic.
revision = '283ed454353a'
down_revision = '007ee00ff963'

sox_302_notifications = [
    {
        'name': 'sox_302_due_before_1_day',
        'description': 'Notify assessment assignees and verifiers '
                       'that asmt Due Date will come in 1 day'
    },
    {
        'name': 'sox_302_due_before_3_day',
        'description': 'Notify assessment assignees and verifiers '
                       'that asmt Due Date will come in 3 day'
    },
    {
        'name': 'sox_302_due_before_7_day',
        'description': 'Notify assessment assignees and verifiers '
                       'that asmt Due Date will come in 7 day'
    },
    {
        'name': 'sox_302_due_today',
        'description': 'Notify assessment assignees and verifiers '
                       'that asmt Due Date is today'
    },
    {
        'name': 'sox_302_due_expiration',
        'description': 'Notify assessment assignees and verifiers '
                       'that asmt Due Date has passed X days ago'
    }]


def create_notification_type(name, description):
  """Creat new record in notification_types table."""
  op.execute("""
    INSERT INTO notification_types (
      name, description, advance_notice,
      template, instant, created_at, updated_at
    )
    VALUES (
      '{name}',
      '{description}',
      '0',
      '{name}',
      '0', NOW(), NOW()
    )
  """.format(name=name, description=description))


def upgrade():
  """Upgrade database schema and/or data, creating a new revision."""
  for notif in sox_302_notifications:
    create_notification_type(**notif)


def downgrade():
  """Downgrade database schema and/or data back to the previous revision."""
  raise NotImplementedError("Downgrade is not supported")
