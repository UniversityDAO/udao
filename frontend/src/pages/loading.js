import Loading from "../components/Loading/loading";
import "./styling/loading.css"

import { Navigate } from 'react-router'
import { useEffect } from "react";

export default function LoadingPage(props) {
    useEffect(() => {
        props.loadApp();
    }, []);

        if (props.loading) {
            return (
                <div className="loading-page">
                    <div className="loading-content">
                        <Loading />
                        <span>Loading Data...</span>
                    </div>
                </div>
            )
        }
        else {
            return (
                <Navigate to="/Dashboard" replace={true}/>
            )
        }
}