export default function Container({ children, className="w-full" }) {
    return(
        <div className={`flex flex-col gap-8 justify-center items-center p-8 bg-gray-800/30 rounded-md border border-gray-800 ${className}`}>{children}</div>
    )
}