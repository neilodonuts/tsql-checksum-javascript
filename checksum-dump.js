const mssql = require('mssql');

;(async function main() {
    console.log("Started");
    try {
        await mssql.connect(process.env.CONNECTION_STRING);
        const result = await mssql.query`SELECT CHECKSUM(CONCAT(CHAR(48), CHAR(48))) AS result`;
        console.dir(result);
        await mssql.close();
        console.log("Success!");
    } catch (err) {
        console.log(err);
        console.log("Failed!");
    }
    console.log("Finished");
})();
