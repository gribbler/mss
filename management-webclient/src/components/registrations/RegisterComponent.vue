<template>
  <div class="white-bg">
    <div class="header">
      <h2>
        <strong>Register</strong>
      </h2>
    </div>

    <b-form-group>
      <b-form-input
        id="name"
        type="text"
        name="name"
        :state="nameState"
        v-model="name"
        placeholder="Enter your full name"
        aria-describedby="nameFeedback"
      ></b-form-input>
      <b-form-invalid-feedback id="nameFeedback">
        <!-- This will only be shown if the preceeding input has an invalid state -->
        The name field cannot be empty.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <b-form-input
        id="cName"
        type="text"
        name="cName"
        :state="cNameState"
        v-model="cName"
        placeholder="Enter your Contact name"
        aria-describedby="cNameFeedback"
      ></b-form-input>
      <b-form-invalid-feedback id="cNameFeedback">
        <!-- This will only be shown if the preceeding input has an invalid state -->
        The Contact name field cannot be empty.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <b-form-input
        id="phone"
        type="tel"
        name="phone"
        :state="phoneState"
        v-model="phone"
        placeholder="Enter a Contact phoneNumber"
        aria-describedby="phoneFeedback"
      ></b-form-input>
      <b-form-invalid-feedback id="phoneFeedback">Phone number invalid.</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <b-form-input
        id="cEmail"
        type="email"
        name="cEmail"
        :state="cEmailState"
        v-model="cEmail"
        placeholder="Enter Contact Email"
        aria-describedby="cEmailFeedback"
      ></b-form-input>
      <b-form-invalid-feedback id="cEmailFeedback">
        <!-- This will only be shown if the preceeding input has an invalid state -->
        Enter a valid email address
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <b-form-input
        id="password"
        type="password"
        name="password"
        :state="passwordState"
        v-model="password"
        placeholder="Enter a password"
        aria-describedby="passwordFeedback"
      ></b-form-input>
      <b-form-invalid-feedback id="passwordFeedback">Enter at least 7 characters.</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <b-form-input
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        :state="confirmPasswordState"
        v-model="confirmPassword"
        placeholder="Re-enter the password"
        aria-describedby="confirmPasswordFeedback"
      ></b-form-input>
      <b-form-invalid-feedback id="confirmPasswordFeedback">
        It should match the password entered.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <b-form-input
        id="cAddress1"
        type="text"
        name="cAddress1"
        :state="cAddress1State"
        v-model="cAddress1"
        placeholder="Enter your Contact Address1"
        aria-describedby="cAddress1Feedback"
      ></b-form-input>
      <b-form-invalid-feedback id="cAddress1Feedback">
        <!-- This will only be shown if the preceeding input has an invalid state -->
        The Contact Address1 field cannot be empty.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <b-form-input
        id="cAddress2"
        type="text"
        name="cAddress2"
        :state="cAddress2State"
        v-model="cAddress2"
        placeholder="Enter your Contact Address2"
        aria-describedby="cAddress2Feedback"
      ></b-form-input>
      <b-form-invalid-feedback id="cAddress2Feedback">
        <!-- This will only be shown if the preceeding input has an invalid state -->
        The Contact Address2 field cannot be empty.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <b-form-input
        id="city"
        type="text"
        name="city"
        :state="cityState"
        v-model="city"
        placeholder="Enter your City"
        aria-describedby="cityFeedback"
      ></b-form-input>
      <b-form-invalid-feedback id="cityFeedback">
        <!-- This will only be shown if the preceeding input has an invalid state -->
        The City field cannot be empty.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <b-form-input
        id="state"
        type="text"
        name="state"
        :state="stateState"
        v-model="state"
        placeholder="Enter your State"
        aria-describedby="stateFeedback"
      ></b-form-input>
      <b-form-invalid-feedback id="stateFeedback">
        <!-- This will only be shown if the preceeding input has an invalid state -->
        The State field cannot be empty.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <b-form-input
        id="zipCode"
        type="tel"
        name="zipcode"
        :state="zipcodeState"
        v-model="zipcode"
        placeholder="Enter a ZipCode"
        aria-describedby="zipcodeFeedback"
      ></b-form-input>
      <b-form-invalid-feedback id="zipcodeFeedback">ZipCode invalid.</b-form-invalid-feedback>
    </b-form-group>

    <div class="modal-bottom"></div>
    <b-btn class="register-button" @click="registerClicked()">Register</b-btn>

    <p class="register-class" @click="loginNavigation()">Already a User? Go back to login.</p>
    <div class="modal-bottom"></div>
  </div>
</template>

<script>
export default {
  name: 'RegisterComponent',
  data() {
    return {
      cEmail: '',
      cName: '',
      cAddress1: '',
      cAddress2: '',
      city: '',
      state: '',
      password: '',
      confirmPassword: '',
      phone: '',
      zipcode: '',
      name: ''
    };
  },

  methods: {
    registerClicked() {
      if (this.cEmailState && this.passwordState && this.confirmPasswordState && this.phoneState && this.nameState && this.zipcodeState
          && this.cNameState && this.cAddress1State && this.cAddress2State && this.cityState && this.stateState) {
        this.$emit('register', {
          email: this.cEmail,
          password: this.password,
          phone: this.phone,
          name: this.name,
          zipcode: this.zipcode,
          cName: this.cName,
          cAddress1: this.cAddress1,
          cAddress2: this.cAddress2,
          city: this.city,
          state: this.state
        });
      }
    },

    loginNavigation() {
      this.$emit('loginNav');
    },

    validEmail(email) {
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
  computed: {
    cEmailState() {
      if (this.cEmail.length === 0) return null;
      return this.validEmail(this.cEmail);
    },

    passwordState() {
      if (this.password.length === 0) return null;
      return this.password.length > 6;
    },

    confirmPasswordState() {
      if (this.confirmPassword.length === 0) return null;
      return this.confirmPassword === this.password;
    },

    cNameState() {
      if (this.cName.length === 0) return null;
      return this.cName.length > 0;
    },
    phoneState() {
      if (this.phone.length === 0) return null;
      return this.phone.length === 10;
    },

    nameState() {
      if (this.name.length === 0) return null;
      return this.name.length > 0;
    },

    cAddress1State() {
      if (this.cAddress1.length === 0) return null;
      return this.cAddress1.length > 0;
    },

    cAddress2State() {
      if (this.cAddress2.length === 0) return null;
      return this.cAddress2.length > 0;
    },

    cityState() {
      if (this.city.length === 0) return null;
      return this.city.length > 0;
    },

    stateState() {
      if (this.state.length === 0) return null;
      return this.state.length > 0;
    },

    zipcodeState() {
      if (this.zipcode.length === 0) return null;
      return this.zipcode.length === 5;
    }
  }
};
</script>

<style lang="scss">
.register-button {
  width: 100%;
  background-image: linear-gradient(to right, red, red) !important;
}

.register-class {
  padding-top: 20px;
  cursor: pointer;
}
</style>
