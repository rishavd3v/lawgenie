import { useAuth } from "../context/AuthContext";
import SettingCard,{ButtonCard,CardButton,CardTitle,CardContentSubtitle,CardContentTitle,CardContent,ProfileSection } from "../components/Profile/SettingCard";
import { useState } from "react";
import PopupCard from "../components/PopupCard";

export default function Profile(){
    const {user, signoutUser, deleteAccount} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [popupData, setPopupData] = useState({});
    
    const handleLogout = async ()=>{
        await signoutUser();
        setIsOpen(false);
    }

    const handleDelete = async ()=>{
        await deleteAccount();
        setIsOpen(false);
    }

    const handlePopup = (onConfirm,text)=>{
        setPopupData({onConfirm,text});
        setIsOpen(true);
    }
    return(

        <div className="flex justify-center mt-20 text-primary">
            {/* Account Section  */}
            <div className="flex flex-col gap-10 md:w-1/2 md:p-4 p-2 px-4">
                <div className="">
                    <SettingCard>
                        <CardTitle>My Account</CardTitle>
                        <ProfileSection name={user.displayName} email={user.email}/>

                        <CardContent>
                            <CardContentTitle>Full Name</CardContentTitle>
                            <CardContentSubtitle>{user.displayName}</CardContentSubtitle>
                        </CardContent>

                        <CardContent>
                            <CardContentTitle>Email</CardContentTitle>
                            <CardContentSubtitle>{user.email}</CardContentSubtitle>
                        </CardContent>
                    </SettingCard>
                </div>

                <div>
                    <SettingCard>
                        <CardTitle>System</CardTitle>

                        <ButtonCard>
                            <CardContentTitle>You are currently logged in as {user.displayName}</CardContentTitle>
                            <CardButton onclick={()=>handlePopup(handleLogout,"Are you sure you want to Logout?")} className={"bg-neutral-700 text-zinc-50 border-none"}>Logout</CardButton>
                        </ButtonCard>

                        <ButtonCard>
                            <div>
                                <CardContentTitle>Delete account</CardContentTitle>
                                <CardContentSubtitle>Permanently delete your account</CardContentSubtitle>
                            </div>
                            <CardButton onclick={()=>handlePopup(handleDelete,"Are you sure you want to delete your account? This action cannot be undone.")} className={"bg-red-700 text-zinc-50 border-none "}>Delete</CardButton>
                        </ButtonCard>

                        <PopupCard isOpen={isOpen} setIsOpen={setIsOpen} data={popupData}/>
                    </SettingCard>
                </div>
            </div>

        </div>
    )
}