const Loader = ({text}) => {
    return (
        <div className="flex flex-col justify-center items-center mt-4 space-y-2">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-yellow-500 rounded-full animate-spin"></div>
            {text && <span className="text-gray-600 font-medium">{text}</span>}
        </div>
    )
}

export default Loader