<template>
  <div class="col-md-12">
    <div class="row justify-content-left">
      <div v-if="!this.viewOperation" class="col-md-12">
        <div class="card">
          <header class="card-header">
            <div class="row">
              <div class="col-3">
                <h4 class="card-title mt-2">Delivery Areas</h4>
              </div>

              <div class="col-9 align-right">
                <button
                  v-if="!this.viewOperation"
                  type="button"
                  class="au-btn au-btn-icon au-btn--green"
                  @click="handleAddButtonClick()"
                >+ New</button>
              </div>
            </div>
          </header>
          <article class="card-body">
            <input class="form-control" v-model="query" type="text" placeholder="Search Delivery Areas">
            <table id="content_loop" class="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Zip Codes</th>
                  <th>Zip Codes Size</th>
                  <th>Delivery Cost</th>
                  <th>Minimum Purchase</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="areas.length > 0">
                <tr
                  v-for="(area, aind) in areas"
                  v-bind:key="aind"
                  v-if="area.areaName.toUpperCase().includes(query.toUpperCase())"
                >
                  <td>{{area.areaName}}</td>
                  <td>
                    <div v-if="area.zipCodes.length > 5">{{area.zipCodes.slice(0,5).join(', ')}} ...</div>
                    <div v-else>{{area.zipCodes.join(', ')}}</div>
                  </td>
                  <td>{{area.zipCodes.length}}</td>
                  <td>$ {{area.deliverCost?area.deliverCost:0}}</td>
                  <td>{{area.minimumPurchase?area.minimumPurchase:0}}</td>
                  <td>
                    &nbsp;
                    <a @click="editDeliveryArea(area)">
                      <i class="fa fa-edit" style="color:green"></i>
                    </a>
                    &nbsp;
                    <a @click="deleteDeliveryArea(area._id)">
                      <i class="fa fa-trash" style="color:red"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  No Data available.
                </tr>
              </tbody>
            </table>
          </article>
          <!-- card-body end .// -->
        </div>
        <!-- card.// -->
      </div>
      <div div v-if="this.viewOperation" class="col-md-12">
        <div class="card">
          <header class="card-header">
            <h4 v-if="!this.isAddView" class="card-title mt-2">Edit Delivery Area</h4>
            <h4 v-else class="card-title mt-2">Add Delivery Area</h4>
          </header>
          <article class="card-body">
            <div>
              <!-- Delivery Area Name -->
              <b-form-group horizontal :label-cols="2" label="Delivery Area Name" label-for="name">
                <b-form-input
                  id="name"
                  type="text"
                  name="name"
                  :state="nameState"
                  v-model="deliveryArea.areaName"
                  placeholder="Enter name of Delivery Area"
                  aria-describedby="nameFeedback"
                  size="sm"
                ></b-form-input>

                <b-form-invalid-feedback id="nameFeedback">
                  <!-- This will only be shown if the preceeding input has an invalid state -->
                  This field cannot be empty
                </b-form-invalid-feedback>
              </b-form-group>

              <!-- Zip Code -->
              <b-form-group horizontal :label-cols="2" label="Delivery ZipCodes">
                <b-row style="padding-bottom:10px">
                  <b-col sm="6">
                    <b-btn size="sm" class="btn-success" @click="showAttributes=true">Add ZipCode</b-btn>
                  </b-col>
                  <b-col sm="6">
                    <b-btn size="sm" class="btn-danger" @click="deleteZipCode()">Delete ZipCode</b-btn>
                  </b-col>
                </b-row>
                <b-row>
                  <b-form-select
                  v-model="selectItems"
                  multiple
                  :select-size="6"
                  >
                    <option
                      :value="sub"
                      v-for="(sub, sid) in deliveryArea.zipCodes"
                      v-bind:key="sid"
                    >({{sub}}) {{getAreaName(sub).city}} {{getAreaName(sub).state}} {{getAreaName(sub).country}}</option>
                  </b-form-select>
                </b-row>

                <b-modal
                  v-model="showAttributes"
                  centered
                  id="modal1"
                  title="Add ZipCode"
                  hide-footer
                  size="lg"
                >
                  <add-zip-code
                    v-if="showAttributes"
                    :zips="deliveryArea.zipCodes"
                    @cancel="showAttributes = false"
                    @save="saveZipCode"
                  />
                </b-modal>

              </b-form-group>

              <!-- Delivery Cost -->
              <b-form-group horizontal :label-cols="2" label="Price" label-for="price">
                <b-form-input
                  id="price"
                  type="text"
                  name="price"
                  :state="priceState"
                  v-model="deliveryArea.deliverCost"
                  placeholder="Enter the delivery cost"
                  aria-describedby="priceFeedback"
                  size="sm"
                ></b-form-input>

                <b-form-invalid-feedback id="priceFeedback">
                  <!-- This will only be shown if the preceeding input has an invalid state -->
                  The value of this field must bigger than 0.
                </b-form-invalid-feedback>
              </b-form-group>

              <!-- Minimum Purchase -->
              <b-form-group horizontal :label-cols="2" label="Minimum Purchase" label-for="minimumPurchase">
                <b-form-input
                  id="minimumPurchase"
                  type="text"
                  name="minimumPurchase"
                  :state="minimumPurchaseState"
                  v-model="deliveryArea.minimumPurchase"
                  placeholder="Enter the Minimum Purchase"
                  aria-describedby="minimumPurchaseFeedback"
                  size="sm"
                ></b-form-input>

                <b-form-invalid-feedback id="minimumPurchaseFeedback">
                  <!-- This will only be shown if the preceeding input has an invalid state -->
                  The value of this field must bigger than 0.
                </b-form-invalid-feedback>
              </b-form-group>


              <div class="form-group">
                <div class="col-sm-10 col-sm-offset-2">
                  <button
                    v-if="!this.isAddView"
                    type="button"
                    @click="handleEditDeliveryArea()"
                    class="btn btn-success btn-sm"
                  >Save Edit</button>
                  <button
                    v-else
                    type="button"
                    @click="handleAddDeliveryArea()"
                    class="btn btn-success btn-sm"
                  >Save New</button>
                  &nbsp;
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="handleCancel()"
                  >Cancel</button>
                </div>
              </div>
            </div>
          </article>
          <!-- card-body end .// -->
        </div>
        <!-- card.// -->
      </div>

      <!-- col.//-->
    </div>
    <!-- row.//-->
  </div>
</template>

<script>
import ZipCodes from 'zipcodes';
import AddZipCode from '../homepage/AddZipCode';

export default {
  components: {
    AddZipCode
  },
  data() {
    return {
      selectItems: [],
      deliveryArea: {
        areaName: '',
        zipCodes: [],
        deliverCost: 0,
        minimumPurchase: 0
      },
      showAttributes: false,
      fAddDelete: false,
      query: '',
      isAddView: false,
      viewOperation: false,
    };
  },
  async created() {
    await this.$store.dispatch('deliveryareaStore/getDAreas');
    this.deliveryArea = { areaName: '', zipCodes: [] };
  },
  computed: {
    areas() {
      // console.log(this.$store.getters['deliveryareaStore/getDeliveryAreas']);
      return this.$store.getters['deliveryareaStore/getDeliveryAreas'].sort((a, b) => {
        const nameA = a.areaName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.areaName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    },
    nameState() {
      return this.deliveryArea.areaName.length > 0;
    },
    priceState() {
      return this.deliveryArea.deliverCost > 0;
    },
    minimumPurchaseState() {
      return this.deliveryArea.minimumPurchase > 0;
    }
  },
  methods: {
    saveZipCode(code) {
      code.forEach(item => {
        this.deliveryArea.zipCodes.push(item);
      });
      // check if there is any duplication in array.
      const temp = [];
      this.deliveryArea.zipCodes.forEach(code => {
        temp.push(code);
      });
      this.deliveryArea.zipCodes = [];
      temp.forEach(item => {
        if ($.inArray(item, this.deliveryArea.zipCodes) === -1) this.deliveryArea.zipCodes.push(item);
      });
      this.showAttributes = false;
    },
    deleteZipCode() {
      if (!this.selectItems.length) {
        this.$notify({
          group: 'all',
          type: 'error',
          text: 'You must select one or more zipcodes.',
        });
      }
      this.selectItems.forEach(item => {
        if (this.deliveryArea.zipCodes.indexOf(item) > -1) { this.deliveryArea.zipCodes.splice(this.deliveryArea.zipCodes.indexOf(item), 1); }
      });
    },
    getAreaName(code) {
      return ZipCodes.lookup(code);
    },
    async deleteDeliveryArea(aName) {
      try {
        await this.$store.dispatch('deliveryareaStore/deleteArea', aName);
        this.$notify({
          group: 'all',
          type: 'success',
          text: 'Successfully Removed',
        });
      } catch (err) {
        this.$notify({
          group: 'all',
          type: 'error',
          text: 'Error Removing Delivery Area',
        });
      }
    },
    editDeliveryArea(areaData) {
      this.viewOperation = true;
      this.deliveryArea = _.cloneDeep(areaData);
      this.isAddView = false;
    },
    handleAddButtonClick() {
      this.viewOperation = true;
      this.isAddView = true;
    },
    handleCancel() {
      this.deliveryArea = {
        areaName: '',
        zipCodes: []
      };
      this.viewOperation = false;
    },
    async handleAddDeliveryArea() {
      try {
        // console.log(this.deliveryArea);
        await this.$store.dispatch('deliveryareaStore/addDAreas', this.deliveryArea).then((data) => {
          if (data.status == 'success') {
            this.$notify({
              group: 'all',
              type: 'success',
              text: data.responseData,
            });
          } else {
            this.$notify({
              group: 'all',
              type: 'error',
              text: data.errorDetails,
            });
          }
        });

        this.viewOperation = false;
        this.deliveryArea = {
          areaName: '',
          zipCodes: [],
          deliverCost: 0,
          minimumPurchase: 0
        };
      } catch (err) {
        this.$notify({
          group: 'all',
          type: 'error',
          text: 'There was an error adding Delivery Area',
        });
      }
    },
    async handleEditDeliveryArea() {
      try {
        await this.$store.dispatch('deliveryareaStore/editDAreas', this.deliveryArea).then((data) => {
          if (data.status == 'success') {
            this.$notify({
              group: 'all',
              type: 'success',
              text: data.responseData,
            });
          } else {
            this.$notify({
              group: 'all',
              type: 'error',
              text: data.errorDetails,
            });
          }
        });
        this.viewOperation = false;
        this.deliveryArea = {
          areaName: '',
          zipCodes: [],
          deliverCost: 0,
          minimumPurchase: 0
        };
      } catch (err) {
        this.$notify({
          group: 'all',
          type: 'error',
          text: 'Edit Failed',
        });
      }
    },
  },
};
</script>

<style>
</style>
