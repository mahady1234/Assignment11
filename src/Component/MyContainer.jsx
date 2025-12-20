import React from 'react';

const MyContainer = ({ children }) => {
    return (
        <div className='md:w-11/12 w-full mx-auto'>
            {children}
        </div>
    );
};

export default MyContainer;