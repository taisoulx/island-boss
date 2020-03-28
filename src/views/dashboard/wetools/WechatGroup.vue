<template>
  <v-container id="data-tables" tag="section">
    <base-v-component heading="微信群" link="components/data-tables" />
    <Diago :dialogInput="dialogInput" :editedItem="editedItem" :title="dialogTitle" v-if="dialog" v-on:onSure="onSure" v-on:closeDiago="closeDiago" />
    <FullDialog v-if="fullDialog" v-on:closeFullDiago="closeFullDiago" :fullDialogId="fullDialogId" :title="fullDialogTitle"></FullDialog>

    <base-material-card color="indigo" icon="mdi-vuetify" inline class="px-5 py-3">
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          微信群
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
          <v-btn color="success" min-width="60" @click="elertForm">新增</v-btn>
        </v-col>
        <v-col md="3" class="ml-auto"> </v-col>
      </v-row>

      <v-divider class="mt-3" />

      <v-data-table
        :headers="headers"
        :items="items"
        :search.sync="search"
        :sort-by="['name', 'office']"
        :sort-desc="[false, true]"
        multi-sort
      >
        <template v-slot:item.actions="{ item }">
          <v-btn color="success" class="mr-1" fab x-small dark @click="editItem(item)">
            <v-icon
              small
            >
              mdi-pencil
            </v-icon>
        </v-btn>
          <v-btn color="success" class="px-1 ml-1" fab x-small dark @click="deleteItem(item)">
            <v-icon
              small
            >
              mdi-delete
            </v-icon>
          </v-btn>
          <v-btn color="success" class="px-1 ml-1" fab x-small dark @click="importJson(item)">
            <v-icon
              small
            >
              mdi-import
            </v-icon>
          </v-btn>
          <v-btn color="success" class="px-1 ml-1" fab x-small dark @click="groupDetail(item)">
            <v-icon
              small
            >
              mdi-card-account-details-star
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
import Diago from "@/views/dashboard/wetools/components/Diago";
import FullDialog from "@/views/dashboard/wetools/components/FullDialog";
import { fileToJson } from '@/utils/tool.js'
import {
 getGroupList, createGroup, updateGroup, deleteGroup
} from "@/api/wechatgroup";
import { createGroupByArray } from '@/api/wechatGroupMember'

export default {
  name: "WechatGroup",
  components: {
    Diago,
    FullDialog
  },

  data: () => ({
    headers: [
      {
        text: "群名称",
        name: 'groupName',
        value: "groupName",
        type: "text",
        // 是否是必填项目
        rules: "required"
      },
      {
        text: "群人数",
        name: 'groupNum',
        value: "groupNum",
        type: "text",
        rules: "isNum|required"
      },
      {
        text: '动作',
        value: 'actions',
        sortable: false
      },
      // {
      //   text: '导入群列表',
      //   // 文件属性，不能用string
      //   value: null,
      //   type: 'file'
      // }
    ],
    dialogInput: [],
    editedItem: {},
    items: [],
    search: undefined,
    dialogTitle: '添加',
    dialog: false,
    dialogType: '',
    fullDialog: false,
    fullDialogId: '',
    fullDialogTitle: ''
  }),
  methods: {
    // 点击确认，从子组件传来的值
    onSure(data) {
      // if(form)
      this.dialog = false;
      switch (this.dialogType) {
        default:
          console.log('类型不匹配')
              break
        case "add":
          createGroup(data).then(() => {
            this.$message({
              type: 'success',
              message: '微信群新增成功'
            })
          })
              break
        case "edit":
          updateGroup(data).then(() => {
            this.$message({
              type: 'success',
              message: '数据更新成功'
            })
          })
              break
        case "file":
          console.log(data)
          // eslint-disable-next-line no-case-declarations
          fileToJson(data.filename[0]).then(v => {
            console.log(v)
            if (!v.length) {
              this.$message({
                message: '文件为空或无法解析',
                type: 'warning'
              })
            } else {
              v.forEach(item => {
                item.wechatgroup = data._id
              })
              console.log(v)
              createGroupByArray(v).then(value => {
                console.log(value)
              })
            }
          }).catch(error => {
            this.$message({
              message: `解析失败${error}`,
              type: 'warning'
            })
          })
            break
      }
      this.getGroupList()
    },
    elertForm() {
      this.dialogInput = this.headers
      this.dialogType = 'add';
      this.dialogTitle = '添加'
      this.dialog = true;
    },
    closeDiago() {
      this.dialog = false;
    },
    editItem (item) {
      this.dialogInput = this.headers
      this.dialogTitle = '编辑'
      this.dialogType = 'edit'
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
       this.$confirm({
        message: '确定要删除本条记录',
        title: '提示',
        callback: async () => {
          await deleteGroup(item._id).then((v) => {
            if (v) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }
          })
          this.getGroupList()
        }
      });
    },
    importJson(item) {
      this.dialogTitle = '导入群成员';
      // 这里主要是传入_id
      this.editedItem = Object.assign({}, item)
      this.dialogInput = [
        {
          text: '导入群列表',
          name: 'filename',
          // 文件属性，不能用string
          value: null,
          type: 'file',
          multiple: false,
          accept: '.json',
          rules: "required"
        }
      ];
      this.dialogType = 'file';
      this.dialog = true;
    },
    getGroupList() {
      getGroupList().then(v => {
        console.log(v.data);
        this.items = v.data;
      });
    },

    groupDetail(item) {
      this.fullDialog = true
      this.fullDialogId = item._id
      this.fullDialogTitle = item.groupName
    },
    closeFullDiago() {
      this.fullDialog = false
    }
  },
  created() {
    this.getGroupList();
  }
};
</script>
