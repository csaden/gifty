import React from 'react';
import SearchResults from './searchResults';

var FilterableFriends = React.createClass({
  getInitialState: function () {
    return {
      filterText: '',
      resultsVisible: false
    };
  },

  filterFacebookFriends: function(e) {
    this.setState({filterText: e.target.value});
    if (this.state.filterText.length === 0) {
      this.setState({resultsVisible: false});
    } else {
      this.setState({resultsVisible: true});
    }
  },

  showSearchResults: function(e) {
    React.findDOMNode(this.refs.filterText).focus();
  },

  render: function() {
    var friends = this.props.appFriends === undefined ? this.props.fbFriends : this.props.appFriends,
        filterText = this.state.filterText.trim().toLowerCase();
    if (filterText.length > 0) {
      friends = friends.filter(function(friend) {
        return friend.name.toLowerCase().match( filterText );
      });
    }
    return (
      <div className="filter-friend-flex-container">
        <div className="filtered-friends" id= "filtered-friends">
          <input ref="filterText" type="text" placeholder=" Search for a friend" value={this.state.filterText} onChange={this.filterFacebookFriends}/>
          { this.state.resultsVisible ? <SearchResults friends={friends}/> : null }
        </div>
      </div>
    );
  }
});

export default FilterableFriends;
