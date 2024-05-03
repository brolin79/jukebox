import { getAuth } from "firebase/auth";

export class User{

    async getMe () {
        return getAuth().currentUser;
    }


}
