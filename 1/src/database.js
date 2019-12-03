var d = new Date();
const todos = [{
    id: 1,
    message: 'Angie Brown',
    status: false,
    createdAt: d.getTime(),
    
},
{
    id: 2,
    message: 'Michael Crichton',
    status: false,
    createdAt: d.getTime()+1,
}

];
module.exports = todos;