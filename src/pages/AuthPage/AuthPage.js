import SignUpForm from "../../components/SignUpForm/SignUpForm"
 
import { useState } from "react";

export default function AuthPage({ user, setUser }){
    
    return(
        <main>
            <div>
           <SignUpForm />
            </div>

        </main>
    )

}