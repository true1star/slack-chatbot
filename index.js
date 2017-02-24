/**
 * Created by true1star on 2017. 2. 2..
 */
var stringSimilarity = require('string-similarity');
var RtmClient = require('@slack/client').RtmClient;

var MemoryDataStore = require('@slack/client').MemoryDataStore;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var search = require('./service/search');

var bot_token = process.env.SLACK_BOT_TOKEN || '';

var rtm = new RtmClient(bot_token, {
  // Sets the level of logging we require
  logLevel: 'error',
  // Initialise a data store for our client, this will load additional helper functions for the storing and retrieval of data
  dataStore: new MemoryDataStore()
});

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log('Logged in as ' + rtmStartData.self.name + ' of team ' + rtmStartData.team.name + ', but not yet connected to a channel');
});

rtm.start();

var channel = "@teststar"; //could also be a channel, group, DM, or user ID (C1234), or a username (@don)

// you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  // Get the user's name
  var user = rtm.dataStore.getUserById(rtm.activeUserId);

  // Get the team's name
  var team = rtm.dataStore.getTeamById(rtm.activeTeamId);

  // Log the slack team name and the bot's name
  console.log('Connected to ' + team.name + ' as ' + user.name, rtm.acti);

  rtm.sendMessage("I've been connected", 'C40A1CK3M');
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  var channel = "#general"; //could also be a channel, group, DM, or user ID (C1234), or a username (@don)

  var detecting = ['배고파', '배고픔', '뭐먹을까', '뭐먹지', '저녁', '점심', '맛집 추천', '식사', '식사 추천', ' 저녁 추천'];
  var matches = stringSimilarity.findBestMatch(message.text, detecting).bestMatch;
  if (matches.rating < 0.5) return;

  rtm.sendMessage("유사도 : " + matches.rating, message.channel);
  console.log(matches);
  rtm.sendMessage("검색어 : " +'선릉 ' + matches.target, message.channel);
  search(1, '선릉 ' + matches.target, [], function (result) {
    rtm.sendMessage(result[0].title +'\n'+ result[0].href, message.channel);
  });

});

