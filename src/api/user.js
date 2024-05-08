import { 
    getAuth, 
    updateProfile, 
    EmailAuthProvider, 
    reauthenticateWithCredential, 
    updateEmail,
    updatePassword
} from "firebase/auth";

export class User{

    getMe() {
        return getAuth().currentUser;
    }

    async updateAvatarUser(url) {
        const auth = getAuth();
        await updateProfile(auth.currentUser, { photoURL: url });
    }

    async updateDisplayName(displayName) {
        const auth = getAuth();
        await updateProfile(auth.currentUser, { displayName });
    }

    async updateEmail(newEmail, password) {
        const auth = getAuth();
        const email = auth.currentUser.email;

        const credentials = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(auth.currentUser, credentials);
        await updateEmail(auth.currentUser, newEmail);
    }

    async updatePassword(password, newPassword) {
        const auth = getAuth();
        const email = auth.currentUser.email;

        const credentials = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(auth.currentUser, credentials);
        await updatePassword(auth.currentUser, newPassword);
    }

}
