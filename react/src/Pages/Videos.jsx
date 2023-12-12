import { useState } from "react";
import Video from "../components/Video";


const UserFeed =  () => {

    const [active, setActive] = useState("1");

    const handleClick = (ev) => {
        ev.preventDefault();
        setActive(ev.target.id);        
    }

    return (
        <div className="authenticated-container">
            <div className="feed">
            <div className='section-header-col'>
                    <div className="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM10.7828 7.99043L16.4265 11.1258C17.1123 11.5068 17.1123 12.4932 16.4265 12.8742L10.7828 16.0096C9.98293 16.4539 9 15.8756 9 14.9606V9.03942C9 8.12444 9.98293 7.54607 10.7828 7.99043Z" fill="#222222"/>
                        </svg>
                        <h3>Videos</h3> 
                    </div>
                        <div className="rounded-card">
                            <text id="1" className={active === "1" ? "active" : undefined} onClick={handleClick}>All</text>
                            <text id="2" className={active === "2" ? "active" : undefined} onClick={handleClick}>Your Communities</text>
                        </div>
                    </div>
                    <div className="card">
                        <Video link="https://www.youtube.com/watch?v=aAxGTnVNJiE" title="How to Crochet for Absolute Beginners: Part 1" description="Today I'm showing you how to crochet for absolute beginners. A detailed step-by-step tutorial on how to crochet a chain and a single crochet, as well as make a slip knot, hold the crochet hook and yarn, and weave in the ends of your work." creator="simplydaisy" link="https://www.youtube.com/watch?v=aAxGTnVNJiE" community="Crochet" id=""/>
                    </div>
            </div>
            <div className="recommended">
            </div>
        </div>
    )
}

export default UserFeed;