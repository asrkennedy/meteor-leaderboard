PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
    // this code only runs on the client
    Template.leaderboard.helpers({
      'player': function(){
        return PlayersList.find() 
      },
      'otherHelperFunction': function(){
        return "Some other function"
    }
  })
}

if(Meteor.isServer){
    // this code only runs on the server
    console.log('hello server')
}