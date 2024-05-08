import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export class Storage{

    async uploadFile (file, folder, nameFile ) {
        const storage = getStorage();
        const fileRef = ref(storage, `${folder}/${nameFile}`);
        return await uploadBytes(fileRef, file);
    }

    async getUrlFile (pathFile) {
        const storage = getStorage();
        const fileRef = ref(storage, pathFile);
        return await getDownloadURL(fileRef);
    }

}