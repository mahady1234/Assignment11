import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <div className="mt-20 text-center px-4 className='mb-5'">

            <motion.h3
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="md:text-xl lg:text-2xl text-xl font-bold pt-3 text-base-content"
            >
                Donate blood, save lives, and spread hope together.
            </motion.h3>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-md mt-5 text-base-content/70"
            >
                “A single drop of blood can be a lifetime of hope for someone in need.”
            </motion.p>

        </div>
    );
};

export default Banner;
