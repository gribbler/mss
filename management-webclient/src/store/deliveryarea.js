import Vue from 'vue';
import ProxyUrl from '@/constants/ProxyUrls';

export default {
  namespaced: true,
  state: {
    areas: [],
  },
  actions: {
    async getDAreas({
      commit
    }) {
      try {
        const { data, } = await Vue.prototype.$axios({
          url: ProxyUrl.deliveryareas,
          withCredentials: true,
          method: 'post',
          data: {},
        });
        if (data && data.httpStatus === 200) {
          commit('setAreas', data.responseData);
        } else throw new Error('No Content');
      } catch (err) {
        console.log(err);
      }
    },
    async addDAreas({
      dispatch
    }, area) {
      try {
        const {
          data,
        } = await Vue.prototype.$axios({
          url: ProxyUrl.addArea,
          withCredentials: true,
          method: 'post',
          data: {
            area
          },
        });
        if (data && data.httpStatus === 200) {
          dispatch('getDAreas');
        }
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async editDAreas({
      dispatch
    }, area) {
      try {
        const {
          data,
        } = await Vue.prototype.$axios({
          url: ProxyUrl.editArea,
          withCredentials: true,
          method: 'put',
          data: area,
        });
        dispatch('getDAreas');
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteArea({
      dispatch,
    }, dName) {
      try {
        await Vue.prototype.$axios({
          url: ProxyUrl.deleteArea,
          withCredentials: true,
          method: 'delete',
          data: {
            dId: dName,
          },
        });
        dispatch('getDAreas');
      } catch (err) {
        console.log(err);
      }
    },

  },
  mutations: {
    setAreas(state, payload) {
      state.areas = payload;
    },
  },
  getters: {
    getDeliveryAreas(state) {
      return state.areas;
    }
  }
};
