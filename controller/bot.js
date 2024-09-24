const db = require("../model/firebase");

class Bot {

    constructor(){
        const botMenue = `
        1. /addhabit - adding new habbit
        2. /deletehabit - delete habbit
        3. /myhabits - list of my habbits
        4. /trackhabit - track existing habbit`;
    }

    ///////////////////////////......................................////////////////////////

    ////////get user data
    async getUserData(chatid) {
        try {
            const chat_id = String(chatid);
            const user_reference = db.collection('botUsers').doc(chat_id);
            const user_document = await user_reference.get();

            if(!user_document.exists){
                await user_reference.set({habits: []});
                return { habits: [] };
            } 

            return user_document.data();

        } catch (error) {
            console.log(error);
            const errors = {
                status: 500,
                message: error.message
            };

            return errors;
        }
    }

    async updateUser(chatid, data) {
        try {
            const chat_id = String(chatid);
            const user_reference = db.collection('botUsers').doc(chat_id);
            await user_reference.set(data);
        } catch (error) {
            console.log(error);
            const errors = {
                status: 500,
                message: error.message
            };

            return errors;
        }
    }

}





module.exports = Bot;