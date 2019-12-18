<template>
  <div>
    <h1>Activate MFA</h1>

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
            @click="ctx.user.mfaToken = ''; mfaCode = ''"
          >
            Cancel
          </v-btn>
          <v-btn
            @click="handleMFA()"
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
        v-model="ctx.user.username"
        :rules="[rules.required]"
        label="Username"
      />

      <Password v-model="password" />

      <v-btn
        id="submitButton"
        :disabled="!validForm||submitting"
        @click="submit"
      >
        Sign In
      </v-btn>

      <v-btn
        @click="refuse"
      >
        Cancel
      </v-btn>
    </v-form>

    <v-divider
      class="mt-3 mb-2"
    />

    <Alerts
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
    password: '',
    personalToken: '',
    mfaToken: '',
    mfaCode: '',
    error: '',
    submitting: false,
    ctx: {},
    rules: {
      required: value => !!value || 'This field is required.',
    },
    validForm: false,
  }),
  async created () {
    this.ctx = new Context(this.$route.query);
    await this.ctx.init();
  },
  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        this.submitting = true;
        try {
          await this.ctx.pryv.login(this.password);
          if (!this.mfaActivated) {
            await this.ctx.pryv.checkAccess(this.showPermissions);
          }
        } catch (err) {
          this.showError(err);
        } finally {
          this.submitting = false;
        }
      }
    },
    // Handle provided MFA code
    async handleMFA () {
      try {
        await this.ctx.pryv.mfaVerify(this.mfaCode);
        await this.ctx.pryv.checkAccess(this.showPermissions);
      } catch (err) {
        this.showError(err);
      } finally {
        this.ctx.user.mfaToken = '';
      }
    },
    showError (error) {
      this.error = error.msg;
    },
  },
};
</script>
