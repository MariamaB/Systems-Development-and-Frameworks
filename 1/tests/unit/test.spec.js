const { gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server');
const resolvers = require('../../src/_backend/resolvers');
const schema= require('../../src/_backend/schema');
const driver= require('../../src/_backend/index');
let data = require('../../src/_backend/database');
const todos = data.todos;


const server = new ApolloServer({ schema,resolvers, context: { driver },  introspection: true,
  playground: true});
const { query } = createTestClient(server);

//let variables

beforeAll(async () => {
  await data.todos;
});
describe('get Todos', () => {
  const queryTodo = gql`
  query {
    Todo{
      id
      message
      assignedTo
    }
    }`
  it('should update the Assignee', async () => {
      // variables = { message: 'zoo', assignedTo: 1 }
      const expected = {
    
          data: { queryTodo: expect.any(Array)}
        
      }

     await expect(query({ query: queryTodo })).resolves.toMatchObject(expected)
  })
})
        

  
  afterAll(async () => {
    await cleanDB();
    driver.close();
  });
  
  async function cleanDB() {
    await runQuery(`MATCH (n) DETACH DELETE n`);
  }
  
  /* async function initDB() {
    await runQuery(`CREATE (n:Todo {id: "1", message: "Foo", status: false, createdAt:"01.01.2020", assignedTo:1})`);
    await runQuery(`CREATE (n:Todo {id: "2", message: "bar", status: false, createdAt:"01.01.2020", assignedTo:3})`);
    await runQuery(`CREATE (n:Todo {id: "3", message: "baz", status: false, createdAt:"01.01.2020", assignedTo:2})`);
  } */
/* 
  async function runQuery(query) {
    const session = driver.session();
    return session
      .writeTransaction(tx => tx.run(query))
      .then(result => {
        session.close();
        return result;
      })
      .catch(error => {
        session.close();
        return { error };
      });
  } */
  
  /* describe(`bla-bla-bla`, function() {
    beforeAll(async () => {
      await data.todos;
    });
  
    test(`bla-bla-bla`, async function() {
      //const result = await runQuery(`CREATE (n:Todo {message: "Foo"}) RETURN n LIMIT 25`);
     //Body of Test
     const expected = {
      data: expect.any(Array)
           
  
    }
    expect(query({ query: result})).resolves.toMatchObject(expected)
     
    });
  }); */