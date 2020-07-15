// in App.js
import React, { Component } from 'react';
import buildHasuraProvider from 'ra-data-hasura-graphql';
import { Admin, Resource } from 'react-admin';
import { ItemList, ItemEdit, ItemCreate } from './items';
import ApolloClient from 'apollo-boost';



class App extends Component {
    constructor() {
        super();
        this.state = { dataProvider: null };
    }
    componentDidMount() {
        buildHasuraProvider({
            clientOptions: { uri: 'http://hasura:8080/v1/graphql' },
        }).then((dataProvider) => this.setState({ dataProvider }));
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
/* testing this code  */
const client = new ApolloClient({
    uri: 'http://hasura:8080/v1/graphql',
    headers: {
      'x-hasura-admin-secret': `myadminsecretkey`,
      // 'Authorization': `Bearer xxxx`,
    }
  });
  
  // When building your provider inside your component
  // set up the client like this
  buildHasuraProvider({
        clientOptions: { link: link },
      }).then((dataProvider) =>
        this.setState({
          dataProvider: enhanceDataProvider(dataProvider),
        })
      );
/* end test  */
export default App;