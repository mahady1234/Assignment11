import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase.config';

export const AuthContext = createContext()

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

import useAxiosSecure from '../Hooks/useAxiosSecure';
import axios from 'axios';
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [roleLoading, setRoleLoading] = useState(true)
    const [role, setRole] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const axiosSecure = useAxiosSecure(user); 




    const createUser = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {

        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {

        return signOut(auth)
    }

    const updateUser = (updatedData) => {

        return updateProfile(auth.currentUser, updatedData)
    }

    useEffect(() => {
        const stableData = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            stableData()
        }
    }, [])


   
    useEffect(() => {
        if (!user) return;

        axios.get(`https://blood-donation-server-kappa.vercel.app/users/role/${user.email}`, {
            headers: { Authorization: `Bearer ${user.accessToken}` }
        })
            .then(res => {
                setRole(res.data.role);
                setUserStatus(res.data.status);
                setRoleLoading(false);
            })
            .catch(err => console.log(err));

    }, [user]);

    const authData = {
        auth,
        createUser,
        user, setUser,

        signInUser,
        logOut,
        updateUser,
        loading,
        setLoading,
        role,
        roleLoading,
        userStatus


    };
    return (<AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>);
};

export default AuthProvider;