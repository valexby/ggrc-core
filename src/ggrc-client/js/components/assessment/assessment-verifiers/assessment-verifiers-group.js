/*
 Copyright (C) 2019 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import canMap from 'can-map';
import canComponent from 'can-component';
import loFindIndex from 'lodash/findIndex';

export default canComponent.extend({
  tag: 'assessment-verifiers-group',
  leakScope: true,
  viewModel: canMap.extend({
    define: {
      canEdit: {
        get() {
          return !this.attr('readonly') && !this.attr('isLoading');
        },
      },
      isLoading: {
        get() {
          return this.attr('updatableGroupId') === this.attr('levelNumber');
        },
      },
    },
    verifiersGroup: {},
    readonly: false,
    updatableGroupId: null,
    isDirty: false,
    levelNumber: null,
    groupTitle: '',
    people: [],
    backUp: [],
    removePerson({person}) {
      this.attr('isDirty', true);

      const personId = loFindIndex(this.attr('people'), {id: person.id});
      this.attr('people').splice(personId, 1);
    },
    personSelected({person: {id, email}}) {
      this.attr('isDirty', true);
      this.attr('people').push({id, email});
    },
    changeEditableGroup({editableMode}) {
      if (!editableMode) {
        this.attr('people', this.getBackUpPeople());
        this.attr('isDirty', false);
      } else {
        this.backUpPeople();
      }
    },
    saveChanges(event) {
      if (!this.attr('isDirty')) {
        return;
      }

      this.attr('isDirty', false);

      this.dispatch({
        type: 'saveVerifiers',
        levelNumber: this.attr('levelNumber'),
        people: this.attr('people'),
      });
    },
    backUpPeople() {
      this.attr('backUp', this.attr('people').serialize());
    },
    getBackUpPeople() {
      const backUp = this.attr('backUp').serialize();
      this.attr('backUp', []);
      return backUp;
    },
  }),
  events: {
    inserted() {
      this.viewModel.backUpPeople();
    },
  },
});
