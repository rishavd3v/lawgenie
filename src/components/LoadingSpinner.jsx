export default function LoadingSpinner(){
    return(
        <div className="flex justify-center items-center h-[80vh] bg-background">
            <div className="animate-spin rounded-full w-14 aspect-square border-t-2 border-b-2 border-primary"></div>
        </div>
    )
}