import { setDoc, doc, collection, getDocs, getDoc, where, query } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { map } from 'lodash';
import { db } from "../utils";

export class Album{
    collectionName = 'albums';

    async create(image, name, artist, year){
        try {
            const id = uuidv4();
            const slug = image.substring(0, image.lastIndexOf('.'));
            const createdAt = new Date();
            const data = {
                id,
                name,
                slug,
                image,
                artist,
                createdAt
            };

            const artistDoc = doc(db, this.collectionName, id);
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

    async getAlbum(id){
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

    async getAlbumsByArtist(id){
        try {
            const whereRef = where('artist', '==', id);
            const docRef = collection(db, this.collectionName);
            const queryRef = query(docRef, whereRef);
            const snapshot = await getDocs(queryRef);
            return map(snapshot.docs, doc => doc.data());
            
        } catch (error) {
            console.log(error);
        }
    }

}