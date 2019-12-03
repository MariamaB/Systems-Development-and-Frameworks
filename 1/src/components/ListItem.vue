<template>
  <li>
    <div class="itemContainer">
      <div class="messageSection" style="display:inline-block;">
        <template v-if="onEdit">
          <input v-model="newTodo.message" />
                  <select v-model="newTodo.assignedTo">
                    <option></option>
                  <option 
                    :value="user.id" 
                    :key="index"
                     v-for="(user, index) in users"
                     :selected="user.id === newTodo.assigendTo"
                     >
                     {{ user.email }}
                     </option>
                </select>
                
        </template>
        <template v-else>{{todo.message}} - {{assignedToUser}}</template>
      </div>

      <div class="mb5">
        <span class="buttonContainer" v-if="!onEdit">
          <a @click="setEditMode(true)">
            <img title="Edit" class="icon" src="../assets/edit_circ.png" />
          </a>
          <span class="space" />
          <a @click="deleteListItem(todo.id)">
            <img title="Delete" class="icon" src="../assets/delete_circ.png" />
          </a>
        </span>
        <span class="buttonContainer" v-if="onEdit">
          <a @click="saveChanges()">
            <img title="Save" class="icon" src="../assets/save_circ.png" />
          </a>
          <span class="space" />
          <a @click="setEditMode(false)">
            <img title="Cancel" class="icon" src="../assets/cancel_circ.png" />
          </a>
        </span>
      </div>
    </div>
  </li>
</template>

<script>
import { clone } from 'lodash'

export default {
  name: "list-item",
  props: {
    users: {
      type: Array,
      required: true
    },   
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      onEdit: false,
      newTodo: {
        message: '',
        assignedTo: null
      }
    };
  },
  methods: {
    setEditMode(value) {
      if(value)
        this.newTodo = clone(this.todo);
        
      this.onEdit = value;
    },
    saveChanges() {
      this.setEditMode(false);
      this.$emit("todoChanged", this.newTodo);
    },
    changeMessage(event) {
      this.newMsg = event.target.value;
    },
    deleteListItem(id) {
      this.$emit("deleteListItem", id);
    }
  },
  computed: {
     assignedToUser() {
       /* eslint-disable */
        console.log(this.todo.assignedTo)
       let user = this.users.find((u) => u.id === this.todo.assignedTo);
       return user === undefined ? "none" : user.email
     }
  }
};
</script>

<style>
.itemContainer {
  border-bottom-style: inset;
  margin-bottom: 20px;
  border-bottom-color: #42b983;
  display: flex;
}

.buttonContainer {
  display: flex;
  cursor: pointer;
}

.mb5 {
  margin-bottom: 5px;
}

.messageSection {
  display: flex;
  align-self: center;
  justify-self: center;
  margin-left: 15px;
  flex: 2;
}

.icon {
  width: 30px;
  height: 30px;
}

.space {
  margin-right: 20px;
}

a {
  display: flex;
  align-content: center;
}

input {
  color: #42b983;
}
</style>