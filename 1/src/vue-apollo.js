import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

// Http endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:4000'
    //const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:4000/graphql/'

// Config
const defaultOptions = {
        // You can use `https` for secure connection (recommended in production)
        httpEndpoint,
        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        //wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:4000',
        // wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:4000/graphql/',
        // LocalStorage token
        tokenName: AUTH_TOKEN,
        // Enable Automatic Query persisting with Apollo Engine
        persisting: false,
        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        websocketsOnly: false,
        // Is being rendered on the server?
        ssr: false,

        // Override default apollo link
        // note: don't override httpLink here, specify httpLink options in the
        // httpLinkOptions property of defaultOptions.
        // link: myLink

        // Override default cache
        // cache: myCache

        // Override the way the Authorization header is set
        // getAuth: (tokenName) => ...

        // Additional ApolloClient options
        // apollo: { ... }

        // Client local data (see apollo-link-state)
        // clientState: { resolvers: { ... }, defaults: { ... } }

    }
    // Call this in the Vue app file
export function createProvider(options = {}) {
    const token = localStorage.getItem(AUTH_TOKEN);
    console.log('localstorage from Apollo', JSON.stringify(token, null, 1))
        // Create apollo client
    const { apolloClient, wsClient } = createApolloClient({
        ...defaultOptions,
        ...options,
    })
    apolloClient.wsClient = wsClient

    // Create vue apollo provider
    const apolloProvider = new VueApollo({
        defaultClient: apolloClient,
        headers: {
            authorization: token.length ? token : ""
        },
        errorHandler(error) {
            // eslint-disable-next-line no-console
            console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
        },
    })

    return apolloProvider
}