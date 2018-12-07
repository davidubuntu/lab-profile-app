import React, { Component } from 'react'
import AuthService from '../../auth/auth-service';

export default class Signup extends Component {
  constructor(props){
      super(props);
      this.state={
        username:'',password:'',campus: '',course: ''
      }
      this.service = new AuthService();
  }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const {username,password,campus,course} = this.state;
        this.service.signup(username,password,campus,course)
        .then( response => {
            console.log(response);
            this.setState({...this.state,username: "", password: "",campus: "",course:""});
            // this.props.getUser(response)
        })
        .catch( error => console.log(error) )
    }

  handleChange = (e)=>{
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  render() {
    return (
     <form onSubmit={this.handleFormSubmit}>
         <label>Username:</label>
         <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
         <label>Password:</label>
         <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
         <label>Campus:</label>
         <input type="text" name="campus" value={this.state.campus} onChange={this.handleChange}/>
         <label>Course:</label>
         <input type="text" name="course" value={this.state.course} onChange={this.handleChange}/>
     <input type="submit" value="Submit" />
     </form>
    )
  }
}
