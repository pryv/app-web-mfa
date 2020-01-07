<template>
  <div>
    <h1>Activate MFA</h1>

    <v-divider
      class="mt-3 mb-2"
    />

    <v-dialog
      v-model="mfaActivated"
      persistent
      width="600"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          MFA verification
        </v-card-title>
        <v-text-field
          id="mfaCode"
          v-model="mfaCode"
          :rules="[rules.required]"
          class="ma-3"
          label="MFA code"
        />
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="mfaToken = '';mfaCode = ''"
          >
            Cancel
          </v-btn>
          <v-btn
            id="confirmMfa"
            @click="confirmMFA()"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-form
      ref="form"
      v-model="validForm"
      @submit.prevent
    >
      <v-text-field
        id="username"
        v-model="username"
        :rules="[rules.required]"
        label="Username"
      />

      <Password v-model="password" />

      <v-text-field
        id="phone"
        v-model="phone"
        :rules="[rules.required]"
        label="Phone number"
      />

      <v-btn
        id="submitButton"
        :disabled="!validForm||submitting"
        @click="submit"
      >
        Activate
      </v-btn>
    </v-form>

    <v-divider class="mt-3 mb-2" />

    <router-link :to="{ name: 'Deactivate' }">
      <h3>Go to Deactivation</h3>
    </router-link>

    <Alerts
      id="alert"
      :successMsg="success"
      :errorMsg="error"
    />

    <div
      v-if="recoveryCodes"
      id="recovery"
    >
      <b>Here are your MFA recovery codes:</b>
      <div>{{ recoveryCodes }}</div>
    </div>
  </div>
</template>

<script>
import Password from './bits/Password.vue';
import Alerts from './bits/Alerts.vue';
import Context from '../context.js';

export default {
  components: {
    Password,
    Alerts,
  },
  data: () => ({
    password: '',
    personalToken: '',
    mfaToken: '',
    mfaCode: '',
    recoveryCodes: null,
    username: '',
    phone: '',
    error: '',
    success: '',
    submitting: false,
    ctx: {},
    rules: {
      required: value => !!value || 'This field is required.',
    },
    validForm: false,
  }),
  computed: {
    mfaActivated: {
      get: function () {
        return this.mfaToken !== '';
      },
    },
  },
  async created () {
    this.ctx = new Context(this.$route.query);
    await this.ctx.init();
  },
  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        this.submitting = true;
        try {
          const res = await this.ctx.pryv.login(this.username, this.password, this.ctx.appId);
          if (res.mfaToken != null) {
            this.success = 'MFA already active.';
          } else {
            this.personalToken = res.token;
            this.mfaToken = await this.ctx.pryv.mfaActivate(this.username, this.personalToken, this.phone);
          }
        } catch (err) {
          this.error = err.toString();
        } finally {
          this.submitting = false;
        }
      }
    },
    // Verify provided MFA code
    async confirmMFA () {
      try {
        this.recoveryCodes = await this.ctx.pryv.mfaConfirm(this.username, this.mfaToken, this.mfaCode);
        this.success = 'MFA activated.';
      } catch (err) {
        this.error = err.toString();
      } finally {
        this.mfaToken = '';
        this.mfaCode = '';
      }
    },
  },
};
</script>
