import Navbar from "../components/Navbar/navbar";
import Card from "../components/Cards/card";
import GBanner from "../components/Banners/banner2";
import TitleCard from "../components/Cards/titlecard";

function Proposals() {
    return (
    <div class="container-fluid">
        <Navbar />
        <div class="container-fluid App-content">
            <div className="App">
                <GBanner name = "Proposals" btn1 = "Active" btn2 = "Inactive" btn3 = "My Proposals" btn4 = "New Proposal"/>
                <div class="row">
                    <div class="col-10">
                        <TitleCard title="Active Proposals"/>
                        <ul>
                            <li><Card title="Proposal 1 Title Here" desc="Proposal 1 Description"/></li>
                            <li><Card title="Proposal 2 Title Here" desc="Proposal 2 Description"/></li>
                            <li><Card title="Proposal 3 Title Here" desc="Proposal 3 Description"/></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Proposals;