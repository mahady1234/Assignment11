import React from 'react';
import BannerOne from './BannerOne';
import Review from './Review';
import BannerTwo from './BannerTwo';
import ContactUs from './ContactUs';
import WhyDonateBlood from './ExtraSection1';
import WhoCanDonate from './ExtraSection2';
import FindBlood from './ExtraSection3';
import DonationProcess from './ExtraSection4';
import Volunteer from './ExtraSection5';


const Home = () => {
    return (
        <div>

            <BannerTwo></BannerTwo>
            <BannerOne></BannerOne>
            <Review></Review>
            <WhyDonateBlood></WhyDonateBlood>
            <WhoCanDonate></WhoCanDonate>
            <FindBlood></FindBlood>
            <DonationProcess></DonationProcess>
            <Volunteer></Volunteer>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;