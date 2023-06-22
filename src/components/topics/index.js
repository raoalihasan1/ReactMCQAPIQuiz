import React, { useState, useEffect } from "react";
import MCQ from "../questions";
import TopicCards from "./cards";
import Slider from "./slider";
import Axios from 'axios';

export default function Topics() {

    const [topics, setTopics] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [sliderValue, setSliderValue] = useState(10);

    const getTopics = () => {
        Axios.get("https://opentdb.com/api_category.php")
        .then((response) => {
            setTopics(response.data.trivia_categories);
        })
    };

    const removeSubstring = (topic, substrings) => {
        substrings.forEach((substr) => {
            topic = topic.replace(substr, '');
        });
        return topic.trim();
    };

    const handleTopicClick = (topicId) => {
        setSelectedTopicId(topicId)
    }

    const handleSliderChange = (value) => {
        setSliderValue(value);
    };

    useEffect(() => {
        getTopics();
    }, []);

    return selectedTopicId ? 
        <MCQ topicId={selectedTopicId} questionCount={sliderValue} /> :
        (
            <div className="flex h-screen">
                <div className="m-auto xl:w-[70%] lg:w-[90%] md:w-[95%] sm:w-[97.5%] flex flex-column flex-wrap justify-center items-center">
                    <div className="flex whitespace-nowrap justify-center items-center m-9">
                        <h3 className="tracking-wide text-2xl font-bold">Select A Topic For Questions:</h3>
                    </div>
                    <div className="flex flex-row flex-wrap justify-center items-center">
                        {topics.map((topic) => (
                            <TopicCards key={topic.id} id={topic.id} topic={removeSubstring(topic.name, ["Science:", "Entertainment:"])} onClick={() => handleTopicClick(topic.id)}/>
                        ))}
                    </div>
                    <Slider value={sliderValue} onChange={handleSliderChange} />
                </div>
            </div>
        );

}