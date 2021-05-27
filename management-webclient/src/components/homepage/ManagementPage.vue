// src/pages/Admin/Products
<template>
  <div class="col-md-12">
    <div v-if="!isAddView">
      <div class="card">
        <header class="card-header">
          <div class="row">
            <div class="col-6">
              <h4 class="card-title mt-2">Product Management</h4>
            </div>

            <div class="col-6 align-right">
              <button
                type="button"
                class="au-btn au-btn-icon au-btn--green"
                @click="addProductFunc()"
              >+ Add Product</button>
            </div>
          </div>
        </header>
        <article class="card-body">
          <b-row>
            <b-col md="6">Per page &nbsp;&nbsp;&nbsp;
              <b-form-select
                v-model="pagination.limit"
                :options="perPageOptions"
                style="max-width: 100px"
                size="sm"
                @change="pageLimitChanged"
              />
            </b-col>
            <b-col md="6">
              <b-pagination
                :total-rows="pagination.total"
                v-model="pagination.page"
                :per-page="pagination.limit"
                @change="pageChanged"
                aria-controls="content_loop"
                align="right"
              />
            </b-col>
          </b-row>
          <div>
            <div class="row">
              <div class="col-sm-6 align-left">
                <input
                  class="form-control"
                  v-model="query"
                  type="text"
                  placeholder="Search Product"
                >
              </div>
            </div>
          </div>

          <table class="table table-striped" id="content_loop" style="margin-top: 10px">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>

                <th>Price</th>
                <th>In Stock</th>
                <th>In Sale</th>
                <th>Delivery Area</th>
                <th>Area Size</th>
                <th v-if="isSuperAdmin()">Vendor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-if="products.length > 0">
              <tr
                v-for="(product, pid) in products"
                v-bind:key="pid"
                v-if="product.productName.toUpperCase().includes(query.toUpperCase())"
                >
                <td>
                  <img
                    class="productTableImg"
                    crossorigin="anonymous"
                  >
                </td>

                <td>{{product.productName}}</td>
                <td>$ {{product.price.Little.value}}</td>
                <td>{{product.inStock}}</td>
                <td>{{product.inSale}}</td>
                <td v-if="product.deliveryArea.length > 5">{{product.deliveryArea.slice(0,5).join(', ')}} ...
                </td>
                <td v-else>{{product.deliveryArea.join(', ')}}
                </td>
                <td>{{product.deliveryArea.length}}</td>
                <td v-if="isSuperAdmin()">{{product.vendor}}</td>
                <td >
                    &nbsp;
                  <a @click="editProductFunc(product._id)" v-if="editpermissionGranted(product.vendor)">
                    <i class="fa fa-edit" style="color:green"></i>
                  </a>
                    &nbsp;
                  <a @click="deleteProduct(product._id)" v-if="editpermissionGranted(product.vendor)">
                    <i class="fa fa-trash" style="color:red"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <b-pagination
            :total-rows="pagination.total"
            v-model="pagination.page"
            :per-page="pagination.limit"
            @change="pageChanged"
            aria-controls="content_loop"
            align="right"
          />
        </article>
        <!-- card-body end .// -->
      </div>
    </div>
    <add-product v-if="isAddView" @cancelTrigger="isAddView=false" :data="editProductData"/>
  </div>
</template>

<script>
import AddProduct from '@/components/homepage/AddProduct.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    AddProduct,
  },
  data() {
    return {
      isAddView: false,
      editProductData: null,
      showInactiveFirst: false,
      query: '',
      perPageOptions: [10, 20, 30, 50, 100],
    };
  },
  async created() {
    try {
      await this.$store.dispatch('adminStore/getAllProducts');
      // await this.$store.dispatch('adminStore/getReferenceData');
      await this.$store.dispatch('adminStore/getAllSaleProducts');
    } catch (error) {
      this.$router.push('/login');
    }
  },
  computed: {
    products() {
      return this.$store.getters['adminStore/allPriceProducts'].sort((a, b) => {
        const nameA = a.productName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.productName.toUpperCase(); // ignore upper and lowercase
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
    getuserName() {
      return this.$store.getters['authStore/getName'];
    },

    ...mapGetters({
      getPermission: 'authStore/permissions',
      pagination: 'adminStore/pagination',
    }),
  },
  methods: {
    async pageChanged(pageNum) {
      this.pagination.page = pageNum;
      await this.$store.dispatch('adminStore/getAllSaleProducts');
    },

    async pageLimitChanged(limit) {
      this.pagination.limit = limit;
      this.pageChanged(1);
      // await this.$store.dispatch("adminStore/getAllProducts");
    },

    editpermissionGranted(userName) {
      if (this.getuserName === userName) return true;
      return false;
    },
    isSuperAdmin() {
      return this.getPermission === 'SUPERADMIN';
    },

    deleteProduct(id) {
      const res = this.$store.dispatch('adminStore/deleteSaleProduct', id);
      return res;
    },
    addProductFunc() {
      this.isAddView = true;
      this.editProductData = null;
    },

    async editProductFunc(id) {
      const editProductDetails = await this.$store.dispatch(
        'adminStore/getSaleProduct',
        id,
      );
      // set product name in priceProduct.
      const priceProduct = this.$store.getters['adminStore/allProducts'];
      for (let i = 0; i < priceProduct.length; i++) {
        if (priceProduct[i]._id === editProductDetails.productID) {
          editProductDetails.productName = priceProduct[i].name;
        }
      }
      this.editProductData = editProductDetails;
      this.isAddView = true;
    },
  },
};
</script>
<style>
.productTableImg {
  height: 75px;
  widows: 75px;
  border: 1px;
  border-color: cadetblue;
}
</style>


<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
