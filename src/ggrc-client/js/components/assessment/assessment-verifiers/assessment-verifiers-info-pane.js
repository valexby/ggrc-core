/*
 Copyright (C) 2019 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import canMap from 'can-map';
import canComponent from 'can-component';
import canStache from 'can-stache';
import loFind from 'lodash/find';
import template from './templates/assessment-verifiers-info-pane.stache';
import './assessment-verifiers';
import './assessment-verifiers-group';

export default canComponent.extend({
  tag: 'assessment-verifiers-info-pane',
  leakScope: true,
  view: canStache(template),
  viewModel: canMap.extend({
    instance: {},
    deferredSave: null,
    isReadonly: false,
    updatableGroupId: null,
    saveVerifiers({levelNumber, people}) {
      const reviewLevels = this.attr('instance.review_levels');
      const updatedReviewLevel = loFind(reviewLevels, (reviewLevel) => {
        return reviewLevel.level_number === levelNumber;
      });

      updatedReviewLevel.attr('users', people);

      this.attr('deferredSave').push(() => {
        this.attr('updatableGroupId', levelNumber);
      }).always(() => {
        this.attr('updatableGroupId', null);
      });
    },
  }),
});
