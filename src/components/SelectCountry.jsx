import { useRef, useState } from "react";
import { getCountries } from "../utils/country"
import { ChevronDown } from "lucide-react";
import { useClickAway } from "react-use";

export default function({showDropdown, setShowDropdown, selectedCountry, setSelectedCountry}) {
    const countries = getCountries();
    const ref = useRef();
    
    useClickAway(ref, () => {
        setShowDropdown(false);
    });

    return(
        <div ref={ref} className="relative">
            <div className="flex justify-between bg-gray-700/50 rounded-md p-2 text-sm cursor-pointer" onClick={()=>setShowDropdown(!showDropdown)}>
                {selectedCountry}
                <ChevronDown size={18} className={`w-4 transition-all duration-200 ${showDropdown && "rotate-180"}`}/>
            </div>

            {showDropdown && (
                <div className="absolute bottom-10 bg-gray-800 rounded-md w-full max-h-50 overflow-auto scrollbar-hide">
                    {countries.map((country, index) => (
                        <div key={index} className={`px-4 py-2 hover:bg-gray-600 cursor-pointer ${country==selectedCountry && "bg-gray-600"}`} onClick={() => {
                            setSelectedCountry(country);
                            setShowDropdown(false);
                        }}>
                            {country}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}