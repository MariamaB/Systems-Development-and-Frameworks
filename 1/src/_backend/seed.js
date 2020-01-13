const neo4j = require('neo4j-driver').v1;
const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = require('./jwt/config');

const driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

(async function() {
    const session = driver.session();
    try {

        await session.run('MATCH (node) WHERE (node:User) OR (node:Todo) DETACH DELETE node');
        await Promise.all([
            'CREATE (admin:User { id: "0", email: "admin@example.com", password: "1234", role: "admin"})',

            'CREATE (user1:User { id: "1", email: "foo@example.com", password: "1234", role: "user"})',
            'CREATE (user2:User { id: "2", email: "bar@example.com", password: "1234", role: "user"})',
            'CREATE (user3:User { id: "3", email: "baz@example.com", password: "1234", role: "user"})',

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
})();