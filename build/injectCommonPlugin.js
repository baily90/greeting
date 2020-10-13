const config = require('../config');

function MyPlugin() {
    // Configure your plugin with options...
}

MyPlugin.prototype.apply = function (compiler) {
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
        compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
            'MyPlugin',
            (htmlPluginData, cb) => {
                // 注入公共js
                htmlPluginData.assets.js = config.build.commonResource.js.concat(htmlPluginData.assets.js);

                // 注入公共css
                htmlPluginData.assets.css = config.build.commonResource.css.concat(htmlPluginData.assets.css);

                cb(null, htmlPluginData);
            }
        );
    });
};
module.exports = MyPlugin;
