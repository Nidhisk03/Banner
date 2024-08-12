
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Dashboard() {
    const [isVisible, setIsVisible] = useState(true);
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(0);
    const [link, setLink] = useState('');
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    useEffect(() => {
        if (isUpdateMode) {
            const fetchBanner = async () => {
                const { data } = await axios.get('/api/banner');
                setIsVisible(data.isVisible);
                setDescription(data.description);
                setTimer(data.timer);
                setLink(data.link);
            };
            fetchBanner();
        }
    }, [isUpdateMode]);

    const createBanner = async () => {
        await axios.post('/api/banner', {
            isVisible,
            description,
            timer,
            link,
        });
        alert('Banner Created Successfully!');
        window.location.reload(); // Refresh the page after creating a banner
    };

    const updateBanner = async () => {
        await axios.post('/api/banner', {
            isVisible,
            description,
            timer,
            link,
        });
        alert('Banner Updated Successfully!');
        window.location.reload();
    };

    const toggleVisibility = async () => {
        const newVisibility = !isVisible;
        setIsVisible(newVisibility);
        await axios.post('/api/banner', {
            isVisible: newVisibility,
            description,
            timer,
            link,
        });
        window.location.reload();
    };

    const handleModeSwitch = (mode) => {
        setIsUpdateMode(mode === 'update');
        if (mode === 'create') {
            setIsVisible(true);
            setDescription('');
            setTimer(0);
            setLink('');
        }
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <button onClick={() => handleModeSwitch('create')}>Create Banner</button>
            <button onClick={() => handleModeSwitch('update')}>Update Banner</button>

            <button
                className={`toggle-button ${isVisible ? 'active' : ''}`}
                onClick={toggleVisibility}
            >
                {isVisible ? 'Hide Banner' : 'Show Banner'}
            </button>

            <label>
                Banner Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Timer (seconds):
                <input
                    type="number"
                    value={timer}
                    onChange={(e) => setTimer(e.target.value)}
                />
            </label>
            <label>
                Banner Link:
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
            </label>
            {isUpdateMode ? (
                <button onClick={updateBanner}>Update Banner</button>
            ) : (
                <button onClick={createBanner}>Create Banner</button>
            )}
        </div>
    );
}

export default Dashboard;

