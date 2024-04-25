import SQLite from "react-native-sqlite-storage";
import {Ndef} from "react-native-nfc-manager";
//import crypto from  "crypto";

function createNFCTokenFromDatabase() {
    SQLite.openDatabase(
        { name: "dbname.db", location:"default"},
        (db) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT user_data From nfc_data",
                    [],
                    (_, {rows}: {rows: {infoRow:{ user_data: string}[]}}) => {
                        const { infoRow } = rows;
                        infoRow.forEach((row: {user_data: string}) => {
                            const {user_data} = row;
                            const token = createNfcToken(user_data);
                            console.log("Token created:", token);
                            (Ndef.encodeMessage([Ndef.textRecord(token)]));
                        });
                    },
                    (error) => {console.error("Cannot connect to database", error);
                    }
                );
            });
        },
        (error) => {
            console.error("cannot open database", error);
        }
    );
}
//function encrypt(text: string, key: string){
    //const cipher = crypto.createCipher("aes-256-cbc", key);
    //let encrypted = cipher.update(text, "utf8", "hex");
   // encrypted += cipher.final("hex");
   // return encrypted;
}
function createNfcToken(user_data: string) {
    //const encryptionKey = crypto.randomBytes(16).toString("hex");
    let token = user_data;
    //token = encrypt(token, encryptionKey);
    return token;
}
export { createNFCTokenFromDatabase};