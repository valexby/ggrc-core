/*
 Copyright (C) 2019 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import canStache from 'can-stache';
import canMap from 'can-map';
import canComponent from 'can-component';
import template from './templates/tree-item-multi-verification-flow.stache';
import Person from '../../models/business-models/person';
import {
  isMultiLevelFlow,
  getReviewLevelByNumber,
} from '../../plugins/utils/verification-flow-utils';

export default canComponent.extend({
  tag: 'tree-item-multi-verification-flow',
  view: canStache(template),
  leakScope: true,
  viewModel: canMap.extend({
    instance: null,
    attrDataLevel: null,
    attrDataType: '',
    verifiers: [],
    verifierType: Person,
    reviewState: '',
    renderAttr() {
      const instance = this.attr('instance');
      if (!isMultiLevelFlow(instance)) {
        return;
      }

      const attrDataType = this.attr('attrDataType');
      const attrDataLevel = this.attr('attrDataLevel');

      const reviewLevel = getReviewLevelByNumber(instance, attrDataLevel);
      if (!reviewLevel) {
        return;
      }

      if (attrDataType === 'Person') {
        const verifiers = reviewLevel ? reviewLevel.attr('users') : [];
        this.attr('verifiers', verifiers);
      } else {
        this.attr('reviewState', reviewLevel.attr('status'));
      }
    },
  }),
  events: {
    inserted() {
      this.viewModel.renderAttr();
    },
    '{viewModel.instance.review_levels} change'() {
      this.viewModel.renderAttr();
    },
  },
});
