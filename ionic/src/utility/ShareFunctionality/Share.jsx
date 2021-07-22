import { SocialSharing } from '@ionic-native/social-sharing';

export const shareViaFacebook = (
    message, 
    onSuccess = ()=>console.log("Facebook Share Complete"), 
    onFail = ()=>console.log("Facebook Share Fail")
    ) => {

        console.log(message)

        SocialSharing.canShareVia("facebook")
        .then(function(){
            SocialSharing.shareViaFacebook(message)
            .then( function(){
                onSuccess()
            })
        })
        .catch( function(){
            onFail()
        })
    

}


export const shareViaTwitter = (
    message, 
    onSuccess = ()=>console.log("Twitter Share Complete"), 
    onFail = ()=>console.log("Twitter Share Fail")
    ) => {

        SocialSharing.canShareVia("twitter")
        .then(() => {
            SocialSharing.shareViaTwitter(message)
            .then( function(){
                onSuccess()
            })
        })
        .catch( function(){
            onFail()
        })

}

export const shareDefault = (
    message, 
    title, 
    onSuccess = ()=>console.log("Share Complete"), 
    onFail = ()=>console.log("Share Fail")
    ) => {

        SocialSharing.share(message, title,)
        .then( function(){
            onSuccess()
        })
        .catch( function(){
            onFail()
        })

}