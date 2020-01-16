const { gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server');
const resolvers = require('../../src/_backend/resolvers');
const schema= require('../../src/_backend/schema');
const { setDriver }= require('../../src/_backend/server');




const server = new ApolloServer({ schema,resolvers, context: { driver },  introspection: true,
  playground: true});
const { query } = createTestClient(server);
const driver = setDriver();
const session = driver.session();


beforeAll(async () => {
  
    try {

        await session.run('MATCH (node) WHERE (node:Todo) DETACH DELETE node');
        await Promise.all([


            'CREATE (todo1:Todo { id: "1", message: "Foo", status: false, createdAt: "01-01-2020", assignedTo: 0})',
            'CREATE (todo2:Todo { id: "2", message: "Bar", status: false, createdAt: "01-01-2020", assignedTo: 0})',
            'CREATE (todo3:Todo { id: "3", message: "Baz", status: false, createdAt: "01-01-2020", assignedTo: 0})'
        ].map(statement => session.run(statement)));

        console.log("Data was successfully seeded!");
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await session.close();

        process.exit(0);
    }
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
     
      const expected = {
    
          data: { queryTodo: expect.any(Array)}
        
      }

     await expect(query({ query: queryTodo })).resolves.toMatchObject(expected)
  })
})
        

  
  afterAll(async () => {
    try {

      await session.run('MATCH (n) DETACH DELETE n');
      

      console.log("Data was successfully cleaned!");
      process.exit(0);
  } catch (e) {
      console.error(e);
      process.exit(1);
  } finally {
      await session.close();

      process.exit(0);
  }
  });
  


  
 