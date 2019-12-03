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
          v-for="item in todos"
          :todo="item"
          v-bind:onEdit="item.onEdit"
          :users="users"
          @deleteListItem="deleteListItem($event)"
          @todoChanged="editListItem(item.id, $event)"
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
      users: [],
      selectedRadioButton: 0
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

      if (this.selectedRadioButton === 1){
        this.addTodo(trimmedText);
      }
      }
    },
    editListItem(id, todo) {
      this.todos.forEach(element => {
        if (element.id === id) {
          element = todo;
        }

        if (this.selectedRadioButton === 1){
        this.updateTodo(todo.id, todo.message, todo.assignedTo);
      }
      });
    },
    deleteListItem(id) {
      this.todos = this.todos.filter(element => element.id != id);
         if (this.selectedRadioButton === 1){
        this.removeTodo(id);
      }
    },


      async addTodo(message) {
    // const result = 
    await this.$apollo.mutate({
      // Query
      mutation: gql`mutation ($message: String!) {
        addTodo( message: $message) {
          id
          message
          assignedTo
          status
        }
      }`,
      // Parameters
      variables: {
         message: message, 
      },
    })
  }, 
  
  async updateTodo(id, message, assignedTo) {
    await this.$apollo.mutate({
      // Query
      mutation: gql`mutation ($id: Int!, $message: String, $assignedTo: Int) {
        updateTodo(id: $id, message: $message, assignedTo: $assignedTo) {
          id
          message
          assignedTo
          status
        }
      }`,
      // Parameters
      variables: {
         id: id, 
         message: message, 
         assignedTo: assignedTo, 
      },
    })
  }, 
  
  async removeTodo(id) {
    await this.$apollo.mutate({
      mutation: gql`mutation ($id: Int!) {
        removeTodo(id: $id) {
          id
        }
      }`,
      // Parameters
      variables: {
         id: id
      },
    })
  },
  },

  apollo: {
    // Vue-Apollo options here
    todos: gql`query {
      todos{
        id,
        message
      }
    }`,  

    users: gql`query {
      users{
        id,
        email
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
