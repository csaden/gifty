import React from 'react';
import { connect } from 'react-redux';
import { fetchFriend, saveImageUrl } from '../Actions/friend'
import { saveGifts } from '../Actions/gifts'
import Slider from 'react-slick';
import FriendHeader from '../Components/friendHeader';
import Thumbnail from '../Components/thumbnail';
import RecommendationFilters from '../Components/recommendationFilters';
import BookList from '../Components/bookList';
import ConcertList from '../Components/concertList';
import PORT from '../../config/port.js';
import NavBar from '../Components/navbar';
import utils from '../Utils/utils'

var GiftRecommendations = React.createClass({

  render: function() {
    /*var concerts = this.filterGifts("concert");
    var books = this.filterGifts("book");*/

    var books = this.props.gifts.filter(function(gift){
      return gift.category === "book";
    });

    var concerts = this.props.gifts.filter(function(gift){
      return gift.category === "concert";
    });

    console.log("CONCERTS FOR DEBUGGING >>>>>>>>>>", concerts);

    return (
        <div className="recommendations">
          <NavBar />
          <FriendHeader friend={this.props.friend.friend} url={this.props.friend.image_url} />
          <BookList amazonBooks={books} />

        </div>
    );
  },

  filterGifts: function(category){
    var result = [];
    result = this.props.gifts.filter(function(gift) { return gift.category === category; });
    return result;
  },

  getInitialState: function() {
    return { friend: [], gifts: []}
  },

  componentDidMount: function() {
    var friendId = this.props.params.friendId;
    utils.fetchFriendById(friendId, function(friend){
      this.props.dispatch(fetchFriend(friend));

      utils.getUserData("books", friend, function(userData){
        utils.generateRandomKeyword(userData, function(keyWord){
            if(keyWord){

              utils.fetchGiftByKeyWord(keyWord, function(books){
                this.props.dispatch(saveGifts(books));
              }.bind(this));
            }else{
              this.props.dispatch(saveGifts(null));
            }
          }.bind(this));
      }.bind(this));


      var bandArr = [];
      utils.getUserData('music', friend, function(data){
        if(data){
          data.map(function(item) {
            bandArr.push(item.name);
          })
        }
      });
    //  console.log('>>>>>',bandArr)

      var userLocation;
      utils.getUserData('location', friend, function(location){
        userLocation = location;
      });

      var userBirthday;
      utils.getUserData('birthday', friend, function(birthday){
        userBirthday = birthday;
      });

      var range = 365;
      utils.getConcerts(userLocation,userBirthday,range,bandArr, function(concerts){
        this.props.dispatch(saveGifts(concerts));
      }.bind(this));
    }.bind(this));

    utils.fetchImageUrlById(friendId, function(imageURLByID){
      this.props.dispatch(saveImageUrl(imageURLByID));
    }.bind(this));

  },
  /* AMAZON BOOKS */
  generateRandomKeyword: function(userArray){
    var randomIndex = Math.floor(Math.random() * (userArray.length - 1) + 1);
    var keyWord = userArray[randomIndex].name;
    utils.fetchGiftByKeyWord(keyWord, function(books){
      this.props.dispatch(saveGifts(books));
    }.bind(this));
  }
});

var mapStateToProps = function(state) {
  return {
    friend : state.friend, // export the portion of the state from index.js Reducers
    gifts : state.gifts,
    image_url : state.image_url
  }
};

export default connect(mapStateToProps)(GiftRecommendations);
