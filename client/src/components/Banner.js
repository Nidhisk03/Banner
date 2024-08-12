import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
function Banner() {
    const [banner, setBanner] = useState(null);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const fetchBanner = async () => {
            const { data } = await axios.get('http://localhost:5000/api/banner');
            setBanner(data);
            setTimer(data.timer);
        };
        fetchBanner();
    }, []);

    useEffect(() => {
        if (timer > 0 && banner?.isVisible) {
            const countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [timer, banner]);

    if (!banner || timer <= 0) return <p className="nothing-to-show">Nothing to show 1</p>;

    return (
        <div className="banner">
            {banner.isVisible ? (
                <>
                    <p className='hea' style={{ fontSize: '50px' }}>{banner.description}</p>
                    <a href={banner.link}>Click Here</a>
                    <p>Time left: {timer} seconds</p>
                </>
            ) : (
                <p className="nothing-to-show">Nothing to show</p>
            )}
        </div>
    );
}

export default Banner;



