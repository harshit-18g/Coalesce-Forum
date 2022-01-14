// eslint-disable-next-line
/* eslint-disable */ 
import React, { Component } from 'react';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Detail from './DetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import { addComment, fetchItems } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    items: state.items,
    comments: state.comments,
    promotions: state.promotions,
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchItems: () => { dispatch(fetchItems())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});

class Main extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchItems();
  }
  
  render() {
        
    const DishWithId = ({match}) => {
      return(
          <Detail dish={this.props.items.items.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.items.isLoading}
            errMess={this.props.items.errMess}
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment}
          />
      );
    };

    const AboutUs = () => {
      return(
        <About />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
            <Route path="/home" component={() => <Menu items={this.props.items} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
