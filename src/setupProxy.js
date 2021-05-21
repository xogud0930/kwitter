const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use('/register',proxy({
        target: 'http://localhost:6050',
        changeOrigin: true,    
        secure: false
        })
    );
};