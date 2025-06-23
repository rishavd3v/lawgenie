import Avatar from "../Avatar";

export default function SettingCard({children}){
    return(
        <div className="flex flex-col gap-4 font-light text-sm">
            {children}
        </div>
    )
}
function CardTitle({children}){
    return(
        <div className="font-medium text-base">
            {children}
            <div className="h-[0.5px] bg-accent2 w-full mt-4"></div>
        </div>
    )
}

function CardBody({children}){
    return(
        <div className="flex flex-col">
            {children}
        </div>
    )
}


function ProfileSection({name,email}){
    return(
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <div className="w-10"><Avatar/></div>
                <div className="flex flex-col">
                    <div className="text-sm font-medium">{name}</div>
                    <div className="text-xs text-accent">{email}</div>
                </div>
            </div>
            <CardButton className={"hover:text-primary hover:opacity-100"}>Change Avatar</CardButton>
        </div>
    )
}

function CardContent({children}){
    return(
        <div className="flex flex-col">
            {children}
        </div>
    )  
}

function ButtonCard({children}){
    return(
        <div className="flex justify-between items-center md:gap-0 gap-10">
            {children}
        </div>
    )  
}

function CardContentTitle({children}){
    return(
        <div className="text-sm">
            {children}
        </div>
    )
}
function CardContentSubtitle({children}){
    return(
        <div className="text-sm text-accent">
            {children}
        </div>
    )
}
function CardButton({children,className,onclick}){
    return(
        <div className={`p-2 rounded-lg border border-accent2 text-accent hover:opacity-80 transition-all ${className}`}>
            <button className="cursor-pointer" onClick={onclick}>{children}</button>
        </div>
    )
}
export {CardTitle,CardBody,CardContent,CardContentTitle,CardContentSubtitle,ButtonCard,ProfileSection,CardButton};