import React from 'react';


class Sidebar extends React.Component {

    render() {

        return (
            <div className="full-height sidebar center">
                                <div className="sidebar-link">
                                    <a style={{width: "120px"}} href="/retirementDashboard"><h5>Home</h5></a>
                                </div>
                                <br></br>
                                <div className="sidebar-link">
                                    <a style={{width: "120px"}} href="/equityListing"><h5>Stock Listings</h5></a>
                                </div>
                                <hr></hr>
                                <div className="sidebar-title">
                                    <h5>Learning Hub</h5>
                                </div>
                                <br></br>
                                <div className="sidebar-link">
                                    <a style={{width: "120px"}} href="/portfolioInfo"><h5>Portfolio Allocation</h5></a>
                                </div>
                                <br></br>
                                <div className="sidebar-link">
                                    <a style={{width: "120px"}} href="/equitiesInfo"><h5>Equities</h5></a>
                                </div>
                                <br></br>
                                <div className="sidebar-link">
                                    <a style={{width: "120px"}} href="/bondsInfo"><h5>Bonds</h5></a>
                                </div>

                                <hr></hr>
                                {/* <div className="sidebar-title">
                                    <h5>Plan Your Investments</h5>
                                </div>
                            
                                <div className="sidebar-link">
                                    <a style={{width: "120px"}} href="/riskAssessment"><h5>Take the Quiz</h5></a>
                                </div> */}

                                
                            </div>
                   
        );
    }
}

export default Sidebar;