import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Grid,Row,Col,Image,ListGroup,Tabs,Tab,Panel,Glyphicon,Button,ButtonToolbar,ButtonGroup,Table} from 'react-bootstrap';
import Login from '../Login/Login';
import client from '../Config/Graphqlconfig';
import { Link } from 'react-router-dom'
import '../App.css';


class App extends Component {

constructor(props) {
    super(props);
    console.log(this.props,client);
    const {match: {params} } = this.props;
    this.state = {
      LoginUser:params.userName != undefined ? params.userName : 'gauravverma029',
      secondParam:params.reponame,
      repo:''
    }
}

componentDidMount() {
  var that = this;
  var LoginUser = this.state.LoginUser;
  console.log(LoginUser);
  client.query({
  query: gql`
    query dsf {
      user(login:"${LoginUser}"){
        name
        login
        iconImage:avatarUrl(size:20)
          repository(name:"${this.state.secondParam}") {
           object(expression: "master:") {
      
            ... on Tree{
            entries{
              name
              type
              mode
            }
          }
        }
      
          name
          description
          descriptionHTML
          resourcePath
          viewerHasStarred
          isFork
          
          
        }
      }
    }
  `
 })
  .then(resp => this.setState({repo:resp.data.user.repository}))
  .catch(error => console.error('????//////',error));

}

entries(data){
   return data.map(function(item,index){
     console.log(item);
     return(
       <tr key={index}>
          <td>{item.name}</td>
          <td>{item.type}</td>
          <td style={{textAlign: 'right'}}>{item.mode}</td>
       </tr>
    )
  })
}

render() {
    var repo = this.state.repo;
    console.log("Data Coming",repo);
    if(repo == ""){
      return <div>Loading....</div>
    }
     var repoentry = this.state.repo.object.entries;

    return (
      <Grid>
  <Row className="show-grid">
      <Col xs={12} md={12}>
          <Col xs={6} md={6}>
             <a href=""><h4>{this.state.LoginUser}/{this.state.secondParam}</h4></a>
          </Col>
          <Col xs={6} md={6}>
              <ButtonToolbar>
                <ButtonGroup>
                  <Button bsSize="small">
                    <Glyphicon glyph="star" /> Unwatch 0
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button bsSize="small">
                    <Glyphicon glyph="star" /> Star 0
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button bsSize="small">
                    <Glyphicon glyph="star" /> Fork 0
                  </Button>
                </ButtonGroup>
             </ButtonToolbar>
          </Col>
       </Col> 
    <Col xs={12} md={12}>
    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Code">
          <h5 style={{padding:"10px"}}>{repo.description}</h5>
          <Table responsive>
  <thead style={{border: '1px',background:'#edfaff'}}>
    <tr>
      <th>{this.state.LoginUser}</th>
      <th></th>
      <th style={{textAlign: 'right'}}>Latest commit e125226  on 6 Apr 2017</th>
    </tr>
  </thead>
  <tbody>
    {this.entries(repoentry)}
  </tbody>
</Table>
      </Tab>
      <Tab eventKey={2} title="Issue">
      
      </Tab>
      <Tab eventKey={3} title="Pull Request">
      </Tab>
      <Tab eventKey={4} title="Projects">
      </Tab>
      <Tab eventKey={6} title="Wiki">
      </Tab>
       <Tab eventKey={7} title="Insights">
      </Tab>
         <Tab eventKey={8} title="Settings">
      </Tab>
    </Tabs>
    </Col>
  </Row>

      </Grid>
    );
  }
}

export default App;


