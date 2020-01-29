<template>
  <div class="inputContainer" style="display:right">
    <h3 v-if="!this.token">Please enter your login details</h3>
    <h3 v-else>Hello {{this.email}}</h3>
    <form action="#" @submit.prevent>
      <input type="email" placeholder="example@email.de" v-model="form.email" />
      <input type="password" placeholder="******" v-model="form.password" />
      <button type="submit" @click="login">sign in</button>
      <!-- <button v-else type="submit" @click="logout">sign out</button> -->
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "login",
  props: {},
  methods: {
    async login() {
      console.log("Login mutation started");

        localStorage.setItem('apollo-token',"")
        localStorage.setItem('me',"")
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              email
              role
              token
            }
          }
        `,
        // Parameters
        variables: {
          email: this.form.email,
          password: this.form.password
        }
      },
      );
        const {login} = data;
      console.log("Before if", login);
      if (login) {
        this.id = login.id;
        this.loggedIn = true;

        localStorage.setItem('apollo-token', login.token)
        localStorage.setItem('me', login.email)
        localStorage.setItem('role', login.role)
        
      }
    },
  },
    // async logout(){
    //   await this.$apollo.mutate({
    //     mutation: gql`mutation ($id: String!) {
    //   logout(id: $id) {
    //     id
    //   }
    // }`,
    // // Parameters
    // variables: {
    //    id: this.id,
    // },
    //   }).then((data) => {
    //               if (data.data.logout != null || data.data.logout!= undefined) {
    //               this.loggedIn = false;
    //               this.id = '';
    //               }

    //           }).catch((error) => {
    //               return error;
    //           })
    // }

  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      loggedIn: false,
      id: "",
      email: localStorage.getItem('me'),
      token: localStorage.getItem('apollo-token'),
    }
  },
};
</script>
