const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, '.env') })

const requiredConfigs = {
    JWT_SECRET: 'ThisIsOurSecret!',
    GRAPHQL_PORT: 4000,
    CLIENT_URI: 'http://localhost:8080',
    GRAPHQL_URI: 'http://localhost:4000',
    NEO4J_USERNAME: 'graphql',
    NEO4J_PASSWORD: 'graphql',
    NEO4J_URI: 'bolt://localhost:7687'
        // NEO4J_URI: 'bolt://107.170.69.23:7687',
}




module.exports = requiredConfigs;