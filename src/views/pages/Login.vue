<template>
  <v-container id="login" fill-height tag="section">
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card color="success" light max-width="100%" width="400" class="px-5 py-3">
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Login
              </h1>

              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :href="social.href"
                class="ma-1"
                icon
                rel="noopener"
                target="_blank"
              >
                <v-icon v-text="social.icon" />
              </v-btn>
            </div>
          </template>

          <v-card-text class="text-center">
            <div class="text-center grey--text body-1 font-weight-light">
              Or Be Classical
            </div>
            <ValidationObserver v-slot="{ invalid }">
              <v-form class="text-center" @submit.prevent="onSubmit">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="min:5|max:15|alpha_num|required"
                  name="用户名"
                >
                  <v-text-field
                    color="secondary"
                    label="First Name..."
                    prepend-icon="mdi-face"
                    class="mt-10"
                    v-model="form.username"
                  />
                  <span class="err">{{ errors[0] }}</span>
                </ValidationProvider>
                <!-- <v-text-field
              color="secondary"
              label="Email..."
              prepend-icon="mdi-email"
            /> -->
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
                    v-model="form.password"
                  />
                  <span class="err mb-6">{{ errors[0] }}</span>
                </ValidationProvider>
                <div>
                  <pages-btn
                    large
                    color=""
                    depressed
                    class="v-btn--text success--text"
                    type="submit"
                    :disabled="invalid"
                  >
                    Let's Go
                  </pages-btn>
                </div>
              </v-form>
            </ValidationObserver>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "PagesLogin",

  components: {
    PagesBtn: () => import("./components/Btn")
  },

  data: () => ({
    socials: [
      {
        href: "#",
        icon: "mdi-facebook-box"
      },
      {
        href: "#",
        icon: "mdi-twitter"
      },
      {
        href: "#",
        icon: "mdi-github-box"
      }
    ],
    passwordShow: false,
    form: {
      username: "",
      password: ""
    }
  }),
  methods: {
    async onSubmit() {
      // login(this.form).then(value => {
      //   console.log(value)
      // })
      await this.$store.dispatch('user/login', this.form).then(res => {
        console.log(res)
        this.$message({
          message: res.msg,
          type: 'success'
        });
        setTimeout(() => {
          this.$router.push('/').catch(err => {
            console.log(`all good${err}`)
          })
          }, 500)
      })
    }
  }
};
</script>
