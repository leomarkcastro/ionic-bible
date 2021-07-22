import firebase from "firebase"

const config = {
    apiKey: "AIzaSyBY8PJla66lVXxjzzACwGS_6nfavl0qo3I",
    authDomain: "thegoodbook-c7ba8.firebaseapp.com",
    projectId: "thegoodbook-c7ba8",
    storageBucket: "thegoodbook-c7ba8.appspot.com",
    messagingSenderId: "545460336943",
    appId: "1:545460336943:web:db83d880962c13178309da"
};

firebase.initializeApp(config)

export async function loginUser(email, password, resultCB=(e)=>console.log(e)){
    
    try{
        const res = await firebase.auth().signInWithEmailAndPassword(email, password)

        resultCB(res)
        return true
    }
    catch(error){
        resultCB(error)
        return false
    }
    
}

export async function loginUserGoogle(resultCB=(e)=>console.log(e), errorCB=(e)=>console.log(e),){
    
    try{
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider);
        
        firebase.auth()
            .getRedirectResult()
            .then((result) => {
                if (result.credential) {
                    /** @type {firebase.auth.OAuthCredential} */
                    let credential = result.credential;

                    // This gives you a Google Access Token. You can use it to access the Google API.
                    let token = credential.accessToken;
                    // ...
                }
                    // The signed-in user info.
                let user = result.user;
                resultCB(result)
            }).catch((error) => {
                /*
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // The email of the user's account used.
                let email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                let credential = error.credential;
                // ...
                */
                errorCB(error)
            });
        
        return true
    }
    catch(error){
        resultCB(error)
        return false
    }
    
}

export async function registerUser(email, password, resultCB=(e)=>console.log(e)){
    
    try{
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password)

        resultCB(res)
        return true
    }
    catch(error){
        resultCB(error)
        return false
    }
    
}

export function logoutUser(){
    firebase.auth().signOut()
}

export function hookAccount(callback){

    firebase.auth().onAuthStateChanged(callback)

}

export function message_hook(doc, callback, errorCB){

    const unsubscribe = firebase.firestore()
        .collection('messages')
        .doc(doc)
        .onSnapshot(
            callback,errorCB
        )
    
    return {
        unsubscribe : unsubscribe,
        createAgain : function(){
            unsubscribe()
            message_read()

        }
    }

}

export async function message_read(doc){

    try{
        let res = await firebase.firestore()
                            .collection('saveStates')
                            .doc(doc)
                            .get()

        if (res.exists) {
            console.log("Document data:", res.data());
            return res.data()
        } else {

            // doc.data() will be undefined in this case
            return {}
        }

    }
    catch(error){
        console.log(error)
        return false
    }

}

export async function message_write(doc, message){

    try{
        await firebase.firestore()
                            .collection('saveStates')
                            .doc(doc)
                            .set(message)

        console.log("Write Done")
        return true
    }
    catch(error){
        console.log(error)
        return false
    }

}

export async function message_delete(doc){

    try{
        await firebase.firestore()
                            .collection('saveStates')
                            .doc(doc)
                            .delete()

        console.log("Delete Done")
        return true
    }
    catch(error){
        console.log(error)
        return false
    }

}