import profileSvg from '../assets/profile.svg';
import { useAuth } from '../context/AuthContext';
export default function Avatar({ref,size=10}){
    const {user} = useAuth();
    return(
        <div ref={ref}>
            {user && <img src={user.photoURL?user.photoURL:profileSvg} alt="" className={`aspect-square rounded-full w-${size}`}/>}            
        </div>
    )
}