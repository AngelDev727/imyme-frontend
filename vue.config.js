const path = require('path')
module.exports = {
    chainWebpack: config => {
        config.resolve.alias.set(
            '@app',
            path.resolve(__dirname, 'src/imyme-app'),
        )
        config.resolve.alias.set(
            '@tablet',
            path.resolve(__dirname, 'src/imyme-tablet'),
        )
        config.resolve.alias.set(
            '@signage',
            path.resolve(__dirname, 'src/imyme-signage'),
        )
        config.resolve.alias.set(
            '@shared',
            path.resolve(__dirname, 'src/shared'),
        )
    }
}
