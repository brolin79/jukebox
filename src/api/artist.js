import { setDoc, doc, collection, getDocs, getDoc, orderBy, limit, query, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { map } from 'lodash';
import { db } from "../utils";

export class Artist{
    collectionName = 'artists';

    async create(image, name){
        try {
            const idArtist = image.substring(0, image.lastIndexOf('.'));
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

    async getLast(){
        try {
            const docRef = collection(db, this.collectionName);
            const orderByRef = orderBy("createdAt", "desc");
            const limitRef = limit(20);
            const queryRef = query(docRef, orderByRef, limitRef);
            const snapshot = await getDocs(queryRef);
            return map(snapshot.docs, doc => doc.data());
            
        } catch (error) {
            console.log(error);
        }
    }


    async getArtist(id){
        try {
            const docRef = collection(db, this.collectionName);
            const whereRef = where('id', '==', id);
            const limitRef = limit(1);
            const queryRef = query(docRef, whereRef, limitRef);
            const snapshot = await getDocs(queryRef);
            return snapshot.docs[0].data();
        } catch (error) {
            console.log(error);
        }
    }

}