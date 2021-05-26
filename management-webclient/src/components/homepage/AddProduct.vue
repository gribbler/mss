
<template>
  <div id="add-product">
    <div>
      <div class="product-head">
        <b-row>
          <b-col>
            <h2 v-if="!this.data">New Product</h2>
            <h2 v-else>Edit Product</h2>
          </b-col>
        </b-row>
      </div>

      <br />

      <div>
        <!-- Product Name -->
        <b-form-group horizontal :label-cols="2" label="Product Name" label-for="productName">
          <b-form-select
            id="productName"
            type="text"
            name="productName"
            :state="productNameState"
            v-model="product.productName"
            placeholder="Enter name of the product"
            aria-describedby="productNameFeedback"
            size="sm"
          >
            <option
              :value="sub.name"
              v-for="(sub, sid) in refproductName"
              v-bind:key="sid"
            >{{sub.name}}</option>
            </b-form-select>
          <b-form-invalid-feedback id="productNameFeedback">
            <!-- This will only be shown if the preceeding input has an invalid state -->
            This field cannot be empty
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Price -->
        <b-form-group horizontal :label-cols="2" label="Price" label-for="price">
          <b-row>
            <b-col sm="4">
              <b-form-input
              id="value"
              type="text"
              name="value"
              :state="priceValueState"
              v-model="filteredPrice.value"
              placeholder="Enter the price each"
              aria-describedby="priceValueFeedback"
              size="sm"
              />
            </b-col>
            <b-col sm="4">
              <b-form-input
              id="amount"
              type="text"
              name="amount"
              :state="priceAmountState"
              v-model="filteredPrice.amount"
              placeholder="Enter the price limit"
              aria-describedby="priceAmountFeedback"
              size="sm"
              />
            </b-col>
            <b-col sm="4">
              <b-form-select
                id="varies"
                type="text"
                name="varies"
                :state="priceVariesState"
                v-model="selPrice"
                aria-describedby="priceVariesFeedback"
                size="sm"
              >
                <option
                  :value="sid"
                  v-for="(sub, sid) in product.price"
                  v-bind:key="sid"
                >{{sid}}</option>
                </b-form-select>
            </b-col>
          </b-row>
        </b-form-group>

        <!-- InStock -->
        <b-form-group horizontal :label-cols="2" label="InStock" label-for="instock">
          <b-form-input
            id="instock"
            type="text"
            name="instock"
            :state="instockState"
            v-model="product.inStock"
            placeholder="Enter the instock"
            aria-describedby="instockFeedback"
            size="sm"
          ></b-form-input>

          <b-form-invalid-feedback id="instockFeedback">
            <!-- This will only be shown if the preceeding input has an invalid state -->
            The value of this field must bigger than 0.
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Zip Code -->
        <b-form-group horizontal :label-cols="2" label="Delivery Areas">
          <b-row style="padding-bottom:10px">
            <b-col sm="8">
              <b-form-select
                id="areatoadd"
                type="text"
                name="areatoadd"
                v-model="areaToAdd"
                size="sm"
              >
                <option
                  :value="sub.areaName"
                  v-for="(sub, sid) in refDeliveryArea"
                  v-bind:key="sid"
                >{{sub.areaName}}</option>
                </b-form-select>
            </b-col>
            <b-col sm="2">
              <b-btn size="sm" class="btn-success" @click="addDeliveryArea()">Add Delivery Area</b-btn>
            </b-col>
            <b-col sm="2">
              <b-btn size="sm" class="btn-danger" @click="deleteDeliveryArea()">Delete Delivery Area</b-btn>
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
                v-for="(sub, sid) in product.deliveryArea"
                v-bind:key="sid"
              >{{sub}}</option>
            </b-form-select>
          </b-row>
        </b-form-group>

        <!-- In Sale  -->
        <b-form-group horizontal :label-cols="2" label="Sale Status" label-for="sku">
          <toggle-button v-model="product.inSale" :labels="{checked: 'On', unchecked: 'Off'}" />
        </b-form-group>
      </div>

      <div class="form-group">
        <div class="col-sm-10 col-sm-offset-2">
          <button
            v-if="this.data != null"
            type="button"
            @click="handleEditProduct()"
            class="btn btn-success btn-sm"
          >Save Edit</button>
          <button
            v-else
            type="button"
            @click="handleAddProduct()"
            class="btn btn-success btn-sm"
          >Save New</button>
          &nbsp;
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click="goBack()"
          >Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash';

export default {
  name: 'AddProduct',
  data() {
    return {
      fAddDelete: false,
      selPrice: 'Little',
      showAttributes: false,
      product: {
        productName: '',
        price: {
          Little: {
            value: 0,
            amount: 0,
          },
          Normal: {
            value: 0,
            amount: 0,
          },
          Many: {
            value: 0,
            amount: 0,
          }
        },
        inStock: 1,
        inSale: false,
        deliveryArea: [],
      },
      selectItems: [],
      areaToAdd: ''
    };
  },
  props: {
    data: { required: false, type: Object, default: null }
  },
  created() {
    this.$store.dispatch('deliveryareaStore/getDAreas');
    if (this.data != null) {
      // Assign in assigns the values from data to product. This helps reduce the undefined errors by keeping the
      // defaults of product.
      this.product = _.assignIn(this.product, this.data);
    }
    this.selectItems = [];
  },
  computed: {
    refDeliveryArea() {
      return this.$store.getters['deliveryareaStore/getDeliveryAreas'];
    },
    refproductName() {
      return this.$store.getters['adminStore/allProducts'];
    },
    productNameState() {
      return this.product.productName.length > 0;
    },
    priceValueState() {
      if (this.filteredPrice.value == null) return null;
      return this.filteredPrice.value > 0;
    },
    priceAmountState() {
      if (this.filteredPrice.amount == null) return null;
      return this.filteredPrice.amount > 0;
    },
    priceVariesState() {
      if (this.selPrice == null) return null;
      return this.selPrice.length > 0;
    },
    instockState() {
      if (this.product.inStock == null) return null;
      return this.product.inStock > 0;
    },
    deliveryAreaState() {
      if (this.product.deliveryArea == null) return null;
      return (this.product.deliveryArea.length > 0);
    },
    filteredPrice() {
      switch (this.selPrice) {
        default: case 'Little': return this.product.price.Little;
        case 'Normal': return this.product.price.Normal;
        case 'Many': return this.product.price.Many;
      }
    }
  },
  methods: {
    validateForm() {
      return (
        this.productNameState
        && this.priceValueState
        && this.priceAmountState
        && this.priceVariesState
        && this.instockState
        && this.deliveryAreaState
      );
    },
    addDeliveryArea() {
      if ($.inArray(this.areaToAdd, this.product.deliveryArea) === -1) { this.product.deliveryArea.push(this.areaToAdd); }
      console.log(this.areaToAdd);
    },
    deleteDeliveryArea() {
      this.selectItems.forEach(item => {
        this.product.deliveryArea.splice(this.product.deliveryArea.indexOf(item), 1);
      });
    },
    goBack() {
      this.$emit('cancelTrigger');
    },
    async handleAddProduct() {
      if (!this.validateForm()) return;
      try {
        await this.$store.dispatch('adminStore/addSaleProduct', this.product).then(() => {
          this.$notify({
            group: 'all',
            type: 'success',
            text: 'New data saved successfully.'
          });
        }).catch((err) => {
          this.$notify({
            group: 'all',
            type: 'error',
            text: 'There was an error while saving New data.\n'+err
          });
        });
        this.$emit('cancelTrigger');
      } catch (err) {
        this.$notify({
          group: 'all',
          type: 'error',
          text: 'There was an error while saving New data.'
        });
      }
    },
    async handleEditProduct() {
      if (!this.validateForm()) return;
      try {
        await this.$store.dispatch('adminStore/editSaleProduct', this.product).then(() => {
          this.$notify({
            group: 'all',
            type: 'success',
            text: 'Edit data saved successfully.'
          });
        }).catch((err) => {
          this.$notify({
            group: 'all',
            type: 'error',
            text: 'There was an error while saving Edit data.\n'+err
          });
        });;
        this.$store.commit('adminStore/resetSaleProducts');
        this.$emit('cancelTrigger');
      } catch (err) {
        this.$notify({
          group: 'all',
          type: 'error',
          text: 'There was an error while updating data.'
        });
      }
    },
  }
};
</script>

<style lang="scss" >
.product-head {
  margin-top: 1em;
}

#add-product {
  .modal-dialog {
    max-width: 80% !important;
  }
}

.attrib-table {
  font-size: 0.875rem;
  margin: 10px 0px;
}

.menubar {
  margin-bottom: 1rem;
  -webkit-transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
}

.menubar__button {
  font-weight: 700;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  background: rgba(0, 0, 0, 0);
  border: 0;
  color: #000;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;

  &.is-active {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
