import Banner from '../components/Banners/banner';
import TitleCard from '../components/Cards/titlecard';
import Card from '../components/Cards/card';

import "./styling/common.css";
import "./styling/dashboard.css"
import {getProposals, getGrants} from "../data/api.js"

const grantData = getGrants();
const proposalData = getProposals();

const activeGrants = grantData.filter(g => g.active);
const activeProposals = proposalData.filter(p => p.active);

function Dashboard() {
    return (
    <div class="container-fluid">
        <div class="container-fluid App-content">
            <div className="App">
                <div class="row">
                    <div class="col-12">
                        <Banner name1="Total Supply" name2="Active Proposals" name3="Active Grants" supply="69420/69420" proposals={activeProposals.length} grants={activeGrants.length}/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <TitleCard cardTitle="Active Proposals"/>
                        <ul>
                            {activeProposals.map(proposal => {
                                return <Card title={proposal.title} desc={proposal.desc} yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} active={proposal.active} tags={proposal.tags} />
                            })}
                        </ul>
                    </div>
                    <div class="col-6">
                        <TitleCard cardTitle="Active Grants"/>
                        <ul>
                            {activeGrants.map(grant => {
                                return <Card title={grant.title} desc={grant.desc} yesVotes={grant.yesVotes} noVotes={grant.noVotes} active={grant.active} tags={grant.tags} />
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Dashboard;