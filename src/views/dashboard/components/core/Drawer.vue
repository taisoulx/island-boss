<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-break-point="960"
    mini-variant-width="80"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-uppercase font-weight-regular display-2">
          <span class="logo-mini">{{ $t("ct") }}</span>
          <span class="logo-normal">{{ $t("tim") }}</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <base-item-group :item="profile" />
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group v-if="item.children" :key="`group-${i}`" :item="item">
          <!--  -->
        </base-item-group>

        <base-item v-else :key="`item-${i}`" :item="item" />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";
import { asyncSidebarMap } from "@/config/sidebar.config.js";

export default {
  name: "DashboardCoreDrawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    items: []
  }),

  computed: {
    ...mapState({
      // ["barColor", "barImage"]
      // 使用module 后需要这样才能调用
      barColor: state => state.vuetify.barColor,
      barImage: state => state.vuetify.barImage
    }),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("vuetify/SET_DRAWER", val);
      }
    },
    computedItems() {
      return this.items.map(this.mapItem);
    },
    profile() {
      return {
        avatar: true,
        group: "",
        title: this.$t("avatar"),
        children: [
          {
            href: "",
            title: this.$t("my-profile")
          },
          {
            to: "",
            title: this.$t("edit-profile")
          },
          {
            to: "",
            title: this.$t("settings")
          }
        ]
      };
    }
  },

  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    }
  },

  methods: {
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title)
      };
    },
    // 判读路由是否属于sidebar
    hasSidebar(routes) {
      if (routes.meta) {
        return !!routes.meta.sidebar;
      }
    },
    // 提取可访问路由中属于sidebar的路由
    filterSidebarRoutes(permissionRoutes) {
      const res = [];
      permissionRoutes.forEach(item => {
        const tmp = { ...item };
        if (this.hasSidebar(tmp)) {
          if (tmp.children) {
            tmp.children = this.filterSidebarRoutes(tmp.children);
          }
          res.push(tmp);
        }
      });
      return res;
    },
    sidebarList(sidebarRoutes) {
      // 将路由中含有sidebar的内容洗出来
      const list = sidebarRoutes.map(item => {
        let children;
        if (item.children) {
          children = item.children.map(v => v.meta.sidebar || v.meta.group);
        }
        return {
          sidebar: item.meta.sidebar,
          children: children
        };
      });
      // 清洗为一个数组
      return list.map(v => {
        let tmp = [];
        if (v.children) {
          tmp = tmp.concat(v.children);
        }
        tmp.push(v.sidebar);
        return tmp;
      });
    },

    // sidebar 部分
    // sidebar判断
    hasAsyncSidebar(sideList, sideItem) {
      // sidebar的item的id是否在sideList中
      return sideList.some(item => item.includes(sideItem.id));
    },

    // sidebar处理
    filterAsyncSidebar(sidebarConfig, sideList) {
      const res = [];
      sidebarConfig.forEach(item => {
        // 复制一份
        const tmp = { ...item };
        // 如果存在
        if (this.hasAsyncSidebar(sideList, tmp)) {
          // 如果存在children
          if (tmp.children) {
            tmp.children = this.filterAsyncSidebar(tmp.children, sideList);
          }
          res.push(tmp);
        }
      });
      return res;
    },
    // 生成sidebar
    generateSidebar(sidebarConfig, sideList) {
      return new Promise(resolve => {
        const newSidebar = this.filterAsyncSidebar(sidebarConfig, sideList);
        resolve(newSidebar);
      });
    }
  },

  created() {
    // 获取当前用户可访问路由
    const permissionRoutes = this.$store.getters.permission_routes;
    // 获取路由中可以设置为sidebar的路由
    const sidebarRoutes = this.filterSidebarRoutes(permissionRoutes);
    // 抽取可以访问的sideListId
    const sideList = this.sidebarList(sidebarRoutes);
    // 生成新的sidebar
    this.generateSidebar(asyncSidebarMap, sideList[0]).then(v => {
      this.items = v;
    });
  }
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important

    .v-list-group--sub-group
      display: block !important

  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
        margin-right: 24px
        margin-left: 12px !important

      +rtl()
        margin-left: 24px
        margin-right: 12px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
        padding-left: 15px

      +rtl()
        padding-right: 15px

    .v-list-group__header
      +ltr()
        padding-right: 0

      +rtl()
        padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
          margin-right: 15px

        +rtl()
          margin-left: 15px
</style>
