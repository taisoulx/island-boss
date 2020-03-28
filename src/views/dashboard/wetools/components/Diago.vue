<template>
  <div>
    <v-dialog v-model="diago" persistent max-width="500">
      <v-card class="text-center">
        <v-card-title>
          {{title}}
          <v-spacer />

          <v-icon aria-label="Close" @click="closeDiago">
            mdi-close
          </v-icon>
        </v-card-title>
        <!--        表单内容-->
        <ValidationObserver v-slot="{ invalid }" @submit.prevent="onSubmit">
          <v-form  class="mt-5 px-10" >
            <div v-for="(item, i) in form" :key="i">
          <ValidationProvider
            v-slot="{ errors }"
            :rules="item.rules"
            :name="item.text"
          >
          <v-text-field v-if="item.type === `text`" :key="`group-${i}`" :label="item.text" v-model="item.value" />
            <v-file-input v-if='item.type ===`file`' :key="`item-${i}`" :multiple="item.multiple" :accept="item.accept" label="File input" v-model="item.value"/>
            <span class="err">{{ errors[0] }}</span>
          </ValidationProvider>
            </div>
            <v-card-actions>
              <v-spacer />
              <v-btn color="error" text @click="closeDiago">
                Close
              </v-btn>
              <v-btn color="success" :disabled="invalid" type="submit" min-width="60"  >
                确定
              </v-btn>
            </v-card-actions>

          </v-form>

        </ValidationObserver>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "diago",
  props: {
    dialogInput: Array,
    editedItem: Object,
    title: String
  },
  data() {
    return {
      diago: true,
      form: undefined,
    };
  },
  created() {
    // 将传入的值初始化为空
    const tmpHeaders = this.dialogInput.map(v => {
      //  对象需要深度拷贝
      const item = JSON.parse(JSON.stringify(v));
      // 如果是新增，则传入的editedItem为空,编辑就赋当前item值
      item.value = this.editedItem[item.name];
      return item
    });
    console.log(tmpHeaders)
    console.log(this.dialogInput)
    this.form = tmpHeaders;
  },
  methods: {
    onSubmit() {
      // 值传给父组件
      console.log('submit')
      const data = {};
      this.form.forEach(v => {
        console.log(v)
        data[v.name] = v.value
      })
      console.log(data)
      if (this.editedItem) {
        // console.log(this.editedItem)
        data._id = this.editedItem._id
      }
      this.$emit('onSure', data)
    },
    closeDiago() {
      this.$emit('closeDiago')
    }
  }
};
</script>

<style scoped></style>
