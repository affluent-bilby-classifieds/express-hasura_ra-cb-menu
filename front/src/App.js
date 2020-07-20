// in App.js
import React, { Component } from 'react';
import buildHasuraProvider from 'ra-data-hasura-graphql';
import { Admin, Resource } from 'react-admin';
import { ItemList, ItemEdit, ItemCreate } from './items';



class App extends Component {
    constructor() {
        super();
        this.state = { dataProvider: null };
    }
    
    
    componentDidMount() {
      buildHasuraProvider({ clientOptions: {
         uri: 'http://hasura:8080/v1/graphql',
         headers: {'x-hasura-admin-secret': `myadminsecretkey`},  
        } })
        .then(dataProvider => this.setState({ dataProvider }));
    }
    
    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return <div>Loading</div>;
        }

        return (
            <Admin dataProvider={dataProvider}>
                <Resource name="items" list={ItemList} edit={ItemEdit} create={ItemCreate} />
            </Admin>
        );
    }
}




export default App;