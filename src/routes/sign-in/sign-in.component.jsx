import { signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () =>{
    const logGoogleUser = async() =>{
        const {user} = await signInWithGooglePopup();
        console.log("user",user)
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return(
        <div>
            <h2>I am sign in page</h2>
            <button onClick={logGoogleUser}>
                Sign in with Google
            </button>
        </div>
    )
}

export default SignIn;