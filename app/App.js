/**
 * @file App.js
 * @author Sam George
 * @since 1.0.0
 */
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      existingUser: false,
      users: []
    };

    this.txtFirstName = React.createRef();
    this.txtLastName = React.createRef();
    this.txtRole = React.createRef();
    this.hdfUserId = React.createRef();
  }

  /**
   * Add new user
   */
  addUser = () => {
    const {
      users
    } = this.state;
    
    // Set the userId which is unique for each user
    const userId = users.length > 0 ? users[users.length-1].userId+1 : 1;

    // Get the values of firstName, lastName and role 
    // from the respective input text fields
    const firstName = this.txtFirstName.current.value;
    const lastName = this.txtLastName.current.value;
    const role = this.txtRole.current.value;

    // Obtain the fullName from the firstName and lastName
    const fullName = `${lastName}, ${firstName}`;

    if(firstName !== '' && lastName !== '' && role !== '') {
      // Adding the new userdetails in a user object
      const user = {
        userId,
        fullName,
        role
      };

      users.push(user);

      this.setState({
        users,
        existingUser: false
      });

      // Reset the input fields
      // after successfully adding the user details
      this.resetInputFields();
    }  
  }

  /**
   * Edit user details
   * 
   * @param {*} user
   */
  editUser = (user) => {
    const userId = user.userId;
    const fullName = user.fullName.split(',');
    const firstName = fullName[1].trim();
    const lastName = fullName[0];
    const role = user.role;
    
    // Setting the user details in the input fields 
    this.txtFirstName.current.value = firstName;
    this.txtLastName.current.value = lastName;
    this.txtRole.current.value = role;
    this.hdfUserId.current.value = userId;
    
    this.setState({
      existingUser: true
    });
  }

  /**
   * List all users
   * 
   * @param {*} users
   */
  listUsers = (users) => {
    // Checking whether the users array is not empty
    if(users.length !== 0){
      return(
        users.map((user, i) => {
          return(
            <li key={user.userId}>
              <span onClick={(()=>this.editUser(user))} >
                {user.fullName} - {user.role}
              </span>
              <b>
                <span onClick={(() => this.deleteUser(user))}> - delete</span>
              </b>
            </li>
          );
        })
      );
    }
  }

  /**
   * Update the details of existing user
   */
  updateUser = () => {
    const {
      users
    } = this.state;
    const userId = this.hdfUserId.current.value;
    const firstName = this.txtFirstName.current.value;
    const lastName = this.txtLastName.current.value;
    const role = this.txtRole.current.value;
    
    const updatedUsers = users.filter((user) => {
      if(user.userId == userId) {
        user.fullName = `${lastName}, ${firstName}`,
        user.role = role;
      }
      return user;
    });

    this.setState({
      users: updatedUsers
    });
  }

  /**
   * Delete user
   * 
   * @param {*} user
   */
  deleteUser = (user) => {
    const {
      users
    } = this.state;
    const userId = user.userId;

    const updateUsers = users.filter((user) => {
      if(user.userId != userId) {
        return user;
      }
    });

    this.setState({
      users: updateUsers,
      existingUser: false
    });

    this.resetInputFields();
  }

  /**
   * Cancel update
   */
  cancelUpdate = () => {
    this.setState({
      existingUser: false
    });
    
    this.resetInputFields();
  }

  /**
   * Get Add user or Update user button
   */
  getAddOrUpdateButton = (existingUser) => {
    if(existingUser) {
      return(
        <div>
          <button onClick={this.updateUser}>Update User</button>
          <button onClick={this.cancelUpdate}>Cancel</button>
        </div>
      );
    } else {
      return(
        <div>
          <button onClick={this.addUser}>Add User</button>    
        </div>
      );
    }
  }

  /**
   * Reset the details inside the input fields
   */
  resetInputFields = () => {
    this.txtFirstName.current.value = '',
    this.txtLastName.current.value = '',
    this.txtRole.current.value = '';
    this.hdfUserId.current.value = '';
  }

  render() {
    const {
      users,
      existingUser
    } = this.state;

    return(
      <div>
        <h4>CRUD operation</h4>
        <div>
          <label>First Name: </label>
          <input type='text' ref={this.txtFirstName} />
        </div>
        <div>
          <label>Last Name: </label>
          <input type='text' ref={this.txtLastName} />
        </div>
        <div>
          <label>Role: </label>
          <input type='text' ref={this.txtRole} />
        </div>
        <input type='hidden' ref={this.hdfUserId} />
        {this.getAddOrUpdateButton(existingUser)}
        <div>
          <ul>
            {this.listUsers(users)}
          </ul>
        </div>
    </div>
    );
  }
};

export default App;