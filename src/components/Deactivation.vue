<template>
  <div>
    <h1>Deactivate MFA</h1>

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
            id="deactivateMFA"
            @click="deactivateMFA()"
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
      <input
        id="checkbox"
        v-model="recovery"
        type="checkbox"
      >
      <label for="checkbox"> Use recovery code</label>

      <v-text-field
        id="username"
        v-model="username"
        :rules="[rules.required]"
        label="Username"
      />

      <Password
        v-model="password"
      />

      <v-text-field
        v-if="recovery"
        id="recoveryCode"
        v-model="recoveryCode"
        :rules="[rules.required]"
        label="Recovery code"
      />

      <v-btn
        id="submitButton"
        :disabled="!validForm||submitting"
        @click="submit"
      >
        Deactivate
      </v-btn>
    </v-form>

    <v-divider class="mt-3 mb-2" />

    <router-link :to="{ name: 'Activate' }">
      <h3>Go to Activation</h3>
    </router-link>

    <Alerts
      id="alert"
      :successMsg="success"
      :errorMsg="error"
    />
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
    username: '',
    password: '',
    personalToken: '',
    mfaToken: '',
    mfaCode: '',
    error: '',
    success: '',
    submitting: false,
    ctx: {},
    recovery: false,
    recoveryCode: '',
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
          if (this.recovery) {
            this.success = await this.ctx.pryv.mfaRecover(this.username, this.password, this.ctx.appId, this.recoveryCode);
          } else {
            const res = await this.ctx.pryv.login(this.username, this.password, this.ctx.appId);
            if (res.mfaToken == null) {
              this.success = 'MFA already deactivated.';
            } else {
              await this.ctx.pryv.mfaChallenge(this.username, res.mfaToken);
              this.mfaToken = res.mfaToken;
            }
          }
        } catch (err) {
          this.error = err.toString();
        } finally {
          this.submitting = false;
        }
      }
    },
    async deactivateMFA () {
      try {
        this.personalToken = await this.ctx.pryv.mfaVerify(this.username, this.mfaToken, this.mfaCode);
        this.success = await this.ctx.pryv.mfaDeactivate(this.username, this.personalToken);
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
