const {DataSource} = require('typeorm');
const oracledb = require('oracledb');
const reflectMetadata = require("reflect-metadata");
global.connection = new DataSource({
    type: "oracle", 
    name: "ffrs",    
    host: "172.16.200.43",
    port: 1521,
    username: "ffrsuser",
    password: "DApr0p3rty",
    database: "ffrs",
    connectString: "(DESCRIPTION =(ADDRESS_LIST =(ADDRESS = (PROTOCOL = TCP)(Host = 172.16.200.43)(Port = 1521)))(CONNECT_DATA =(SERVICE_NAME = FFRSORA.DA.GOV.PH)(SERVER=dedicated)))"
});


connection.initialize()
    .then((response) => {
        console.warn(`DB Connected`)
    })
    .catch((error) => console.warn(error))

    
module.exports = connection;