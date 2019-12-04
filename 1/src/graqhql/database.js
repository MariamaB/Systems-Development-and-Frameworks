var d = new Date();


const data = {
    todos: [
        { id: '1', message: "Foo", status: false, createdAt: d.getTime(), assignedTo: null },
        { id: '2', message: "Bar", status: false, createdAt: d.getTime(), assignedTo: null },
        { id: '3', message: "Baz", status: false, createdAt: d.getTime(), assignedTo: null }
    ],
    users: [
        { id: 1, email: "foo@example.com", password: "1234", loggedIn: false },
        { id: 2, email: "bar@example.com", password: "1234", loggedIn: false },
        { id: 3, email: "baz@example.com", password: "1234", loggedIn: false },
    ],
    sessions: []
}

module.exports = data;