/*
  Copyright (C) 2020 Google Inc.
  Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import loDifference from 'lodash/difference';
import TreeViewConfig from '../base-widgets';
import {externalDirectiveObjects} from '../../plugins/models-types-collections';

describe('base widgets', () => {
  const excludeMappingConfig = [
    'AssessmentTemplate',
    'Evidence'];
  const snapshotWidgetsConfig = GGRC.config.snapshotable_objects || [];
  const allCoreTypes = [
    'AccessGroup',
    'AccountBalance',
    'Assessment',
    'AssessmentTemplate',
    'Audit',
    'Contract',
    'Control',
    'DataAsset',
    'Document',
    'Evidence',
    'Facility',
    'Issue',
    'KeyReport',
    'Market',
    'Metric',
    'Objective',
    'OrgGroup',
    'Person',
    'Policy',
    'Process',
    'Product',
    'ProductGroup',
    'Program',
    'Project',
    'Regulation',
    'Requirement',
    'Risk',
    'Standard',
    'System',
    'TechnologyEnvironment',
    'Threat',
    'Vendor',
    'Workflow',
    'CycleTaskGroupObjectTask',
  ];
  const excludedSubTreeValues = {
    AccessGroup: ['AccessGroup'],
    Audit: loDifference(allCoreTypes, [...snapshotWidgetsConfig,
      'Assessment',
      'Person',
      'Program',
      'Issue',
      ...excludeMappingConfig]),
    Contract: ['Contract'],
    Assessment: loDifference(allCoreTypes, [...snapshotWidgetsConfig,
      'Audit',
      'Issue',
      'Evidence']),
    AssessmentTemplate: loDifference(allCoreTypes, ['Audit']),
    Document: ['Audit', 'Assessment', 'Document',
      'Person'],
    Evidence: loDifference(allCoreTypes, ['Audit', 'Assessment']),
    Issue: excludeMappingConfig,
    Person: ['Person', 'AssessmentTemplate'],
    Policy: ['Policy'],
    Program: ['Program', 'Assessment'],
    Regulation: externalDirectiveObjects,
    Standard: externalDirectiveObjects,
    AccountBalance: excludeMappingConfig,
    Control: excludeMappingConfig,
    DataAsset: excludeMappingConfig,
    Facility: excludeMappingConfig,
    KeyReport: excludeMappingConfig,
    Market: excludeMappingConfig,
    Metric: excludeMappingConfig,
    Objective: excludeMappingConfig,
    OrgGroup: excludeMappingConfig,
    Process: excludeMappingConfig,
    Product: excludeMappingConfig,
    ProductGroup: excludeMappingConfig,
    Project: excludeMappingConfig,
    Requirement: excludeMappingConfig,
    System: excludeMappingConfig,
    Risk: excludeMappingConfig,
    TechnologyEnvironment: excludeMappingConfig,
    Threat: excludeMappingConfig,
    Vendor: excludeMappingConfig,
  };

  const types = Object.keys(excludedSubTreeValues);

  describe('TreeViewConfig', () => {
    types.forEach((type) => {
      it(`does not contain excluded values for ${type} type`, () => {
        const subTree = TreeViewConfig.base_widgets_by_type[type];
        let excludedTypes = excludedSubTreeValues[type];

        excludedTypes.forEach((excluded) => {
          expect(subTree).not.toContain(excluded);
        });
      });
    });
  });
});
