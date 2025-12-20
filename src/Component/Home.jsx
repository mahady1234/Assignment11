import React from 'react';
import BannerOne from './BannerOne';
import Review from './Review';
import BannerTwo from './BannerTwo';
import ContactUs from './ContactUs';


const Home = () => {
    return (
        <div>

            <BannerTwo></BannerTwo>
            <BannerOne></BannerOne>

            <Review></Review>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;