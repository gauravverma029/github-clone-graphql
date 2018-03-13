import React, { Component } from 'react';
import client from '../Config/Graphqlconfig';
import gql from 'graphql-tag';
import '../App.css';
import { Navbar,Nav ,NavDropdown,NavItem,MenuItem,FormGroup,FormControl} from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    const {match: {params} } = this.props;
    this.state = {
      profile:'',
      LoginUser:params.userName != undefined ? params.userName : 'gauravverma029'
    }
}


componentDidMount() {
  var that = this;
  var LoginUser = this.state.LoginUser;
  client.query({
  query: gql`
    query HeaderQuery {
      user(login:"${LoginUser}"){
    		name
        login
        iconImage:avatarUrl(size:20)
      }
    }
  `
 })
  .then(resp => that.setState({profile:resp.data.user}))
  .catch(error => console.error(error));

}

  render() {
    console.log(this.props);
    if(this.state.profile == ""){
      return 'Loader...';
    }
    return (
     <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home" className="header-logo-invertocat">
       <svg aria-hidden="true" className="octicon octicon-mark-github" height="32" version="1.1" viewBox="0 0 16 16" width="32"><path  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
	  </a>
    </Navbar.Brand>
  </Navbar.Header>
   <Navbar.Collapse>
    <Navbar.Form pullLeft>
      <FormGroup>
        <FormControl type="text" placeholder="Search Github" className="github-top-search"/>
      </FormGroup>
    </Navbar.Form>
    <Nav>
    <NavItem eventKey={1} href="https://github.com/pulls" target="_blank">
      Pull requests
    </NavItem>
    <NavItem eventKey={2} href="https://github.com/issues">
      Issues
    </NavItem>
    <NavItem eventKey={3} href="https://github.com/marketplace">
      Marketplace
    </NavItem>
    <NavItem eventKey={4} href="https://github.com/explore">
      Explore
    </NavItem>
  </Nav>
   <Nav pullRight>
      <NavItem eventKey={5} href="#">
        <svg aria-hidden="true" className="octicon octicon-bell" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path  d="M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z"></path></svg>
      </NavItem>

   	   <NavDropdown eventKey={6} title={
        <svg aria-hidden="true" className="octicon octicon-plus float-left mr-1 mt-1" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 9H7v5H5V9H0V7h5V2h2v5h5z"></path></svg>
		} id="basic-nav-dropdown">
        <MenuItem eventKey={6.1}>New repository</MenuItem>
        <MenuItem eventKey={6.1}>Import repository</MenuItem>
        <MenuItem eventKey={6.1}>New gist</MenuItem>
        <MenuItem eventKey={6.1}>New organization</MenuItem>
      </NavDropdown>

      <NavDropdown eventKey={7} title={
		<img alt="" className="avatar float-left mr-1" src={this.state.profile.iconImage} height="20" width="20" />

      } id="basic-nav-dropdown">
      	<MenuItem eventKey={7.1}>Signed in as {this.state.profile.login}</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={7.1}>Your profile</MenuItem>
        <MenuItem eventKey={7.1}>Your star</MenuItem>
        <MenuItem eventKey={7.1}>Your gists</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={7.1}>Help</MenuItem>
        <MenuItem eventKey={7.1}>Settings</MenuItem>
        <MenuItem eventKey={7.1}>Signout</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>

</Navbar>
    );
  }
}

export default App;


