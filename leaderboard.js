PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
    // this code only runs on the client

    // HELPERS
    Template.leaderboard.helpers({
      'player': function(){
        return PlayersList.find() 
      },
      'otherHelperFunction': function(){
        return "Some other function"
      }
    })

    // EVENTS
    Template.leaderboard.events({
      'click': function(){
        console.log('You clicked something!')
      }
    })
}

if(Meteor.isServer){
    // this code only runs on the server
    console.log('hello server')
}