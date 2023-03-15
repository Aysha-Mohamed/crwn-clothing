import { signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

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
            <SignUpForm />
        </div>
    )
}

export default SignIn;