import React from "react";

export default function Slider({ value, onChange }) {

    const handleSliderChange = (event) => {
        const newVal = parseInt(event.target.value);
        if (newVal < 10) onChange(5);
        else if (newVal < 15) onChange(10);
        else if (newVal < 20) onChange(15);
        else if (newVal < 25) onChange(20);
        else onChange(25);
    }

    return (
        <div className="my-11">
            <div className="m-auto flex flex-col justify-center items-center">
                <input className="w-[200%]" type="range" min="5" max="25" value={value} onChange={handleSliderChange} />
                <div className="tracking-wide text-lg my-2">{value} Questions</div>
            </div>
        </div>
    );

}