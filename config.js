const configuration = {
    development: {
        name: "development",
        database: 'dev-database',
        server: 'dev-server'
    },
    production: {
        name: 'production',
        database: 'prod-database',
        server: 'prod-server'
    }
}

module.exports = {
    getConfiguration: () => {
        return configuration[process.env.NODE_ENV] || configuration.development;
    }
}