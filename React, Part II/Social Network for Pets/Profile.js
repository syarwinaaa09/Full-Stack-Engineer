import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: null }
  }
  loadUserData() {
    this.setState({ userData: null})
    this.fetchID = fetchUserData(this.props.username,
    (userData) => {
      this.setState({ userData });
    });
  }
  componentDidMount() {
    this.loadUserData();
  }
  render() {
    const isLoading = this.state.userData === null;
    let name;
    let bio;
    let className = 'Profile';
    let friends;
    if (isLoading) {
      name =  'Loading...'
      className += ' loading';
      bio = 'loading...'
      friends = [];
    } else {
      name = this.state.userData.name;
      bio = this.state.userData.bio
      friends = this.state.userData.friends
    }
  componentWillUnmount() {
    cancelFetch(this.fetchID);
  }
  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username) {
      this.loadUserData();
    }
  }
    return (
      <div className={className}>
        <div className="profile-picture">
          {!isLoading && (
            <img src={this.state.userData.profilePictureUrl} alt="" />
          )}
        </div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }
}