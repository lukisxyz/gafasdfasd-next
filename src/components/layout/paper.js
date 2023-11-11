export default function Paper(props) {
    const { title, additionalheaderContent, subtitle, children } = props
    return (
        <div className="p-5 rounded-lg w-full bg-white">
            <div className="flex justify-between items-center py-3">
                <div className="font-medium text-lg text-black">
                    <h2 className="text-base mb-2 text-[#2c2c2c]">{title}</h2>
                    {subtitle}
                </div>
                <div>{additionalheaderContent}</div>
            </div>
            <div className="mt-3">{children}</div>
        </div>
    )
}
