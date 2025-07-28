export default function Grid({ children, className }) {
    return (
        <div className={`grid grid-cols-6 ${className}`}>
            {children}
        </div>
    );
}