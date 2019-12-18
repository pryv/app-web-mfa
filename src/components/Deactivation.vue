<template>
  <div>
    <h1>Deactivate</h1>

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

      <div v-if="recovery">
        <Password
          v-model="password"
        />

        <v-text-field
          id="recoveryCode"
          v-model="ctx.recoveryCode"
          :rules="[rules.required]"
          label="Recovery code"
        />
      </div>

      <div v-else>
        <v-text-field
          id="token"
          v-model="personalToken"
          :rules="[rules.required]"
          label="Personal token"
        />
      </div>

      <v-btn
        id="submitButton"
        :disabled="!validForm||submitting"
        @click="submit"
      >
        Deactivate
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
    error: '',
    submitting: false,
    ctx: {},
    recovery: false,
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
    showError (error) {
      this.error = error.msg;
    },
  },
};
</script>
