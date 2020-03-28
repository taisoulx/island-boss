<template>
    <v-dialog v-model="dialog" persistent max-width="300">
      <v-card class="text-center">
        <v-card-title class="headline">{{title}}</v-card-title>
        <v-card-text class="mt-5"><span class="confirm_content">{{ message }}</span></v-card-text>
        <v-card-actions>
          <v-btn color="gray lighten-2" text @click="dialog = false"><span class="confirm_btn">再想想</span></v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onSure(callback)"><span class="confirm_btn"><b>确定</b></span></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
  export default {
    name: "Confirm",

    data() {
      return {
        dialog: true,
        title: '提示',
        message: "确定操作",
        callback: () => {}

      };
    },

    methods: {
      add(options) {
        this.message = options.message;
        this.title = options.title;
        this.callback = options.callback
      },
      async onSure(callback) {
        console.log(callback)
        await callback();
        this.dialog = false
      }
    }
  }
</script>
<style>
  .confirm_content {
    font-size: 1.1rem !important;
    font-weight: 400 !important;
  }
  .confirm_btn {
    font-size: 1rem !important;
    font-weight: 400 !important;
  }
</style>
