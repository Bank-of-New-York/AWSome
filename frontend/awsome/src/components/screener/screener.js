import React, { Component } from "react"

import { Container, Row, Col, Card, Button, Tabs, Tab, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NVD3Chart from 'react-nvd3';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import Sidebar from "../sidebar/sidebar";
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import "bootstrap/dist/css/bootstrap.min.css"
import "./screener.css"

export default class Screener extends Component {

    handleRowClick = () => {
        window.location.href = "/dashboard"
    }

    render() {


        return (

            <Container fluid>
                <Row>
                    <Col s={3}>
                        <Sidebar /></Col>
                    <Col s={9}>
                        <Container fluid>
                            <Row style={{ width: "100%" }}>
                                <Col>
                                    <br></br>
                                    <div>
                                        <h2>Suitable Stocks</h2>
                                    </div>
                                    <br></br>
                                    <Form>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group controlId="formBasicRangeCustom">
                                                    <Form.Label>Market Cap</Form.Label>
                                                    <Form.Control type="range" custom style={{ border: "transparent" }} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="formBasicRangeCustom">
                                                    <Form.Label>Market Cap</Form.Label>
                                                    <Form.Control type="range" custom style={{ border: "transparent" }} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>

                                    <Row >
                                        <Col>
                                            <br></br>
                                            <Card className='Recent-Users'>
                                                <Card.Header>
                                                </Card.Header>
                                                <Card.Body className='px-0 py-2' style={{ width: "60vw", maxHeight: "80vh", overflowY: "scroll" }}>
                                                    <Table responsive hover  >
                                                        <tbody style={{ width: "60vw" }}>
                                                            <thead class="center">
                                                                <th className="unread"></th>
                                                                <th>Name</th>
                                                                <th>Date</th>
                                                            </thead>
                                                            <tr className="unread" onClick={this.handleRowClick}>
                                                                <td><img className="rounded-circle" style={{ width: "70%" }} src={avatar1} alt="activity-user" /></td>
                                                                <td>
                                                                    <h6 className="mb-1">Isabella Christensen</h6>
                                                                    <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                                </td>
                                                                <td>
                                                                    <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />11 MAY 12:56</h6>
                                                                </td>
                                                            </tr>
                                                            <tr className="unread">
                                                                <td><img className="rounded-circle" style={{ width: "70%" }} src={avatar3} alt="activity-user" /></td>
                                                                <td>
                                                                    <h6 className="mb-1">Karla Sorensen</h6>
                                                                    <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                                </td>
                                                                <td>
                                                                    <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />9 MAY 17:38</h6>
                                                                </td>
                                                            </tr>
                                                            <tr className="unread">
                                                                <td><img className="rounded-circle" style={{ width: "70%" }} src={avatar1} alt="activity-user" /></td>
                                                                <td>
                                                                    <h6 className="mb-1">Ida Jorgensen</h6>
                                                                    <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                                </td>
                                                                <td>
                                                                    <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />19 MAY 12:56</h6>
                                                                </td>
                                                            </tr>

                                                            <tr className="unread">
                                                                <td><img className="rounded-circle" style={{ width: "70%" }} src={avatar1} alt="activity-user" /></td>
                                                                <td>
                                                                    <h6 className="mb-1">Ida Jorgensen</h6>
                                                                    <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                                </td>
                                                                <td>
                                                                    <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />19 MAY 12:56</h6>
                                                                </td>
                                                            </tr>

                                                            <tr className="unread">
                                                                <td><img className="rounded-circle" style={{ width: "70%" }} src={avatar1} alt="activity-user" /></td>
                                                                <td>
                                                                    <h6 className="mb-1">Ida Jorgensen</h6>
                                                                    <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                                                </td>
                                                                <td>
                                                                    <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />19 MAY 12:56</h6>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                    </Row>


                                </Col>
                            </Row>
                            <br></br>
                            <br></br>
                            <br></br>

                        </Container>

                    </Col>
                </Row>
            </Container>

        )
    }
}