// client/src/components/SomeComponent.js

import React, { useState, useEffect } from 'react';
import Loading from './Preload.jsx';


const SomeComponent = () => {
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading (replace with actual data fetching)
        setTimeout(() => {
            // Assuming you've fetched data here
            setData(/* fetched data */);
            setIsLoading(false); // Set isLoading to false when data is ready
        }, 2000); // Simulate a 2-second data loading delay
    }, []);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                // Display your content when data is ready
                <div>
                    {





                    }
                </div>
            )}
        </div>
    );
};

export default SomeComponent;
