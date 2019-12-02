<template>
  <div class="mlt">
    <h2>Todo List</h2>
    <div class="listContainer">
      <div class="addContainer">
        <AddListItem v-model="newItemText" @keydown.enter="addItem" @click="addItem" />
      </div>
      <ol v-if="todos.length">
        <list-item
          v-bind:key="item.id"
          v-for="item in this.todos"
          v-bind:id="item.id"
          v-bind:message="item.message"
          v-bind:onEdit="item.onEdit"
          @deleteListItem="deleteListItem($event)"
          @messageChanged="editListItem(item.id, $event)"
        ></list-item>
        <section>
        <input type="radio" v-bind:value="0" v-model="selectedRadioButton">resolve actions only in Frontend
        <br/>
        <input type="radio" v-bind:value="1" v-model="selectedRadioButton">resolve actions in backend
        </section>
      </ol>
      <p v-else>Nothing left in the list. Add a new todo in the input aside.</p>

    </div>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
import AddListItem from "./AddListItem.vue";
import gql from 'graphql-tag'

let nextItemId = 4;

export default {
  name: "list",
  components: {
    ListItem,
    AddListItem
  },
  data() {
    return {
      newItemText: "",
      todos: [
        // { id: nextItemId++, message: "Foo" },
        // { id: nextItemId++, message: "Bar" },
        // { id: nextItemId++, message: "Baz" }
      ],
      selectedRadioButton: 1
    };
  },
  methods: {
    addItem() {
      const trimmedText = this.newItemText.trim();
      if (trimmedText) {
        this.todos.push({
          id: nextItemId++,
          message: trimmedText
        });
        this.newItemText = "";
      }

      if (this.selectedRadioButton === 1){
        this.addTodo(trimmedText, true);
      }
    },
    editListItem(id, message) {
      this.todos.forEach(element => {
        if (element.id === id) {
          element.message = message;
        }
      });
    },
    deleteListItem(id) {
      this.todos = this.todos.filter(element => element.id != id);
    },


      async addTodo(msg, status ) {
    // const result = 
    await this.$apollo.mutate({
      // Query
      mutation: gql`mutation ( $message: String!, $status: Boolean!) {
        addTodo( message: $message, status: $status) {
          id
          message
        }
      }`,
      // Parameters
      variables: {
        message: msg,
        status: status
      },
    })
  },
  // async removeTodo(id) {
  //   await this.$apollo.mutate({
  //      mutation: gql`mutation ($id: Int!) {
  //       addTag( message: $message, status: $status) {
  //         id
  //         message
  //       }
  //     }`,
  //   })
  // }
  },

  apollo: {
    // Vue-Apollo options here
    todos: gql`query {
      todos{
        id,
        message
      }
    }`,
  }
};
</script>



<style scoped>
.listContainer {
  flex-direction: column;
  display: flex;
}


.mlt {
  margin: 5% 0 0 10%;
}

.addContainer {
  display: flex;
  align-items: flex-end;
  /* margin-left: 10%; */
  /* background-color: aqua; */
  flex: 3;
}

ol {
  flex: 2;
  display: flex;
  flex-direction: column;
  width: 40%
}
</style>
