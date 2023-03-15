import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}



const SignUpForm = () =>{

const [formFields, setFormFields] = useState(defaultFormFields);

//destructure it so that u can use it below

const { displayName,email,password,confirmPassword } = formFields;

//resetting form fields when the signup is successfull

const resetFormFields = () =>{
    setFormFields(defaultFormFields);
}

const handleSubmit = async (event) =>{
    event.preventDefault();
    if(password !== confirmPassword){
        alert("your passwords do not match");
        return;
    }

    //after passwords match, continue creating user
    try{

        //response will have a user object, so we are destructuring it.
        const {user} = await createAuthUserWithEmailAndPassword(email,password);
        console.log(user)

        //in this console, when you click signup, u will get the user details along with access token
        //but only email and password will be there, you will not get isplay name there. Because we are going to store that in database.
        // we are going to send the email info to the doc we are creating in database.

       await createUserDocumentFromAuth(user, { displayName });
       resetFormFields();

    }
    catch(error){

        console.log(error.code);
        //when we try to signin with the same email id , we get the below error,
        if(error.code === 'auth/email-already-in-use'){
            alert('Cannot create user,email already in use');
        }
        else{
            console.log('user creation encountered an error', error);
        }
     
    }
}

const handleChange = (event) =>{
    //get the name and value from on change. that is the reason why I gave the name attribute as same as the destructured name in state.
    const {name,value} = event.target;

    setFormFields({...formFields,[name]:value});
}

return (
  <div className="sign-up-container">
    <h2>Don't have an account?</h2>
    <span>Sign up with your mail and password</span>
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Display Name"
        required
        type="text"
        value={displayName}
        onChange={handleChange}
        name="displayName"
      />
      <FormInput
        label="Email"
        required
        type="email"
        value={email}
        onChange={handleChange}
        name="email"
      />

      <FormInput
        label="Password"
        required
        type="password"
        value={password}
        onChange={handleChange}
        name="password"
      />

      <FormInput
        label="Confirm Password"
        required
        type="password"
        value={confirmPassword}
        onChange={handleChange}
        name="confirmPassword"
      />

      <Button type="submit">Sign Up</Button>
    </form>
  </div>
);
}

export default SignUpForm;