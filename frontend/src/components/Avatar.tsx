
export const Avatar = ({ name, size = "small" }: { name: string, size? : "small" | "big" | "large" }) => {
    return <div>
        <div className={`relative inline-flex items-center justify-center overflow-hidden 
                        bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6" :
                             size === "large" ? " w-12 h-12" : " w-8 h-8"}`}>
            <span className={`${size === "small" ? "text-sm" : size === "large" ? "text-xl" :" text-normal "} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
        </div>
    </div>
}