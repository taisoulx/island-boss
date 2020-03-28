import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 通用页面, 这里的配置不需要权限
export const constRouter = [
  {
    path: "/pages",
    component: () => import("@/views/pages/Index"),
    children: [
      {
        name: "Lock",
        path: "lock",
        component: () => import("@/views/pages/Lock")
      },
      {
        name: "Login",
        path: "login",
        component: () => import("@/views/pages/Login")
      },
      {
        name: "Pricing",
        path: "pricing",
        component: () => import("@/views/pages/Pricing")
      },
      {
        name: "Register",
        path: "register",
        component: () => import("@/views/pages/Register")
      }
    ]
  }
];

// 动态路由
export const asyncRoutes = [
  {
    path: "/",
    component: () => import("@/views/dashboard/Index"),
    meta: {
      title: "首页",
      group: "pages",
      roles: ["admin", "editor"],
      sidebar: ["home"]
    },
    children: [
      // Dashboard
      {
        name: "Dashboard",
        path: "",
        component: () => import("@/views/dashboard/Dashboard"),
        meta: {
          roles: ["editor"],
          title: "仪表盘",
          icon: "mdi-view-dashboard",
          sidebar: ["dashboard"]
        }
      },
      // Pages
      {
        name: "RTL",
        path: "pages/rtl",
        component: () => import("@/views/dashboard/pages/Rtl"),
        meta: {
          roles: ["editor"],
          title: "RTL",
          sidebar: ["pages", "rtl"]
        }
      },
      {
        name: "User Profile",
        path: "pages/user",
        component: () => import("@/views/dashboard/pages/UserProfile"),
        meta: {
          roles: ["editor"],
          title: "Profile",
          sidebar: ["pages", "Profile"]
        }
      },
      {
        name: "Timeline",
        path: "pages/timeline",
        component: () => import("@/views/dashboard/pages/Timeline"),
        meta: {
          roles: ["editor"],
          title: "Timeline",
          sidebar: ["pages", "Timeline"]
        }
      },
      // Components
      {
        name: "Buttons",
        path: "components/buttons",
        component: () => import("@/views/dashboard/component/Buttons"),
        meta: {
          title: "button",
          roles: ["editor"],
          sidebar: ["components", "buttons"]
        }
      },
      {
        name: "Grid System",
        path: "components/grid-system",
        component: () => import("@/views/dashboard/component/Grid"),
        meta: {
          title: "Grid System",
          roles: ["editor"],
          sidebar: ["components", "grid_system"]
        }
      },
      {
        name: "Tabs",
        path: "components/tabs",
        component: () => import("@/views/dashboard/component/Tabs"),
        meta: {
          title: "tabs",
          roles: ["editor"],
          sidebar: ["components", "tabs"]
        }
      },
      {
        name: "Notifications",
        path: "components/notifications",
        component: () => import("@/views/dashboard/component/Notifications"),
        meta: {
          title: "Notifications",
          roles: ["editor"],
          sidebar: ["components", "Notifications"]
        }
      },
      {
        name: "Icons",
        path: "components/icons",
        component: () => import("@/views/dashboard/component/Icons"),
        meta: {
          title: "Icons",
          roles: ["editor"],
          sidebar: ["components", "Icons"]
        }
      },
      {
        name: "Typography",
        path: "components/typography",
        component: () => import("@/views/dashboard/component/Typography"),
        meta: {
          title: "Typography",
          roles: ["editor"],
          sidebar: ["components", "Typography"]
        }
      },
      // Forms
      {
        name: "Regular Forms",
        path: "forms/regular",
        component: () => import("@/views/dashboard/forms/RegularForms"),
        meta: {
          title: "Regular Forms",
          roles: ["editor"],
          sidebar: ["forms", "rforms"]
        }
      },
      {
        name: "Extended Forms",
        path: "forms/extended",
        component: () => import("@/views/dashboard/forms/ExtendedForms"),
        meta: {
          title: "extended Forms",
          roles: ["editor"],
          sidebar: ["forms", "eforms"]
        }
      },
      {
        name: "Validation Forms",
        path: "forms/validation",
        component: () => import("@/views/dashboard/forms/ValidationForms")
      },
      {
        name: "Wizard",
        path: "forms/wizard",
        component: () => import("@/views/dashboard/forms/Wizard")
      },
      // Tables
      {
        name: "Regular Tables",
        path: "tables/regular-tables",
        component: () => import("@/views/dashboard/tables/RegularTables"),
        meta: {
          title: "Regular Tables",
          roles: ["editor"],
          sidebar: ["tables", "rtables"]
        }
      },
      {
        name: "Extended Tables",
        path: "tables/extended-tables",
        component: () => import("@/views/dashboard/tables/ExtendedTables"),
        meta: {
          title: "extended Tables",
          roles: ["editor"],
          sidebar: ["tables", "etables"]
        }
      },
      {
        name: "Data Tabels",
        path: "tables/data-tables",
        component: () => import("@/views/dashboard/tables/DataTables"),
        meta: {
          title: "Data Tables",
          roles: ["editor"],
          sidebar: ["tables", "dtables"]
        }
      },
      // wechat
      {
        name: "Wechat Group",
        path: "wechat/wgroup",
        // component: () => import("@/views/dashboard/wetools/WeChatGroup"),
        component: () => import("@/views/dashboard/wetools/WechatGroup"),
        meta: {
          title: "Wechat Group",
          roles: ["editor"],
          sidebar: ["wechat", "wgroup"]
        }
      },
      // Maps
      // Root level
      {
        name: "Widgets",
        path: "widgets",
        component: () => import("@/views/dashboard/Widgets")
      },
      {
        name: "Charts",
        path: "charts",
        component: () => import("@/views/dashboard/Charts")
      },
      {
        name: "Calendar",
        path: "calendar",
        component: () => import("@/views/dashboard/Calendar")
      }
    ]
  },
  {
    path: "*",
    // 页面基础框架
    component: () => import("@/views/pages/Index"),
    meta: {
      title: "",
      permissions: ["dashboard"]
    },
    children: [
      {
        name: "404 Error",
        path: "",
        component: () => import("@/views/pages/Error"),
        meta: {
          title: "404",
          permissions: ["dashboard"]
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constRouter
});

export default router;
