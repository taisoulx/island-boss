<template>
  <router-view />
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "./assets/css/app";
.v-responsive__content {
  margin-left: 0 !important ;
}
.v-badge__badge {
  padding: 0 !important;
  text-align: center;
}
.err {
  color: #c62828;
}
.v-navigation-drawer .v-icon.v-icon {
  font-size: 20px;
}
.display-2 {
  font-size: 1.8rem !important;
}
</style>
