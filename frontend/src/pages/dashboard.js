import Banner from '../components/Banners/banner';
import TitleCard from '../components/Cards/titlecard';
import Card from '../components/Cards/card';
import GrantCard from '../components/Cards/grantCard';

import "./styling/common.css";
import "./styling/dashboard.css";

function Dashboard(props) {
    let activeProposals = props.activeProposals;
    let activeGrants = props.activeGrants;

    function FilterProposals() {
        return activeProposals.map(proposal => <Card provider={props.metamaskProvider} proposal={proposal} />);
    }
    
    function FilterGrants() {
        return (
            activeGrants.map(grant => {
                return <GrantCard title={grant.title} desc={grant.desc} amount={grant.amount} yesVotes={grant.yesVotes} noVotes={grant.noVotes} active={grant.active}/>
            }))
    }

    return (
    <div className="container-fluid">
        <div className="container-fluid App-content">
            <div className="App">
                <div className="row">
                    <div className="col-12">
                        <Banner name1="Total Supply" name2="Active Proposals" name3="Active Grants" supply="69420/69420" proposals={activeProposals.length} grants={activeGrants.length}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <TitleCard cardTitle="Active Proposals"/>
                        <ul>
                            <FilterProposals />
                        </ul>
                    </div>
                    <div className="col-6">
                        <TitleCard cardTitle="Active Grants"/>
                        <ul>
                            <FilterGrants />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Dashboard;