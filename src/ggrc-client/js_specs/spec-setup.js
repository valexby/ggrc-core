/*
 Copyright (C) 2020 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

/*

Spec setup file.
*/

window.GGRC = window.GGRC || {};
GGRC.current_user = GGRC.current_user || {
  id: 1,
  type: 'Person',
};
GGRC.permissions = {
  create: {},
  'delete': {},
  read: {},
  update: {},
};
GGRC.config = {
  snapshotable_parents: ['Audit'],
  snapshotable_objects: [
    'Control',
    'Product',
    'ProductGroup',
    'OrgGroup',
    'Vendor',
    'Risk',
    'Facility',
    'Process',
    'Requirement',
    'DataAsset',
    'AccessGroup',
    'AccountBalance',
    'System',
    'KeyReport',
    'Contract',
    'Standard',
    'Objective',
    'Regulation',
    'Threat',
    'Policy',
    'Market',
    'Metric',
    'TechnologyEnvironment',
  ],
  snapshot_related: [
    'Audit',
    'Assessment',
    'Issue',
  ],
  VERSION: '1.0-Test (abc)',
};
GGRC.Bootstrap = {
  importable: [{
    title_plural: 'Audits',
    model_singular: 'Audit',
  }, {
    title_plural: 'Contracts',
    model_singular: 'Contract',
  }, {
    title_plural: 'Assessments',
    model_singular: 'Assessment',
  }, {
    title_plural: 'Issues',
    model_singular: 'Issue',
  }, {
    title_plural: 'Objectives',
    model_singular: 'Objective',
  }, {
    title_plural: 'People',
    model_singular: 'Person',
  }, {
    title_plural: 'Policies',
    model_singular: 'Policy',
  }, {
    title_plural: 'Programs',
    model_singular: 'Program',
  }, {
    title_plural: 'Projects',
    model_singular: 'Project',
  }, {
    title_plural: 'Requirements',
    model_singular: 'Requirement',
  }, {
    title_plural: 'Task Groups',
    model_singular: 'TaskGroup',
  }, {
    title_plural: 'Task Group Tasks',
    model_singular: 'TaskGroupTask',
  }, {
    title_plural: 'Workflows',
    model_singular: 'Workflow',
  }],
};
GGRC.custom_attr_defs = GGRC.custom_attr_defs || [];

GGRC.access_control_roles = GGRC.access_control_roles || [];
