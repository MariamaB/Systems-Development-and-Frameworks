const { setDriver }= require('../../src/_backend/server');

let data = require('./database');


  let todos = data.todos;
  let users = data.users;
  async function seedUsers(session,uid) {
   
    
    let writeTxResultPromise = session.writeTransaction(async txc => {
            
        let result = await txc.run(
        `
        CREATE(user:User {id:$id,
             email:$email,
              password:$password,
               loggedIn:$loggedIn})
        `,
            { id: users[uid].id,
                 email: users[uid].email, 
                 password: users[uid].password, 
                 loggedIn: users[uid].loggedIn},
        )
        if (result != null) {
            return result.records.map(record => ({
                user: record.get('user').properties
            }))
        }
    })
    let txResult = await writeTxResultPromise
    return txResult;
}; 

async function seedTodos(session,todoId) {
    
   
    writeTxResultPromise = session.writeTransaction(async txc => {
            
        let result = await txc.run(
            `
            CREATE(todos: Todo {
                id: $id, 
                message: $message, 
                status: $status, 
                createdAt: $createdAt,
                assignedTo: $assignedTo  
            }) WITH
            MATCH(u:User {email:$email})
            MERGE(todos)-[r:ASSIGNED_TO]->(u)
            `,
                { 
                    id: Number(todos[todoId].id), 
                    message: todos[todoId].message, 
                    status: false,
                    createdAt: ((new Date).getTime()).toString(),
                    assignedTo: users[todoId].email
                }
            )
        if (result != null) {
            return result.records.map(record => ({
                todos: record.get('todos').properties
            }))
        }
    })
     txResult = await writeTxResultPromise

}
 
;(async function () {
  
    const driver = setDriver();
    const session = driver.session();
   
    
        try {
 
                    await seedUsers(session,0)
                    await seedTodos(session,0)
                    await seedUsers(session,1)
                    await seedTodos(session,1)
                    await seedUsers(session,2)
                    await seedTodos(session,2) 
  
                    
                    process.exit(0)
                } catch (err) {
                    console.log(`\nError occurred seeding the nodes and relations (seed the db)\n\n${err}`) 
                    process.exit(1)
                } finally {
                    session.close();
                }
          
            })()

