import { Github, UserRound } from "lucide-react";
import Container from "../components/Container";
import HighlightText from "../components/HighlightText";
import {useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignIn(){
    const {signinWithGoogle, signinWithGithub, user} = useAuth();
    const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        try {
            await signinWithGoogle();
            navigate("/home");
        }catch (e) {
            console.error("Google Sign-in failed:", e);
        }
    };
    const handleGithubSignIn = async () => {
        try {
            await signinWithGithub();
            navigate("/home");
        }catch (e) {
            console.error("Google Sign-in failed:", e);
        }
    };
    useEffect(() => {
        if(user){
            navigate("/home");
        }
    },[])
    return(
        <div className="h-[80vh] flex flex-col justify-center items-center">
            <HighlightText className={'mb-10'}>Secured Authentication</HighlightText>
            <Container className={"w-1/3"}>
                <div className="space-y-2 text-center">
                    <p className="text-2xl font-semibold">Sign In</p>
                    <p className="text-gray text-sm">Choose your preferred sign-in method</p>
                </div>
                <div className="w-full space-y-4">
                    <Button className={"bg-white text-gray-900"} onClick={handleGoogleSignIn}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="" />
                        <p>Sign In with Google</p>
                    </Button>
                    <Button className={"text-white hover:bg-gray-700"}>
                        <Github size={20}/>
                        <p>Sign In with GitHub</p>
                    </Button>
                    <Divider/>
                    <Button disabled={true}  className={"text-white hover:bg-gray-700"} onClick={handleGithubSignIn}>
                        <UserRound size={20}/>
                        <p>Continue as Guest</p>
                    </Button>
                </div>
            </Container>
        </div>
    )
}

function Button({disabled, children, className, onClick}) {
    return (
        <button className={`flex justify-center items-center gap-4 px-4 py-2 w-full bg-gray-800  font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] border border-gray-700 cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

function Divider(){
    return(
        <div className="relative my-6 w-full">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-400">or</span>
            </div>
        </div>
    )
}