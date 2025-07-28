export default function Container({ children, className="w-full" }) {
    return(
        <div className={`flex flex-col gap-8 items-center px-8 py-4 bg-gray-800/30 rounded-md border border-gray-800 min-h-1/2 max-h-3/4 overflow-auto scrollbar-hide ${className}`}>{children}</div>
    )
}