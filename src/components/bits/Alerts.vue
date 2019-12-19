<template>
  <div>
    <v-divider class="mt-3 mb-2" />
    <v-alert
      v-if="alertMsg"
      :type="alertType"
      transition="scale-transition"
    >
      <span v-html="alertMsg" />
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    errorMsg: { type: String, default: '' },
    successMsg: { type: String, default: '' },
  },
  computed: {
    alertMsg: function () {
      if (this.successMsg !== '') return this.successMsg;
      if (this.errorMsg !== '') return this.errorMsg;
      return '';
    },
    alertType: function () {
      return this.successMsg !== '' ? 'success' : 'error';
    },
  },
};
</script>
