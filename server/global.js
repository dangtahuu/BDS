const { initDbConnection } = require('./connection');
global.CLIENT_CONNECTION123 = initDbConnection();
global.FOLDER_UPLOAD = __dirname + '/uploads/'