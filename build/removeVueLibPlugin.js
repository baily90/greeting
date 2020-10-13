// dev模式下去除Vue.min.js的引入
function MyPlugin() {
    // Configure your plugin with options...
}

MyPlugin.prototype.apply = function (compiler) {
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
        compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
            'MyPlugin',
            (htmlPluginData, cb) => {
                htmlPluginData.html = htmlPluginData.html.replace(/<script.*vue-.*><\/script>\n?/, '');

                cb(null, htmlPluginData);
            }
        );
    });
};
module.exports = MyPlugin;