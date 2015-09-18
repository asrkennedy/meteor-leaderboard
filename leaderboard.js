PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
    // this code only runs on the client
    Meteor.subscribe('thePlayers');

    // HELPERS
    Template.leaderboard.helpers({
      'player': function(){
        var currentUserId = Meteor.userId();
        return PlayersList.find({},{sort: {score: -1, name: 1}}) 
      },
      'selectedClass': function(){
        var playerId = this._id;
        var selectedPlayer = Session.get('selectedPlayer');
        if(playerId == selectedPlayer) {
          return "selected"
        }
      },
      'showSelectedPlayer': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        return PlayersList.findOne(selectedPlayer)
      }
    })

    // EVENTS
    Template.leaderboard.events({
      'click .player': function(){
        var playerId = this._id
        Session.set('selectedPlayer', playerId);
      },
      'click .increment': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('modifyPlayerScore', selectedPlayer, 5);
      },
      'click .decrement': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('modifyPlayerScore', selectedPlayer, -5);
      },
      'click .remove': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('removePlayerData', selectedPlayer);
      }
    })

    Template.addPlayerForm.events({
      'submit form': function(e){
        e.preventDefault();
        var currentUserId = Meteor.userId();
        var playerNameVar = event.target.playerName.value;
        Meteor.call('insertPlayerData', playerNameVar);
      }
    })

}

if(Meteor.isServer){
    // this code only runs on the server
  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId})
  });

    // METHODS
  Meteor.methods({
    'insertPlayerData': function(playerNameVar){
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      });
    },
    'removePlayerData':function(playerNameVar){
      var currentUserId = Meteor.userId();
      PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId});
    },
    'modifyPlayerScore': function(selectedPlayer, scoreValue){
      PlayersList.update({_id: selectedPlayer, createdBy: currentUserId}, {$inc: {score: scoreValue}});
    }
  })
}