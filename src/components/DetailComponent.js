/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Row, Col, } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import Carousel from 'react-elastic-carousel';

const required=(val) => val && val.length;
const maxLen = (len) => (val) => !(val) || (val.length <= len);
const minLen = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            isCommentFormOpen: false
        };

        this.toggleCommentForm = this.toggleCommentForm.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    toggleCommentForm(){
        this.setState({isCommentFormOpen: true});
    }

    handleCommentSubmit(values){
        this.toggleCommentForm();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleCommentForm}>
                    <span className="fa fa-comments fa-lg"></span> Add Comment
                </Button>

                <Modal isOpen={this.state.isCommentFormOpen} toggle={this.toggleCommentForm}>
                    <ModalHeader toggle={this.toggleCommentForm}>Add Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=> this.handleCommentSubmit(values)}>
                            {/*<Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" 
                                        className="form-control" 
                                        name="rating" 
                                        id='rating'
                                        validators={{required}}
                                    >
                                        <option>Please Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: "Required",
                                        }}
                                    />
                                </Col>
                            </Row>*/}
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" 
                                        className="form-control" 
                                        name="author" 
                                        id="author"
                                        placeholder="First Name"
                                        validators={{required,
                                            minLen: minLen(3),
                                            maxLen: maxLen(15)}}
                                    />
                                    <Errors className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: "Required",
                                            minLen: "Must be greater than 2 characters",
                                            maxLen: "Must be 15 characters or less"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" 
                                        className="form-control" 
                                        name="comment" 
                                        id='comment'
                                        rows="6"
                                        validators={{required}}
                                    />
                                    <Errors className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: "Required",
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

function RenderDish({dish}){
    if(dish!=null){
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
}

function RenderComments({comments, addComment, dishId}) {
    const review = comments.map((comment) => {
        return (
            <div key={comment.id} >
                <p>{comment.comment}</p>
                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: "numeric", month: "long", day: "2-digit"}).format(new Date(Date.parse(comment.date)))}</p>
            </div>
        );
    });

    return(
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {review}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    )
}

const Detail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish != null){
        return(
            <div class="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <Carousel className='mt-2'>
                        <img src='' alt='Img-1'/>
                        <img src='' alt='Img-2'/>
                        <img src='' alt='Img-3'/>
                    </Carousel>
                    {/*<RenderDish dish={props.dish} />*/}
                    <div className="m-1">
                        <h4>Manifesto</h4>
                        <ul className="list-unstyled">
                            <div>
                                <p>Declaration 1</p>
                                <p>Declaration 2</p>
                                <p>Declaration 3</p>
                                <p>Declaration 4</p>
                                <p>Declaration 5</p>
                            </div>
                        </ul>
                    </div>
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        )
    }
    else{
        return(<div></div>)
    }
}


export default Detail;