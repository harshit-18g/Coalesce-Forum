import React from 'react';
import { Card, CardImg, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

function RenderMenuItem({item, onClick}){
    return(
        <Card>
            <Link style={{textDecoration: 'none', color: 'black'}} to={`/menu/${item.id}`}>
                <CardImg width="100%" src={item.image} alt={item.name} />
                <CardTitle><h3 className='m-3'>{item.name}</h3></CardTitle>
            </Link>
        </Card>
    );
}

const Menu = (props) => {
    const menu = props.items.items.map((item) => {
        return (
            <div key={item.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem item={item} />
            </div>
          );
    });

    if (props.items.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.items.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.items.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
}

export default Menu;
