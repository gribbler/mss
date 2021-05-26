<template>
  <div>
    <b-row>
      <b-col sm="6">
        <b-form-group label="Enter the zip code of Center of Area" label-for="czipcode">
          <b-form-input
            id="centerZipCode"
            type="text"
            name="czipcode"
            :state="czipcodeState"
            v-model="formValues.czipcode"
            aria-describedby="czipcodeFeedback"
            size="sm"
          ></b-form-input>
          <b-form-invalid-feedback id="czipcodeFeedback">
            <!-- This will only be shown if the preceeding input has an invalid state -->
            Center ZipCode cannot be empty.
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col sm="3">
        <b-form-group label="Enter the Radius(in Mile)" label-for="radius">
          <b-form-input
            id="radius"
            type="number"
            name="radius"
            :state="radiusState"
            v-model="formValues.radius"
            aria-describedby="radiusFeedback"
            size="sm"
          ></b-form-input>
          <b-form-invalid-feedback id="radiusFeedback">
            <!-- This will only be shown if the preceeding input has an invalid state -->
            This field cannot be empty
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col sm="3">
        <b-btn
          variant="success"
          size="sm"
          :enabled="checkAllStates"
          @click="addAttribute()"
        >Find ZipCodes</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ZipCodes from 'zipcodes';

export default {
  name: 'AddAttributeForm',
  data() {
    return {
      formValues: {
        czipcode: ZipCodes.random().zip,
        radius: 0.1,
        czipCodes: [],
      }
    };
  },

  created() {
    this.formValues = {
      czipcode: ZipCodes.random().zip,
      radius: 0.1,
      czipCodes: [],
    };
  },

  methods: {
    addAttribute() {
      // populate zipcode area.
      this.formValues.czipCodes = ZipCodes.radius(this.formValues.czipcode, this.formValues.radius);

      const replica = _.cloneDeep(this.formValues);

      if (this.checkAllStates) {
        this.$emit('add', replica);
        this.resetForm();
      }
    },
    resetForm() {
      this.formValues = {
        czipcode: ZipCodes.random().zip,
        radius: 0.1,
        czipCodes: [],
      };
    },
  },

  computed: {
    checkAllStates() {
      return this.czipcodeState && this.radiusState;
    },

    czipcodeState() {
      if (this.formValues.czipcode == null) return null;
      return this.formValues.czipcode.length === 5;
    },

    radiusState() {
      if (this.formValues.radius == null) return null;
      return true;
    },
  }
};
</script>

<style lang="scss">
@import './../../assets/css/material.scss';

.attribute-right-panel {
  background: #f9f9f9;
  padding: 0.3em 1em 1em 1em;

  .colors-selector {
    max-height: 200px;
    min-height: 200px;
    overflow-y: auto;
  }

  .min-padding {
    padding-left: 0 !important;
  }
}
</style>
