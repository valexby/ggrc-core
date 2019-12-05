/*
    Copyright (C) 2019 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import Mixin from './mixin';
import {isMultiLevelFlow} from '../../plugins/utils/verification-flow-utils';

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
