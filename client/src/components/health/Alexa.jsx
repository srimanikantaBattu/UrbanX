import React, { useState } from 'react';

function Alexa() {
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combine date and time into a single Date object
        const scheduledDateTime = new Date(`${date}T${time}`);
        const scheduledTime = scheduledDateTime.getTime();

        if (scheduledTime < Date.now()) {
            setMessage('Please select a future date and time.');
            return;
        }

        // Send the data to the backend
        const response = await fetch('/api/schedule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, scheduledTime }),
        });

        if (response.ok) {
            setMessage('Scheduled successfully!');
        } else {
            setMessage('Failed to schedule. Please try again.');
        }
    };

    return (
        <div className="App">
            <h1>Alexa Text Scheduler</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <button type="submit">Schedule</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Alexa;
