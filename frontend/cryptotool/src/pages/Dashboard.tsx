// pages/Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>Welcome to Crypto Trends Visualization Tool!</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/crypto">View Crypto Prices</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;
