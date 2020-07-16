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

componentDidMount() {
  const httpLink = createHttpLink({ uri: 'http://hasura:8080/v1/graphql' });
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
      'x-hasura-admin-secret': `myadminsecretkey`,
        /* Authorization: "Bearer " + yourToken, // <--- SET THE TOKEN */
      },
    });
    return forward(operation);
  });

  // use with apollo-client
  const link = middlewareLink.concat(httpLink);

  buildHasuraProvider({
    clientOptions: { link: link },
  }).then((dataProvider) =>
    this.setState({
      dataProvider: enhanceDataProvider(dataProvider),
    })
  );
/* end test  */



export default App;