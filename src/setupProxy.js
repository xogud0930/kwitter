const proxy = require('http-proxy-middleware');

const apiUrl = 'https://kwitter-server.herokuapp.com'

module.exports = function(app) {
    app.use(
        '/api',
        proxy({
        target: apiUrl, 
        changeOrigin: true, 
        }) 
    );
};