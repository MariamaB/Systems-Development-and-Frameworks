const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, '.env') })


const {
    MAPBOX_TOKEN,
    JWT_SECRET,
    PRIVATE_KEY_PASSPHRASE,

  /*   NEO4J_URI = 'bolt://localhost:7687',
    NEO4J_USERNAME = 'neo4j',
    NEO4J_PASSWORD = 'neo4j', */
    GRAPHQL_PORT = 4000,
    CLIENT_URI = 'http://localhost:8080',
    GRAPHQL_URI = 'http://localhost:4000',
} = process.env

var requiredConfigs = {
    MAPBOX_TOKEN,
    JWT_SECRET,
    PRIVATE_KEY_PASSPHRASE,
    GRAPHQL_PORT,
    GRAPHQL_URI,
    CLIENT_URI
}




module.exports = {
    ...requiredConfigs,

} 
