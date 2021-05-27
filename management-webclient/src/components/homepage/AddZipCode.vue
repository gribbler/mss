<template>
  <div id="custom-attribute">
    <div class="attrib-space"></div>
    <div>
      <add-attribute-form @add="refreshZipCode" />

      <table class="table table-sm attrib-table" v-if="ZipCodes.length > 0">
        <thead>
          <tr>
            <th>ZipCode</th>
            <th>Radius</th>
            <th>Values</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ZipCode, aind) in ZipCodes" v-bind:key="aind">
            <td>{{ZipCode.czipcode}}</td>
            <td>{{ZipCode.radius}}</td>
            <td>{{ZipCode.czipCodes ? ZipCode.czipCodes.join(" , ") : ""}}</td>
            <td>{{ZipCode.czipCodes.length}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="buttons align-right">
      <b-btn variant="primary" size="sm" @click="cancel()">Cancel</b-btn>
      <b-btn variant="success" size="sm" :disabled="ZipCodes.length <= 0" @click="save()">Add</b-btn>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash';
import ZipCodes from 'zipcodes';
import AddAttributeForm from '@/components/homepage/AddAttributeForm.vue';

export default {
  name: 'AddZipCode',
  components: {
    AddAttributeForm
  },
  data() {
    return {
      ZipCodes: [],
      deleteItems: []
    };
  },
  props: {
    zips: { required: true, type: Array, default: false },
  },

  created() {
    this.ZipCodes = [];
    this.deleteItems = [];
  },
  computed: {
    getDeleteItems() {
      return this.deleteItems;
    },
  },

  methods: {
    refreshZipCode(ZipCode) {
      this.ZipCodes = [];
      this.ZipCodes.push(ZipCode);
    },
    getAreaName(code) {
      return ZipCodes.lookup(code);
    },
    cancel() {
      this.ZipCodes = [];
      this.$emit('cancel');
    },
    save() {
      this.ZipCodes.forEach(zipcode => {
        // console.log(zipcode.czipCodes);
        this.$emit('save', zipcode.czipCodes);
      });
    },
    deleteZip() {
      this.$emit('delete', this.deleteItems);
    }
  }
};
</script>

<style lang="scss" scoped>
#custom-attribute {
  .form-row {
    margin: 5px 0px;
  }

  .attrib-space {
    margin-top: 10px;
  }

  .buttons {
    button {
      margin-right: 10px;
    }
  }
}
</style>
