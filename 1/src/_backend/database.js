var d = new Date();



   let users = [
        { id: 1, email: "foo@example.com", password: "1234", loggedIn: false},
        { id: 2, email: "bar@example.com", password: "1234", loggedIn: false},
        { id: 3, email: "baz@example.com", password: "1234", loggedIn: false},
    ];
   let  todos= [
        { id: '1', message: "Foo", status: false, createdAt: d.getTime(), assignedTo:""},
        { id: '2', message: "Bar", status: false, createdAt: d.getTime(), assignedTo:""},
        { id: '3', message: "Baz", status: false, createdAt: d.getTime(), assignedTo:""}
    ];
   


module.exports = {users,todos};