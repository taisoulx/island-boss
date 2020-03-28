<template>
  <div>
    <base-material-snackbar
      v-model="snackbar"
      :type="type"
      v-bind="{
        top: true,
        right: true
      }"
      elevation="0"
      >
    <span class="msg">{{ message }}</span>
    </base-material-snackbar
    >
  </div>
</template>

<script>
export default {
  name: "Message",

  data() {
    return {
      snackbar: true,
      type: "success",
      direction: "top right",
      message: ""
    };
  },

  methods: {
    add(options) {
      console.log(options);
      this.message = options.message;
      this.type = options.type;
    }
  }
};
</script>
<style scoped>
  .msg{
    font-size: 1.2em !important;
    font-weight: bold;
  }
</style>
