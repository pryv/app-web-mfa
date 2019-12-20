<template>
  <div>
    <v-text-field
      id="password"
      :value="value"
      :appendIcon="visiblePass ? 'lock_open' : 'lock'"
      :type="visiblePass ? 'text' : 'password'"
      :rules="[rules.required]"
      label="Password"
      @input="$emit('input', $event)"
      @click:append="() => (visiblePass = !visiblePass)"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' },
  },
  data: () => ({
    visiblePass: false,
    rules: {
      required: value => !!value || 'This field is required.',
    },
  }),
};
</script>
