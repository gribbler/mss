import Vue from 'vue';
import ProxyUrl from '@/constants/ProxyUrls';
import * as _ from 'lodash';
import Pagination from '@/dto/Pagination.json';

export default {
  namespaced: true,
  state: {
    products: [],
    priceProduct: [],
    vendors: [],
    categories: [],
    subcategories: [],
    refDataPayload: [],
    pagination: _.cloneDeep(Pagination),
    sortBy: '-active',
  },

  actions: {
    async getReferenceData({
      commit,
    }) {
      try {
        const {
          data,
        } = await Vue.prototype.$axios({
          url: ProxyUrl.refData,
          withCredentials: true,
          method: 'get',
          data: {},
        });
        if (data && data.httpStatus === 200) {
          commit('setRefData', data.responseData);
        } else throw new Error('No Content');
      } catch (err) {
        console.log(err);
      }
    },
    async deleteProduct({
      dispatch,
    }, id) {
      try {
        const {
          data,
        } = await Vue.prototype.$axios({
          url: ProxyUrl.deleteProduct,
          withCredentials: true,
          method: 'delete',
          data: {
            productId: id,
          },
        });
        if (data && data.httpStatus === 200) {
          dispatch('getAllProducts');
        } else throw new Error('No Content');
      } catch (err) {
        console.log(err);
      }
    },
    async addProduct({
      dispatch,
    }, product) {
      try {
        const {
          data,
        } = await Vue.prototype.$axios({
          url: ProxyUrl.addProduct,
          withCredentials: true,
          method: 'post',
          data: product,
        });

        if (data && data.httpStatus === 200) {
          dispatch('getAllProducts');
        } else throw new Error('No Content');
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
    async editProduct({
      dispatch,
    }, product) {
      try {
        const {
          data,
        } = await Vue.prototype.$axios({
          url: ProxyUrl.editProduct,
          withCredentials: true,
          method: 'put',
          data: product,
        });

        if (data && data.httpStatus === 200) {
          dispatch('getAllProducts');
        } else throw new Error('No Content');
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
    async getProduct({
      // eslint-disable-next-line no-unused-vars
      dispatch,
    }, id) {
      const productGetUrl = `${ProxyUrl.getProduct}?productId=${id}`;
      try {
        const {
          data,
        } = await Vue.prototype.$axios({
          url: productGetUrl,
          withCredentials: true,
          method: 'get',
        });

        return data.responseData;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
    async getAllProducts({
      commit,
      state,
    }, filters) {
      try {
        let reqPayload = {};
        if (filters) {
          reqPayload = filters;
        } else {
          reqPayload = {
            searchFilters: filters || {
              store: '',
              category: '',
            },
            pagingOptions: state.pagination,
            sortRule: state.sortBy,
          };
        }

        const {
          data,
        } = await Vue.prototype.$axios({
          url: ProxyUrl.searchProduct,
          withCredentials: true,
          method: 'post',
          data: reqPayload,
        });
        if (data && data.httpStatus === 200) {
          commit('setProducts', data.responseData.docs);
          commit('setPagination', data.responseData);
        } else throw new Error('No content');

        return data.responseData;
      } catch (err) {
        throw new Error(err);
      }
    },

    async deleteSaleProduct({
      dispatch,
    }, id) {
      try {
        const {
          data,
        } = await Vue.prototype.$axios({
          url: ProxyUrl.deleteSaleProduct,
          withCredentials: true,
          method: 'delete',
          data: {
            productId: id,
          },
        });
        if (data && data.httpStatus === 200) {
          dispatch('getAllSaleProducts');
        } else throw new Error('No Content');
      } catch (err) {
        console.log(err);
      }
    },
    async addSaleProduct({
      dispatch,
    }, product) {
      try {
        const {
          data,
        } = await Vue.prototype.$axios({
          url: ProxyUrl.addSaleProduct,
          withCredentials: true,
          method: 'post',
          data: product,
        });

        if (data && data.httpStatus === 200) {
          dispatch('getAllSaleProducts');
        } else throw new Error('No Content');
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
    async editSaleProduct({
      dispatch,
    }, product) {
      try {
        const {
          data,
        } = await Vue.prototype.$axios({
          url: ProxyUrl.editSaleProduct,
          withCredentials: true,
          method: 'put',
          data: product,
        });

        if (data && data.httpStatus === 200) {
          dispatch('getAllSaleProducts');
        } else throw new Error('No Content');
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
    async getAllSaleProducts({
      commit,
      state,
    }, filters) {
      try {
        let reqPayload = {};
        if (filters) {
          reqPayload = filters;
        } else {
          reqPayload = {
            searchFilters: filters || {
              store: '',
              category: '',
            },
            pagingOptions: state.pagination,
            sortRule: state.sortBy,
          };
        }

        const {
          data,
        } = await Vue.prototype.$axios({
          url: ProxyUrl.searchSaleProduct,
          withCredentials: true,
          method: 'post',
          data: reqPayload,
        });
        if (data && data.httpStatus === 200) {
          commit('setSaleProducts', data.responseData.docs);
          commit('setPagination', data.responseData);
        } else throw new Error('No content');

        return data.responseData;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getSaleProduct({
      // eslint-disable-next-line no-unused-vars
      // dispatch,
    }, id) {
      const productGetUrl = `${ProxyUrl.getSaleProduct}?productId=${id}`;
      try {
        const {
          data,
        } = await Vue.prototype.$axios({
          url: productGetUrl,
          withCredentials: true,
          method: 'get',
        });

        return data.responseData;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
    async getBestPrice({
      dispatch
    },id){
      try {
        const {
          data,
        } = await Vue.prototype.$axios({
          url: ProxyUrl.getBestPrice,
          withCredentials: true,
          method: 'post',
          data:{
            id : id,
          }
        });
        return data.responseData.price;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
    async getInStock({
      dispatch
    },id){
      try {
        const {
          data,
        } = await Vue.prototype.$axios({
          url: ProxyUrl.getInStock,
          withCredentials: true,
          method: 'post',
          data:{
            id : id,
          }
        });
        return data.responseData.stock;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },

  },

  mutations: {
    setPagination(state, payload) {
      if (payload) {
        state.pagination.page = payload.page;
        state.pagination.total = payload.total;
        state.pagination.limit = payload.limit;
      }
    },
    resetProducts(state) {
      state.products = [];
    },
    resetSaleProducts(state) {
      state.priceProduct = [];
    },
    setSortByInactive(state, payload) {
      if (payload) {
        state.sortBy = 'active';
      } else {
        state.sortBy = '-active';
      }
    },
    setSaleProducts(state, payload) {
      state.priceProduct = [];
      state.priceProduct.push(...payload);
      for (let i = 0; i < state.priceProduct.length; i++) {
        state.products.forEach(product => {
          if (product._id === state.priceProduct[i].productID) {
            state.priceProduct[i].productName = product.name;
          }
        });
      }
    },
    setProducts(state, payload) {
      state.products = [];
      state.products.push(...payload);
    },
    setRefData(state, payload) {
      state.vendors = payload.vendors || [];
      state.priceProduct = payload.priceProduct || [];
      state.categories = [];
      state.categories = payload.product_categories;
      state.refDataPayload = payload || {};
      state.subcategories = [];
      // set product name in priceProduct.
      for (let i = 0; i < state.priceProduct.length; i++) {
        state.products.forEach(product => {
          if (product._id === state.priceProduct[i].productID) {
            state.priceProduct[i].productName = product.name;
          }
        });
      }
    },
  },
  getters: {
    allVendorData(state) {
      return state.vendors;
    },
    allProducts(state) {
      return state.products;
    },
    allPriceProducts(state) {
      return state.priceProduct;
    },
    allStateData(state) {
      return state;
    },

    tariffCategories(state) {
      return state.tariffCategories;
    },

    pagination(state) {
      return state.pagination;
    },
  },
};
