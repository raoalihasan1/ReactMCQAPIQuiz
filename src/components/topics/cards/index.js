import React from "react";

export default function TopicCards({ id, topic, onClick }) {

    const handleCardClick = () => {
        onClick(id);
    };

    return (
        <div className="xl:w-[20%] lg:w-[60%] md:w-[80%] sm:w-[85%] block m-5 p-5 pt-6 pb-6 bg-white border border-gray-200 shadow rounded-[5rem] text-center hover:bg-gray-100 hover:cursor-pointer" onClick={handleCardClick}>
            <p className="text-lg font-semibold tracking-wide text-gray-900">{topic}</p>
        </div>
    );

}