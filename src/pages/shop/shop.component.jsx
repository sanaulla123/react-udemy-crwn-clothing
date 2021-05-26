import React from 'react';
import PreviewCollection from '../../components/preview-collection/preview-collection.component';
import SHOP_DATA from './shop.data';

class Shop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collections: SHOP_DATA
        }
    }

    render(){
        const {collections} = this.state;
        return (
            <div className="shop-page">
                {
                    collections.map(({id, ...otherProps}) => (
                        <PreviewCollection key={id} {...otherProps} />
                    ))
                } 
                
            </div>
        )
    }
}

export default Shop;