/*
 Copyright (C) 2019 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import loHead from 'lodash/head';
import loFind from 'lodash/find';

const VERIFICATION_FLOWS = {
  STANDARD: 'STANDARD',
  SOX_302: 'SOX302',
  MULTI_LEVEL: 'MLV',
};

const getAssessmentFlows = () => {
  return Object.keys(VERIFICATION_FLOWS).map((key) => VERIFICATION_FLOWS[key]);
};

const isStandardFlow = (instance) => {
  return instance.attr('verification_workflow') === VERIFICATION_FLOWS.STANDARD;
};

const isSox302Flow = (instance) => {
  return instance.attr('verification_workflow') === VERIFICATION_FLOWS.SOX_302;
};

const isMultiLevelFlow = (instance) => {
  return instance.attr('verification_workflow') ===
    VERIFICATION_FLOWS.MULTI_LEVEL;
};

const getFlowDisplayName = (instance) => {
  return instance.attr('verification_workflow');
};

const getInReviewLevel = (instance) => {
  const inReviewLevels = instance.attr('review_levels')
    .filter((reviewLevel) => reviewLevel.status === 'In Review');
  return loHead(inReviewLevels);
};

const getReviewLevelByNumber = (instance, levelNumber) => {
  const reviewLevels = instance.attr('review_levels');
  const reviewLevel = loFind(
    reviewLevels,
    (reviewLevel) => reviewLevel.level_number === levelNumber
  );

  return reviewLevel;
};

export {
  isStandardFlow,
  isSox302Flow,
  isMultiLevelFlow,
  getAssessmentFlows,
  getFlowDisplayName,
  getInReviewLevel,
  getReviewLevelByNumber,
};
