import Navbar from "../components/Navbar/navbar";
import TitleCard from "../components/Cards/titlecard";
import Card from "../components/Cards/card";
import GBanner from "../components/Banners/banner2"

import "./styling/common.css"

function Grants() {
    return (
    <div class="container-fluid">
        <Navbar />
        <div class="container-fluid App-content">
            <div className="App">
                <GBanner name = "Grants" btn1 = "Current Round" btn2 = "Past Rounds" btn3 = "My Grants" btn4 = "Apply For Grant"/>
                <div class="row">
                    <div class="col-10">
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

export default Grants;