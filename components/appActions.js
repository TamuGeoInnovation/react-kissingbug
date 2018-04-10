import React from 'react'
import {
    AsyncStorage
} from 'react-native'

export default class AppActions {
    static async setItemInStorage(keyName, keyValue) {
        try {
            await AsyncStorage.setItem(keyName, keyValue).then((result) => {
                return result;
            });
        } catch (error) {
            // Error saving data
        }
    }
    static async getItemInStorage(keyName) {
        try {
            return await AsyncStorage.getItem(keyName)
        } catch (error) {
            // Error saving data
        }
    }
    static async sendContactMessage(body) {
        debugger
        // let contactUrl = 'http://165.91.120.49/kissingbug.tamu.edu/Rest/ContactWithAttachment/Push/';
        let contactUrl = 'http://kissingbug.tamu.edu/Rest/ContactWithAttachment/Push/';
        let postContentType = 'multipart/form-data';
        let otherPostContentType = 'application/x-www-form-urlencoded';
        try {
            let response = await fetch(contactUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': postContentType
                },
                body: body
            })
            return await response.json();
            // console.log(await response.json());

        } catch (error) {
            debugger
            console.error(error);
        }
    }


}

//let response = sendBugMessage(JSON.stringify(this.state));
// async function sendBugMessage(body) {
//     try {
//         let response = await fetch(contactUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': otherPostContentType
//             },
//             body: body
//         })
//         return await response.json();
//         // console.log(await response.json());

//     } catch (error) {
//         console.error(error);
//     }
// }