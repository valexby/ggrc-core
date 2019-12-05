/*
 Copyright (C) 2019 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import canMap from 'can-map';
import canComponent from 'can-component';

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
    autoUpdate: false,
    updatableGroupId: null,
    isDirty: false,
    levelNumber: null,
    groupTitle: '',
    people: [],
    backUp: [],
    removePerson({id}) {
      this.attr('isDirty', true);

      const personIndex = this.getPersonIndexById(id);

      this.attr('people').splice(personIndex, 1);

      if (this.attr('autoUpdate')) {
        this.saveChanges();
      }
    },
    personSelected({id, email}) {
      const personIndex = this.getPersonIndexById(id);

      if (personIndex !== -1) {
        return;
      }

      this.attr('isDirty', true);
      this.attr('people').push({id, email});

      if (this.attr('autoUpdate')) {
        this.saveChanges();
      }
    },
    changeEditableGroup({editableMode}) {
      if (!editableMode) {
        this.attr('people', this.getBackUpPeople());
        this.attr('isDirty', false);
      } else {
        this.backUpPeople();
      }
    },
    saveChanges() {
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
    getPersonIndexById(id) {
      return this.attr('people')
        .serialize()
        .findIndex((person) => person.id === id);
    },
  }),
  events: {
    inserted() {
      this.viewModel.backUpPeople();
    },
  },
});
