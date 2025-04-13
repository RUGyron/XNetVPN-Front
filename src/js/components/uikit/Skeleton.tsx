const Skeleton = ({ className = '' }: { className?: string }) => (
    <div className={`bg-gray-200 animate-pulse-fast rounded ${className}`}></div>
)

export default Skeleton
