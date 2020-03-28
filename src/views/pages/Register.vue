<template>
  <v-container id="register" fill-height tag="section">
    <v-row justify="center">
      <v-col cols="9">
        <v-slide-y-transition appear>
          <v-card class="pa-3 pa-md-5 mx-auto" light>
            <pages-heading class="text-center display-3">Register</pages-heading>

            <v-row>
              <v-col cols="12" md="6">
                <v-row no-gutters>
                  <v-col v-for="(section, i) in sections" :key="i" cols="12">
                    <v-list-item three-line>
                      <v-list-item-icon class="mr-4 mt-5 mt-md-4">
                        <v-icon
                          :large="$vuetify.breakpoint.mdAndUp"
                          :color="section.iconColor"
                          v-text="section.icon"
                        />
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          class="font-weight-light mb-4 mt-3"
                          v-text="section.title"
                        />

                        <v-list-item-subtitle v-text="section.text" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12" md="6">
                <ValidationObserver v-slot="{ invalid }">
                  <v-form class="text-center" @submit.prevent="onSubmit">
                    <v-btn
                      v-for="(social, i) in socials"
                      :key="i"
                      :color="social.iconColor"
                      class="my-2 mr-1"
                      dark
                      depressed
                      fab
                      small
                    >
                      <v-icon v-text="social.icon" />
                    </v-btn>

                    <div class="my-2" />
                    <div class="text-center grey--text body-1 font-weight-light">
                      Or Be Classical
                    </div>

                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="min:2|max:10|required"
                      name="姓名"
                    >
                      <v-text-field
                        color="secondary"
                        label="First Name..."
                        prepend-icon="mdi-face"
                        v-model="registerForm.name"
                      />
                      <span class="err">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider v-slot="{ errors }" rules="email|required" name="邮箱">
                      <v-text-field
                        color="secondary"
                        label="Email..."
                        prepend-icon="mdi-email"
                        v-model="registerForm.email"
                        required
                      />
                      <span class="err">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="min:5|max:15|alpha_num|required"
                      name="用户名"
                    >
                      <v-text-field
                        color="secondary"
                        label="username..."
                        prepend-icon="mdi-account"
                        v-model="registerForm.username"
                      />
                      <span class="err">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="min:6|max:15|alpha_num|required"
                      name="密码"
                    >
                      <v-text-field
                        color="secondary"
                        label="Password..."
                        :type="passwordShow ? 'text' : 'password'"
                        prepend-icon="mdi-lock-outline"
                        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="passwordShow = !passwordShow"
                        v-model="registerForm.password"
                      />
                      <span class="err mb-8">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <v-checkbox :input-value="true" color="secondary">
                      <template v-slot:label>
                        <span class="text-no-wrap">I agree to the&nbsp;</span>

                        <a class="secondary--text ml-6 ml-sm-0" href="#">terms and conditions</a>.
                      </template>
                    </v-checkbox>

                    <pages-btn color="success" type="submit" :disabled="invalid"
                      >Get Started</pages-btn
                    >
                  </v-form>
                </ValidationObserver>
              </v-col>
            </v-row>
          </v-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PagesRegister",

  components: {
    PagesBtn: () => import("./components/Btn"),
    PagesHeading: () => import("./components/Heading")
  },

  data: () => ({
    sections: [
      {
        icon: "mdi-chart-timeline-variant",
        iconColor: "primary",
        title: "Marketing",
        text: `We've created the marketing campaign of the website. It was a very interesting collaboration.`
      },
      {
        icon: "mdi-code-tags",
        iconColor: "secondary",
        title: "Fully Coded in HTML5",
        text: `We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub.`
      },
      {
        icon: "mdi-account-multiple",
        iconColor: "cyan",
        title: "Built Audience",
        text: "There is also a Fully Customizable CMS Admin Dashboard for this product."
      }
    ],
    socials: [
      {
        href: "#",
        icon: "mdi-wechat",
        iconColor: "#1DA1F2"
      },
      {
        href: "#",
        icon: "mdi-qqchat",
        iconColor: "#ea4c89"
      }
      // {
      //   href: '#',
      //   icon: 'mdi-github',
      //   iconColor: '#3B5998'
      // }
    ],
    passwordShow: false,
    email: "",
    registerForm: {
      username: ""
    }
  }),

  methods: {
    async onSubmit() {
      // Only executes when validation passes!
      try {
        const res = await this.$http.post("/auth/register", this.registerForm);
        if (res) {
          this.$message({
            message: res.data.msg,
            type: res.data.code === 0 ? "success" : "info"
          });
          await setTimeout(() => {
            if (res.data.code === 0) {
              this.$router.push({ path: "/pages/login" });
            }
          }, 1000);
        }
      } catch (e) {
        console.log(e);
        this.$message({
          message: "信息录入格式错误",
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="sass">
#register
  .v-list-item__subtitle
    -webkic-line-clamp: initial
    -webkit-box-orient: initial
</style>
