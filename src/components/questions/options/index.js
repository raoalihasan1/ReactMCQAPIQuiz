import React from "react";

export default function Options({ option, onClick, className, disabled }) {

    const handleOptionClick = () => {
        onClick(option);
    }

    return (
        <div className={`block p-7 shadow rounded-xl hover:cursor-pointer text-center mt-5 mb-5 focus:outline-none ${className}`} onClick={handleOptionClick} disabled={disabled}>
            <p className="tracking-wide text-gray-700 text-lg">{option}</p>
        </div>
    );

}