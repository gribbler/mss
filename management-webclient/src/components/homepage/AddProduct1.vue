
<template>
  <div id="add-product">
    <div>
      <div class="product-head">
        <b-row>
            <h2 v-if="!this.pData">New Product</h2>
            <h2 v-else>Edit Product</h2>
        </b-row>
      </div>

      <br />

      <div>
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
          <b-form-input
            id="price"
            type="text"
            name="price"
            :state="priceState"
            v-model="product.price"
            placeholder="Enter the price"
            aria-describedby="priceFeedback"
            size="sm"
          ></b-form-input>

          <b-form-invalid-feedback id="priceFeedback">
            <!-- This will only be shown if the preceeding input has an invalid state -->
            The price of product must bigger than 0.
          </b-form-invalid-feedback>
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
        <b-form-group horizontal :label-cols="2" label="Zip Code" label-for="zipcode">
          <b-row>
            <b-col sm="2">
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="showAttributes = true"
              >Add ZipCode</button>
            </b-col>
          </b-row>
          <b-modal
            v-model="showAttributes"
            centered
            id="modal1"
            title="Add Attributes"
            hide-footer
            size="lg"
          >
          </b-modal>

        </b-form-group>

      </div>

      <div class="form-group">
        <div class="col-sm-10 col-sm-offset-2">
          <button
            v-if="this.pData != null"
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
import AddZipCode from './AddZipCode.vue';

export default {
  props: {
    pData: { required: false, type: Object, default: null },
  },
  components: {
    AddZipCode
  },
  created() {
    if (this.pData != null) {
      // Assign in assigns the values from data to product. This helps reduce the undefined errors by keeping the
      // defaults of product.
      this.product = _.assignIn(this.product, this.pData);
    } else {
      this.product = _.assignIn(this.product, this.data.product);
    }

    this.showZipCode = false;

    this.editZipcodeData = {
      czipCode: '',
      radius: ''
    };
  },
  computed: {
    data() {
      return {
        showAttributes: false,
        showZipCode: false,
        product: {
          productName: this.refproductName[0].name,
          price: 1,
          inStock: 1,
          ZipCodes: [{
            czipCode: '',
            radius: ''
          }],
        },
        editZipcodeData: {
          czipCode: '',
          radius: ''
        }
      };
    },
    refuserName() {
      return this.$store.getters['authStore/getName'];
    },
    refzipCode() {
      return this.$store.getters['adminStore/allVendorData'];
    },
    refproductName() {
      return this.$store.getters['adminStore/allProducts'];
    },
    productNameState() {
      return this.product.productName.length > 0;
    },
    priceState() {
      if (this.product.price == null) return null;
      return this.product.price > 0;
    },
    instockState() {
      if (this.product.inStock == null) return null;
      return this.product.inStock > 0;
    },
    zipcodeState() {
      if (this.product.ZipCodes == null) return null;
      return (this.product.ZipCodes.czipCode == null.length === 5) && (this.product.ZipCodes.czipCode.length > 0);
    },
  },
  methods: {
    validateForm() {
      return (
        this.productNameState
        && this.priceState
        && this.instockState
        && this.zipcodeState
      );
    },
    cancelZipCode() {
      console.log('msg from cancel');
      this.showZipCode = false;
    },

    saveZipCode(zipCode) {
      console.log(`msg from save ${this.showZipCode}`);
      this.product.ZipCodes.push(zipCode);
      this.showZipCode = false;
    },
    addZipCode() { // add by ysd.
      this.editZipcodeData = {
        czipCode: '',
        radius: ''
      };
      console.log(`msg from addZipCode ${this.showZipCode}`);
      this.showZipCode = true;
    },
    goBack() {
      this.$store.dispatch('adminStore/getReferenceData');
      this.$emit('cancelTrigger');
    },
    editZipCode(ind) {
      this.editZipcodeData = this.product.ZipCodes[ind];
      console.log(this.editZipcodeData);
      this.showZipCode = true;
    },
    deleteZipCode(ind) {
      this.product.ZipCodes.splice(ind, 1);
      console.log('delete zipcode.');
      console.log(this.product.ZipCodes);
    },
    async handleAddProduct() {
      if (!this.validateForm()) return;
      try {
        await this.$store.dispatch('adminStore/addSaleProduct', this.product);
        this.$emit('cancelTrigger');
      } catch (err) {
        this.$notify({
          group: 'all',
          type: 'error',
          text: 'There was an error while add new product.'
        });
      }
    },
    async handleEditProduct() {
      if (!this.validateForm()) return;
      try {
        await this.$store.dispatch('adminStore/editSaleProduct', this.product);
        this.$emit('cancelTrigger');
      } catch (err) {
        this.$notify({
          group: 'all',
          type: 'error',
          text: 'There was an error'
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

.editor__content {
  padding: 0.5rem 0.5rem;
  border-radius: 0.2rem;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;

  .ProseMirror:focus,
  .ProseMirror-focused {
    outline: none !important;
  }

  p {
    font-family: unset;
    font-size: 0.875rem;
    font-weight: unset;
    line-height: 1em;
    color: unset;
    margin-bottom: 0px !important;
  }
}
</style>
