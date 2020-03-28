<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closedialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="closedialog">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!--        内容区-->
        <base-material-card color="indigo" icon="mdi-vuetify" inline class="px-12 py-3 mt-12">
          <template v-slot:after-heading>
            <div class="display-2 font-weight-light">
              {{title}}
            </div>
          </template>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            class="ml-auto"
            label="Search"
            hide-details
            single-line
            style="max-width: 250px;"
          />

          <v-row class="left">
            <v-col md="3" class="pt-0">
              <v-text-field
                v-model="keyWord"
                label="Keyword"
                style="max-width: 250px;"
              />
              <v-btn color="success" min-width="60" @click="getData">获取</v-btn>
            </v-col>
            <v-col md="3" class="ml-auto"> </v-col>
          </v-row>
        <v-data-table
          :headers="headers"
          :items="items"
          :search.sync="search"
          :sort-by="['name', 'office']"
          :sort-desc="[false, true]"
          multi-sort
        >
          <template v-slot:item.actions="{ item }">
            <v-btn color="success" class="px-1 ml-1" fab x-small dark @click="deleteItem(item)">
              <v-icon
                small
              >
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
        </base-material-card>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import { getGroupMemberListByWehchatGroup } from "@/api/wechatGroupMember";
  import { getHistory } from '@/api/wetool'
  import { getSid, setSid } from '@/utils/wetoolCookie'

export default {
  name: "FullDialog",
  data() {
    return {
      dialog: true,
      keyWord: '',
      notifications: false,
      sound: true,
      widgets: false,
      search: undefined,
      headers: [
        {
          text: "用户wxid",
          name: "wxid",
          value: "wxid",
          type: "text",
        },
        {
          text: "用户昵称",
          name: "nickname",
          value: "nick_name",
          type: "text",
        },
        {
          text: "用户名称",
          name: "username",
          value: "user_name",
          type: "text",
        },
        {
          text: "微信群id",
          name: "wechatgroup",
          value: "wechatgroup",
          type: "text",
        },
        {
          text: '动作',
          value: 'actions',
          sortable: false
        },
      ],
      items: []
    };
  },
  props: {
    fullDialogId: String,
    title: String
  },
  methods: {
    closedialog() {
      this.$emit("closeFullDiago");
    },
    editItem(item) {
      console.log(item)
    },
    deleteItem(item) {
      console.log(item)
    },
    getGroupMemberListByWehchatGroup(id) {
      getGroupMemberListByWehchatGroup(id).then(v => {
        // eslint-disable-next-line array-callback-return
        this.items = v
      });
    },
    getData() {
      console.log(('get data'))
      const phpSessionId = getSid()
      if (!phpSessionId) {
        setSid()
      }
      const data = {
        url: "https://wp-api.wxb.com/chat/history",
        params: {
          page: 1,
          pagesize: 10,
          q: "总结",
          scope: "self"
        }
      }
      getHistory(data).then(v => {
        console.log(v)
      })
    }
  },
  created() {
    console.log(this.fullDialogId);
    this.getGroupMemberListByWehchatGroup(this.fullDialogId);
  }
};
</script>

<style scoped></style>
