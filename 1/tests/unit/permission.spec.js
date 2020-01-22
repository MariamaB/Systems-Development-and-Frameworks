import { v1 as neo4j } from 'neo4j-driver';
import { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } from './../../src/_backend/jwt/config';
import schema from './../../src/_backend/schema';
import { gql } from "apollo-server";
import { applyMiddleware } from "graphql-middleware";
import { createTestClient } from "apollo-server-testing";
import { ApolloServer } from "apollo-server";
import decode from './../../src/_backend/jwt/decode';
import { rules } from './../../src/_backend/permissions/permissions';
import { middlewares } from './../../src/_backend/permissions/permissions';

let driver

const todos = gql `
query {
    todos {
      id
      message
      status
      assignedTo {
          email
      }
    }
}`;

const login = gql `
mutation login($email: String!, $password:String!){
    login(email: $email, password: $password){
        email
        role
        token
      }
    }
  `;

const assignTo = gql `
mutation assignTodo($id: ID!, $assignedTo:ID!){
    assignTodo(id: $id, assignedTo: $assignedTo){
        id
      message
      status
      assignedTo {
          email
      }
    }
   }
  `;


let query;
let mutate;
let token;
const schemaWithMiddleware = applyMiddleware(schema, rules, middlewares);




beforeAll(async() => {
    driver = neo4j.driver(
        NEO4J_URI,
        neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
    )


    const testServer = new ApolloServer({
        schema: schemaWithMiddleware,
        context: () => {
            return {
                user: decode(token),
                driver
            }
        }
    });

    query = createTestClient(testServer).query;
    mutate = createTestClient(testServer).mutate;

})

describe('Test permission layer', () => {
    beforeAll(async() => {
        let res = await mutate({
            mutation: login,
            variables: {
                email: "admin@example.com",
                password: "1234"
            }
        });
        console.log('Log Message!!!!')
        console.log('user', JSON.stringify(res.data.login, null, 1))
        token = res.data.login.token
    })


    it('token should be any string ', () => {
        // console.log('token', JSON.stringify(token, null, 1))
        expect(token).toStrictEqual(expect.any(String));
    });


    // login(email: "foo@example.com", password: "1234")
    it('Should be Array', async() => {
        let res = await query({
            query: todos,
        })
        expect(res.data.todos).toBeInstanceOf(Array);
    });

    it('Should be Array', async() => {
        let res = await mutate({
            mutation: assignTo,
            variables: {
                id: "1",
                assignedTo: 1
            }
        })

        let todosRes = await query({
            query: todos,
        })
        expect(res.data.todos).toBeInstanceOf(Array);

    });

})


afterAll(async() => {

    await driver.close();
});