const mssql = require('mssql');

;(async function main() {
    console.log("Started");
    try {
        await mssql.connect(process.env.CONNECTION_STRING);
        const result = await mssql.query`SELECT CHECKSUM('a') AS result`;
        console.dir(result);
        console.log("Success!");
    } catch (err) {
        console.log(err);
        console.log("Failed!");
    }
    console.log("Finished");
    process.exit(0);
})();
