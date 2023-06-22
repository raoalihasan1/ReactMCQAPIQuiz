import React from "react";

export default function QuestionNum({ num, count }) {

    return (
        <div className="block p-7 text-center mt-5 mb-5">
            <h5 className="text-md tracking-wide text-gray-900">Question: {num}/{count}</h5>
        </div>
    );

}