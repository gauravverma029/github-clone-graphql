import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Grid,Row,Col,Image,ListGroup,Tabs,Tab,Panel,Glyphicon,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Login from '../Login/Login';
import client from '../Config/Graphqlconfig';
import '../App.css';


class App extends Component {

constructor(props) {
    super(props);
    console.log(this.props,client);
    const {match: {params} } = this.props;
    this.state = {
      LoginUser:params.userName != undefined ? params.userName : 'gauravverma029',
      profile:''
    }
}
componentDidMount(){

  var LoginUser = this.state.LoginUser;
  client.query({
    query: gql`
      query HeaderQuery {
        user(login:"${LoginUser}"){
          name
          login
          iconImage:avatarUrl(size:20)
          profileImage:avatarUrl(size:260)
          bio
          company
          email
          location
          repositories(first:50) {
            edges {
              node {
                id
                description
                name
                url
                primaryLanguage {
                    name
                }
                labels(first:1){
                edges {
                  node {
                    id
                    name
                    description
                  }
                }
              }
              languages(first:1) {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
                stargazers(first:1){
                   edges {
                    node {
                      id
                      name
                    }
                  }
                }
                languages(first:1) {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
                
              }
            }
          }
        }
      }
    `
   })
    .then(resp => this.setState({profile:resp.data.user}))
    .catch(error => console.error(error));
}

repositories(edges){
 var LoginUser = this.state.LoginUser;
 return edges.map(function(item,index){
  return(
           <Col md={6} key={index}>
            <Panel style={{height: '158px'}}>
              <Panel.Body>
                <Link to={LoginUser+'/'+item.node.name}><h3>{item.node.name}</h3></Link>
                <h5>{item.node.description}</h5>
                <p>{item.node.primaryLanguage != null ? item.node.primaryLanguage.name : ''}  <Button bsSize="xsmall">
                  <Glyphicon glyph="star" />  1 </Button></p>
              </Panel.Body>
            </Panel>
           </Col>
        )
      } 
  )
}

repositoriesList(edges){
 return edges.map(function(item,index){
  return(
           <Col md={12} key={index}>
            <Panel style={{height: '158px'}}>
              <Panel.Body>
                <a href=""><h3>{item.node.name}</h3></a>
                <h5>{item.node.description}</h5>
                <p>{item.node.primaryLanguage != null ? item.node.primaryLanguage.name : ''}  <Button bsSize="xsmall">
                  <Glyphicon glyph="star" />  1 </Button></p>
              </Panel.Body>
            </Panel>
           </Col>
        )
      } 
  )
}


  render() {
    var Profile = this.state.profile;
    if(Profile == ""){
      return <div>Loading....</div>
    }

    var Repositories = this.state.profile.repositories.edges;
    var TotalRep = 'Repositories (' + Object.keys(Repositories).length + ')';
    return (
      <Grid>
  <Row className="show-grid">
    <Col xs={6} md={4}>
       <Image src={Profile.profileImage} rounded style={{width:'260px'}}/>
        <h3>{Profile.name}</h3>
        <h4>{Profile.login}</h4>
        <h5>{Profile.bio}</h5>
        <hr/>
        <ListGroup componentClass="ul">
           <li className="list-style"><svg aria-hidden="true" class="octicon octicon-organization" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M16 12.999c0 .439-.45 1-1 1H7.995c-.539 0-.994-.447-.995-.999H1c-.54 0-1-.561-1-1 0-2.634 3-4 3-4s.229-.409 0-1c-.841-.621-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.442.58 2.5 3c.058 2.41-.159 2.379-1 3-.229.59 0 1 0 1s1.549.711 2.42 2.088C9.196 9.369 10 8.999 10 8.999s.229-.409 0-1c-.841-.62-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.437.581 2.495 3c.059 2.41-.158 2.38-1 3-.229.59 0 1 0 1s3.005 1.366 3.005 4"></path></svg> 
            <span class="custome-details">{Profile.company}</span></li>
           <li className="list-style"><svg aria-hidden="true" class="octicon octicon-location" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
           <span class="custome-details">{Profile.location}</span></li>
           <li className="list-style"><svg aria-hidden="true" class="octicon octicon-mail" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M0 4v8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H1c-.55 0-1 .45-1 1zm13 0L7 9 1 4h12zM1 5.5l4 3-4 3v-6zM2 12l3.5-3L7 10.5 8.5 9l3.5 3H2zm11-.5l-4-3 4-3v6z"></path></svg>
           <span class="custome-details">{Profile.email}</span></li>
       </ListGroup>
    </Col>
    <Col xs={12} md={8}>
    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Overview">
         <h4 style={{padding:'10px'}}> Popular repositories </h4>
         {this.repositories(Repositories)}

      </Tab>
      <Tab eventKey={2} title={TotalRep}>
         <h4 style={{padding:'10px'}}> Repositories </h4>
          {this.repositoriesList(Repositories)}
      </Tab>
      <Tab eventKey={3} title="Stars">
      </Tab>
      <Tab eventKey={4} title="Followers">
      </Tab>
      <Tab eventKey={5} title="Following">
      </Tab>
    </Tabs>
    </Col>
  </Row>

      </Grid>
    );
  }
}

export default App;


