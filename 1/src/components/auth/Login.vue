<template>
  <div class="inputContainer" style="display:right">
    <h3 v-if="loggedIn === false">Please enter your login details</h3>
    <h3 v-else>Hello User</h3>
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
      const data = await this.$apollo.mutate({
        mutation: gql`
          mutation($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              id
            }
          }
        `,
        // Parameters
        variables: {
          email: this.form.email,
          password: this.form.password
        }
      });
      console.log("Before if");
      if (data.data.login != null || data.data.login != undefined) {
        this.loggedIn = true;
        this.id = data.data.login.id;
      }
      console.log("Before await");
      const userData = await this.$apollo.query({
        query: gql`
          query {
            users {
              id
              email
              loggedIn
            }
          }
        `
      });
      console.log(userData);
    }
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
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      loggedIn: false,
      id: ""
    };
  },

  apollo: {
    // Vue-Apollo options here
    users: gql`
      query {
        users {
          id
          email
          # password,
          loggedIn
        }
      }
    `
  }
};
</script>