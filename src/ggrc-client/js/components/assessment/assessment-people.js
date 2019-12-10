/*
 Copyright (C) 2019 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import canStache from 'can-stache';
import canMap from 'can-map';
import canComponent from 'can-component';
import {ROLES_CONFLICT} from '../../events/event-types';
import './assessment-custom-roles';
import '../custom-roles/custom-roles-modal';
import template from './templates/assessment-people.stache';
import {isMultiLevelFlow} from '../../plugins/utils/verification-flow-utils';

const ASSESSMENT_MAIN_ROLES = {
  creators: 'Creators',
  assignees: 'Assignees',
  verifiers: 'Verifiers',
};

export default canComponent.extend({
  tag: 'assessment-people',
  view: canStache(template),
  leakScope: false,
  viewModel: canMap.extend({
    define: {
      emptyMessage: {
        type: 'string',
        value: '',
      },
    },
    rolesConflict: false,
    infoPaneMode: true,
    instance: {},
    isSecondaryRoles: false,
    deferredSave: null,
    isNewInstance: false,
    onStateChangeDfd: $.Deferred().resolve(),
    conflictRoles: [
      ASSESSMENT_MAIN_ROLES.assignees,
      ASSESSMENT_MAIN_ROLES.verifiers,
    ],
    orderOfRoles: [
      ASSESSMENT_MAIN_ROLES.creators,
      ASSESSMENT_MAIN_ROLES.assignees,
      ASSESSMENT_MAIN_ROLES.verifiers,
    ],
    setInProgress: $.noop(),
    includedMainRoles: [],
    excludedMainRoles: [],
    setIncludedExcludedRoles() {
      const mainRoles = [
        ASSESSMENT_MAIN_ROLES.creators,
        ASSESSMENT_MAIN_ROLES.assignees,
        ASSESSMENT_MAIN_ROLES.verifiers,
      ];

      this.attr('excludedMainRoles', mainRoles);

      this.attr('includedMainRoles',
        isMultiLevelFlow(this.attr('instance'))
          ? [ASSESSMENT_MAIN_ROLES.creators, ASSESSMENT_MAIN_ROLES.assignees]
          : mainRoles
      );
    },
  }),
  events: {
    [`{instance} ${ROLES_CONFLICT.type}`]: function (ev, args) {
      this.viewModel.attr('rolesConflict', args.rolesConflict);
    },
    init() {
      this.viewModel.setIncludedExcludedRoles();
    },
    '{viewModel} instance'() {
      this.viewModel.setIncludedExcludedRoles();
    },
  },
});
