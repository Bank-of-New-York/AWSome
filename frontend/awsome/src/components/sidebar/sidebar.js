import React from 'react';


class Sidebar extends React.Component {

    render() {

        return (
            <div className="full-height sidebar center">
                                <div class="sidebar-link">
                                    <a style={{width: "120px", padding:"10px 5px 5px"}} href="/retirementDashboard"><h5>Home</h5></a>
                                </div>
                                <hr></hr>
                                <div class="sidebar-title">
                                    <h5>Learning Hub</h5>
                                </div>
                                <div class="sidebar-link">
                                    <a style={{width: "120px", padding:"10px 5px 5px"}}><h5>Equities</h5></a>
                                </div>
                                <div class="sidebar-link">
                                    <a style={{width: "120px", padding:"10px 5px 5px"}}><h5>Bonds</h5></a>
                                </div>

                                <hr></hr>
                                <div class="sidebar-title">
                                    <h5>Plan Your Investments</h5>
                                </div>
                                <div class="sidebar-link">
                                    <a style={{width: "120px", padding:"10px 5px 5px"}} href="/screener"><h5>Find the Right Stock For You</h5></a>
                                </div>
                                <div class="sidebar-link">
                                    <a style={{width: "120px", padding:"10px 5px 5px"}} href="/riskAssessment"><h5>Take the Quiz</h5></a>
                                </div>

                                
                            </div>
                   
        );
    }
}

export default Sidebar;