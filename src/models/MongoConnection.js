import config from '../../config.js'
import { MongoClient } from "mongodb"

class MongoConnection {
    static client = null
    static db = null

    
    static connect = async () => {
        try {
        MongoConnection.client = new MongoClient(config.DBSTR)

        await MongoConnection.client.connect()
        console.log('Base de datos conectada! ')

        MongoConnection.db = MongoConnection.client.db(config.BASE)
        } catch (error) {
            console.log('Error de conexión Mongo DB: ', error)
        }
    }

}

export default MongoConnection