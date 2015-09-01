var Friend = React.createClass({
  render: function() {
    return (
      <div className='friend-row'>
        <div className='friend-name'>{this.props.friend.name}</div>
        <div className='friend-birthday'>{this.props.friend.birthday}</div>
      </div>
    );
  }
});

var FriendList = React.createClass({
  render: function() {
    var friends = [];
    this.props.friends.forEach(function(friend) {
      friends.push(<Friend friend={friend} key={friend.id}/>);
    });
    return (
      <div className='friend-list'>{friends}</div>
    );
  }
});

var FacebookFriend = React.createClass({
  render: function() {
    return (
      <div className='friend-row'>
        <div className='friend-name'>{this.props.friend.name}</div>
      </div>
    );
  }
});

var SearchResults = React.createClass({
  render: function() {
    var facebookFriends = [];
    this.props.friends.forEach(function(friend) {
      facebookFriends.push(<FacebookFriend friend={friend} key={friend.id}/>);
    });
    return (
      <div className='search-results'>{facebookFriends}</div>
    )
  }
});

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
      this.setState({resultsVisible: true});
    } else {
      this.setState({resultsVisible: false});
    }
  },

  showSearchResults: function(e) {
    React.findDOMNode(this.refs.filterText).focus();
  },

  render: function() {
    var friends = this.props.fbFriends,
        filterText = this.state.filterText.trim().toLowerCase();

    if (filterText.length > 0) {
      friends = friends.filter(function(friend) {
        return friend.name.toLowerCase().match( filterText );
      });
    }
    return (
      <div className="filtered-friends">
        <input ref="filterText" type="text" placeholder="Search for your friends" value={this.state.filterText} onChange={this.filterFacebookFriends}/>
        { this.state.resultsVisible ? <SearchResults friends={friends}/> : null }
      </div>
    );
  }
});

var FriendManager = React.createClass({
  render: function() {
    return (
      <div className="friend-manager">
        <FilterableFriends fbFriends={this.props.facebookFriends}/>
        <FriendList friends={this.props.appFriends}/>
      </div>
    );
  }
});


var FACEBOOKFRIENDS = APP_FRIENDS = [
  {
    "name": "Jennie Kim Eldon",
    "id": "202385",
    "birthday": "01/02/1999"
  },
  {
    "name": "Debarshi Chaudhuri",
    "id": "713437",
    "birthday": "01/01/1999"
  },
  {
    "name": "Nicolas Artman",
    "id": "6421341",
    "birthday": "01/01/1999"
  },
  {
    "name": "Vitaliy Levit",
    "id": "10104361677485275",
    "birthday": "01/01/1999"
  },
  {
    "name": "Michael Wales",
    "id": "505644766",
    "birthday": "01/01/1999"
  },
  {
    "name": "Gundega Dekena",
    "id": "534614898",
    "birthday": "01/01/1999"
  },
  {
    "name": "Gabriel Sanchez",
    "id": "1149750337",
    "birthday": "01/01/1999"
  },
  {
    "name": "Lakshman Mody",
    "id": "1223850500",
    "birthday": "01/01/1999"
  }
];


// React.render(<FriendManager facebookFriends={FACEBOOKFRIENDS} appFriends={APP_FRIENDS}/>,  document.getElementById('friend-manager-container'));

