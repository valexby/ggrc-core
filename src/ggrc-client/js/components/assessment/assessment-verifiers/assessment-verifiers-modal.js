/*
 Copyright (C) 2019 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import canMap from 'can-map';
import canComponent from 'can-component';
import canStache from 'can-stache';
import template from './templates/assessment-verifiers-modal.stache';
import {
  getReviewLevelByNumber,
} from '../../../plugins/utils/verification-flow-utils';
import './assessment-verifiers';
import './assessment-verifiers-group';

export default canComponent.extend({
  tag: 'assessment-verifiers-modal',
  leakScope: true,
  view: canStache(template),
  viewModel: canMap.extend({
    instance: {},
    isReadonly: false,
    saveVerifiers({levelNumber, people}) {
      const updatedReviewLevel = getReviewLevelByNumber(
        this.attr('instance'),
        levelNumber
      );
      updatedReviewLevel.attr('users', people);
    },
  }),
});
