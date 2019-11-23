const mssql = require('mssql');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

;(async function main() {
    console.log("Started");
    try {
        await mssql.connect(process.env.CONNECTION_STRING);

        const csvWriter = createCsvWriter({
            path: 'data/pairs.csv',
            header: [
                {id: 'code1', title: 'code1'},
                {id: 'code2', title: 'code2'},
                {id: 'char1', title: 'char1'},
                {id: 'char2', title: 'char2'},
                {id: 'checksum', title: 'checksum'},
            ]
        });

        let r = {
            code1: 0, code2: null,
            char1: null, char2: null,
            checksum: null,
        }
        let sql = "";

        for (r.code1 = 1; r.code1 < 256; r.code1++) {
            console.log("Code " + r.code1);
            if (r.code1 >= 32) {
                r.char1 = String.fromCharCode(r.code1);
            } else {
                r.char1 = '';
            }

            for (r.code2 = 0; r.code2 < 256; r.code2++) {
                if (r.code2 < 32) {
                    r.char2 = null;
                } else {
                    r.char2 = String.fromCharCode(r.code2);
                }
                if (r.code2 === 0) {
                    sql = "SELECT CHECKSUM(CHAR(" + r.code1 + ")) AS crc";
                } else {
                    sql = [
                        "SELECT CHECKSUM(CONCAT(CHAR(", r.code1, "),CHAR(",
                        r.code2, "))) AS crc"
                    ].join("");
                }

                const rs = await mssql.query(sql);
                for (let i = 0; i < rs.recordset.length; i++) {
                    r.checksum = rs.recordset[i].crc;
                    await csvWriter.writeRecords([r]);
                }
            }
        }
        await mssql.close();
        console.log("Success!");
    } catch (err) {
        console.log(err);
        console.log("Failed!");
    }
    console.log("Finished");
})();
