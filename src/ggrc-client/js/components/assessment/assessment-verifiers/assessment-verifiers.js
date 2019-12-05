/*
 Copyright (C) 2019 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import canMap from 'can-map';
import canComponent from 'can-component';
import loSortBy from 'lodash/sortBy';
import {getOrdinalNumber} from '../../../plugins/ggrc-utils';

export default canComponent.extend({
  tag: 'assessment-verifiers',
  leakScope: true,
  viewModel: canMap.extend({
    instance: {},
    verifiersGroups: [],

    buildVerifiersGroups(instance) {
      const sortedReviewLevels = loSortBy(
        instance.attr('review_levels'),
        'level_number'
      );

      const verifiersGroups = sortedReviewLevels.map((reviewLevel) => {
        const levelNumber = reviewLevel.attr('level_number');
        const levelNumberToDisplay = getOrdinalNumber(levelNumber);
        return {
          levelNumber,
          people: reviewLevel.attr('users').serialize(),
          verifiedBy: reviewLevel.attr('verified_by'),
          completedAt: reviewLevel.attr('completed_at'),
          groupTitle: `Verifiers ${levelNumberToDisplay} level`,
          reviewState: reviewLevel.attr('status'),
        };
      });

      return verifiersGroups;
    },
  }),
  events: {
    buildVerifiersGroups() {
      const instance = this.viewModel.attr('instance');
      const groups = this.viewModel.buildVerifiersGroups(instance);

      this.viewModel.attr('verifiersGroups', groups);
    },
    inserted() {
      this.buildVerifiersGroups();
    },
    '{viewModel} instance'() {
      this.buildVerifiersGroups();
    },
    '{viewModel.instance} updated'() {
      this.buildVerifiersGroups();
    },
  },
});
