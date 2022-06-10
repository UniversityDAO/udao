import Banner from '../components/Banners/banner';
import Navbar from '../components/Navbar/navbar';
import TitleCard from '../components/Cards/titlecard';
import Card from '../components/Cards/card';
import MetamaskConnect from '../components/Buttons/MetamaskConnect';

import "./styling/common.css";
import "./styling/dashboard.css"

function Dashboard() {
    return (
    <div class="container-fluid">
        <Navbar />
        <div class="container-fluid App-content">
            <div className="App">
                <div class="dashboard-header">
                    <MetamaskConnect />
                </div>
                <div class="row">
                    <div class="col-12">
                        <Banner name1="Total Supply" name2="Active Proposals" name3="Active Grants" supply="69420/69420" proposals="8" grants="2"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <TitleCard title="Active Proposals"/>
                        <ul>
                            <li><Card title="Proposal 1 Title Here" desc="Proposal 1 Description"/></li>
                            <li><Card title="Proposal 2 Title Here" desc="Proposal 2 Description"/></li>
                            <li><Card title="Proposal 3 Title Here" desc="Proposal 3 Description"/></li>
                        </ul>
                    </div>
                    <div class="col-6">
                        <TitleCard title="Active Grants"/>
                        <ul>
                            <li><Card title="Grant 1 Title Here" desc="Grant 1 Description"/></li>
                            <li><Card title="Grant 2 Title Here" desc="Grant 2 Description"/></li>
                            <li><Card title="Grant 3 Title Here" desc="Grant 3 Description"/></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Dashboard;