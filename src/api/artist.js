import { setDoc, doc, collection, getDocs, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { map } from 'lodash';
import { db } from "../utils";

export class Artist{
    collectionName = 'artists';

    async create(image, name){
        try {
            const idArtist = uuidv4();
            const createdAt = new Date();
            const data = {
                id: idArtist,
                image,
                name,
                createdAt,
            };

            const artistDoc = doc(db, this.collectionName, idArtist);
            await setDoc(artistDoc, data);

        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            const docRef = collection(db, this.collectionName);
            const snapshot = await getDocs(docRef);
            return map(snapshot.docs, doc => doc.data());
            
        } catch (error) {
            console.log(error);
        }
    }


    async getArtist(id){
        try {
            const docRef = doc(db, this.collectionName, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            }
            return null;
        } catch (error) {
            console.log(error);
        }
    }

}