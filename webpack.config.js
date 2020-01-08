const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// https://stackoverflow.com/questions/41692643/webpack-and-express-critical-dependencies-warning

// https://stackoverflow.com/questions/52487112/sharing-code-between-projects-using-typescript-and-webpack/52487113

// https://github.com/NodeRedis/node_redis/issues/790#issuecomment-501869990

module.exports = {
    entry: {
        main: './src/main.ts',
        worker: './src/worker.ts',
    },
    devtool: 'inline-source-map',
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()],
    // plugins: [
    //     new webpack.IgnorePlugin(/^hiredis$/)
    // ],
    // node: {
    //     console: true,
    //     fs: 'empty',
    //     net: 'empty',
    //     tls: 'empty'
    // },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, './src/')
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({configFile: 'tsconfig.json'})],
        // plugins: [new TsconfigPathsPlugin()],
    },
    output: {
        filename: 'bundle-[name].js',
        path: path.resolve(__dirname, 'dist')
    },
};
