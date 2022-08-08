import Loading from "../components/Loading/loading";
import "./styling/loading.css"

import { Navigate } from 'react-router'
import { useSelector } from "react-redux";

export default function LoadingPage() {
    let loading = useSelector(state => state.isLoading);

    if (loading) {
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
