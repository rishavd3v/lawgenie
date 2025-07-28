import { User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export default function Avatar({ref,size=10, onClick}){
    const {user} = useAuth();
    return(
        <div ref={ref} onClick={onClick}>
            {user && user.photoURL ? <img src={user.photoURL} alt="" className={`cursor-pointer aspect-square rounded-full w-${size}`}/>:<div className='rounded-full aspect-square flex items-center justify-center bg-gray-600 p-2'><User size={20}/></div>}            
        </div>
    )
}