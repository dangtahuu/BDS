exports.initModels = (connection, models) => {
    const arrayKeys = Object.keys(models);
    console.log(arrayKeys);
    arrayKeys.forEach(key => {
        // global[key] = connection.model(key);
    });
}

exports.initConnection = (dbName) => {
    console.log(dbName);
    const db = CLIENT_CONNECTION.useDb(dbName);
    return db;
}