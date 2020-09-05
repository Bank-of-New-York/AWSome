import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"
import "./retirementForm.css"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"


// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? '#FFA861' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#5CD4EF' : 'lightgrey',
    padding: grid,
    width: 150,
    height: "422px"

});

const getOriginalListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#5CD4EF' : 'lightgrey',
    padding: grid,
    width: 150,
    height: "400px",

});

export default class RetirementForm extends Component {

    state = {
        items: [{ id: "item-0", content: "Car" }, { id: "item-1", content: "Marraige" }, { id: "item-2", content: "Child" }],
        selected1: [],
        selected2: [],
        selected3: [],
        selected4: [],
        selected5: []
    };


    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected1',
        droppable3: 'selected2',
        droppable4: 'selected3',
        droppable5: 'selected4',
        droppable6: 'selected5',
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        var id2List = {
            droppable: 'items',
            droppable2: 'selected1',
            droppable3: 'selected2',
            droppable4: 'selected3',
            droppable5: 'selected4',
            droppable6: 'selected5',
        };

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected1: items };
            } else if (source.droppableId === "droppable3") {
                state = {selected2: items}
            } else if (source.droppableId === "droppable4") {
                state = {selected3: items}
            } else if (source.droppableId === "droppable5") {
                state = {selected4: items}
            } 

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );


            Object.keys(result).forEach(droppable => {

                if (droppable=== "droppable") {
                    this.setState({
                        items : result[droppable]
                    })
                } else if (droppable === 'droppable2') {
                    this.setState({
                        selected1 : result[droppable]
                    })
                } else if (droppable === "droppable3") {
                    console.log(result[droppable])
                    this.setState({
                        selected2 : result[droppable]
                    })
                } else if (droppable === "droppable4") {
                    this.setState({
                        selected3 : result[droppable]
                    })
                } else if (droppable === "droppable5") {
                    this.setState({
                        selected4 : result[droppable]
                    })
                } 
            });

            // this.setState({
            //     items: result.droppable,
            //     [id2List[result.droppableId]]: result.droppableId
            // });
        }
    };




    render() {

        return (
            <Container fluid>

                <Row>
                    <Col xl={10}>
                        <br></br>
                        <h1 className="retire-title">Planning Your Future</h1>
                    </Col>

                </Row>

                <br></br>
                <br></br>

                <Row>
                    <Col xl={10}>

                        <div>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="first_name">
                                            <Form.Label>When do you plan to retire? </Form.Label>
                                            <Form.Control type="number" placeholder="62"></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>

                                    </Col>
                                </Row>

                                <br></br>
                                <br></br>

                                <Row>
                                    <DragDropContext onDragEnd={this.onDragEnd}>
                                        <Col className="center">
                                            <h4>Drag and drop to plan</h4>
                                            <Droppable id="droppable" droppableId="droppable">
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        style={getOriginalListStyle(snapshot.isDraggingOver)}>
                                                        {this.state.items.map((item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}>
                                                                        {item.content}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                        <Col className="center">
                                            <h4>20-30 yrs old</h4>
                                            <Droppable droppableId="droppable2">
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        style={getListStyle(snapshot.isDraggingOver)}>
                                                        {this.state.selected1.map((item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}>
                                                                        {item.content}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                        <Col className="center">
                                            <h4>30-40 yrs old</h4>
                                            <Droppable droppableId="droppable3">
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        style={getListStyle(snapshot.isDraggingOver)}>
                                                        {this.state.selected2.map((item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}>
                                                                        {item.content}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                        <Col className="center">
                                            <h4>50-60 yrs old</h4>
                                            <Droppable droppableId="droppable4">
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        style={getListStyle(snapshot.isDraggingOver)}>
                                                        {this.state.selected3.map((item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}>
                                                                        {item.content}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                        <Col className="center">
                                            <h4>> 60 yrs old</h4>
                                            <Droppable droppableId="droppable5">
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        style={getListStyle(snapshot.isDraggingOver)}>
                                                        {this.state.selected4.map((item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}>
                                                                        {item.content}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </Col>
                                    </DragDropContext>
                                </Row>


                                <br></br><br></br>

                                <Link to="/equityResult">
                                    <Button id="submit" variant="primary" type="submit">Next</Button>
                                </Link>
                            </Form>
                        </div>

                    </Col>
                </Row>
                <br></br>
                <br></br>
                <br></br>
            </Container>
        )
    }
}