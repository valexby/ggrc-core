/*
    Copyright (C) 2019 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import Mixin from './mixin';
import {
  isMultiLevelFlow,
} from '../../plugins/utils/verification-flow-utils';

const MAX_LEVELS_COUNT = 10;

export default class MultiLevelVerification extends Mixin {
  cleanUpVerifiers(resource) {
    if (!isMultiLevelFlow(this)) {
      return resource;
    }

    const modelCacheable = this.constructor;
    if (!resource || !modelCacheable) {
      this.attr('review_levels', []);
      return;
    }

    const modelParams = modelCacheable.object_from_resource(resource);
    if (!modelParams) {
      return resource;
    }

    const model = modelCacheable.findInCacheById(modelParams.id);
    if (model) {
      model.attr('review_levels', []);
    }

    return resource;
  }
}

MultiLevelVerification.hasMultiLevelVerificationFlow = true;

MultiLevelVerification.getVerifiersStaticFields = () => {
  return Array.from({length: MAX_LEVELS_COUNT},
    (item, index) => {
      index++;
      return {
        attr_title: `Verifiers level ${index}`,
        attr_name: `verifiers_level_${index}`,
        attr_data_level: index,
        attr_type: 'multiVerificationFlow',
        attr_data_type: 'Person',
        disable_sorting: true,
      };
    }
  );
};

MultiLevelVerification.getReviewLevelsStaticFields = () => {
  return Array.from({length: MAX_LEVELS_COUNT},
    (item, index) => {
      index++;
      return {
        attr_title: `Review level ${index} state`,
        attr_name: `review_level_${index}`,
        attr_data_level: index,
        attr_type: 'multiVerificationFlow',
        attr_data_type: 'String',
        disable_sorting: true,
      };
    }
  );
};
