import { setDoc, doc, collection, getDocs, getDoc, where, query } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { map } from 'lodash';
import { db } from "../utils";

export class Album{
    collectionName = 'albums';
    collectionAux = 'songs';

    async create(image, name, artist, year, canciones){
        try {
            // generamos primero el album
            const idAlbum = uuidv4();
            const slug = image.substring(0, image.lastIndexOf('.'));
            const createdAt = new Date();
            const data = {
                idAlbum,
                name,
                slug,
                image,
                artist,
                year,
                createdAt
            };
            
            const artistDoc = doc(db, this.collectionName, idAlbum);
            await setDoc(artistDoc, data);

            
            
            // despues partimos las canciones
            const aCanciones = canciones.split('\n').map((cancion) => cancion.trim());
    
            for (const cancion of aCanciones) {
                // cogemos los 3 primeros caracteres y pasamos a integer
                const numero = cancion.substring(0, 2);
                const numeroInt = parseInt(numero, 10);
                // cogemos solo la cancion
                const nombre = cancion.substring(3);
                // quitamos .mp3 del nombre
                const nombreSinMp3 = nombre.substring(0, nombre.length - 4);
                // la ruta del archivo
                const url = window.location.origin + "/storage/" + artist + "/" + slug + "/" + cancion;
    
                const dataAux = {
                    id: uuidv4(),
                    album: idAlbum,
                    number: numeroInt,
                    name: nombreSinMp3,
                    file: url
                };

                const songDoc = doc(db, this.collectionAux, dataAux.id);
                await setDoc(songDoc, dataAux);

            }


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