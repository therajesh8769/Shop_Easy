import { useState } from 'react';
const Accordian = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className=" py-2 ">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full text-left text-black font-medium focus:outline-none"
            >
                <span>{title}</span>
                <span className="text-xl">{isOpen ? '-' : '+'}</span>
            </button>

            {isOpen && (
                <div className="mt-2 text-gray-700 text-sm leading-relaxed">
                    {content}
                </div>
            )}
        </div>

    );
}

export default Accordian;