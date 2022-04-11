const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: { 
        index: './src/index.js' // 從哪裡開始打包
    },
    output: { 
        filename: 'bundle.[hash].js', // 要打包成什麼
        path: path.resolve('./dist'), // 要打包在哪裡
    },
    plugins: [
        new htmlWebpackPlugin({
        template: './index.html' // template 的位置為 index.html
        })
    ],
    module: {
        rules: [
            { 
                test: /.js$/,
                exclude: /node_modules/, //不編譯的檔案
                use: { 
                    loader: 'babel-loader',
                    options: { 
                        presets: ['@babel/preset-env',[ '@babel/preset-react', {"runtime": "automatic"}]] 
                    } 
                } 
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
        ],
    },
    devServer: {
        //指定開啟port為9000
        port: 9000,
        hot: true,
    }
};