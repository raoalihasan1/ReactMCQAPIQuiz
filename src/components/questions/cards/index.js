import React from "react";

export default function Card({ question }) {

    return (
        <div className="block p-7 bg-white border border-gray-200 shadow rounded-xl text-center">
            <h5 className="text-3xl font-semibold tracking-wide text-gray-900">{question}</h5>
        </div>
    );

}