'use strict';
// Import dependencies
const DynamoDB = require('aws-sdk/clients/dynamodb');
const { DynamoBotStorage } = require('botbuilder-storage');

// Instantiate the bot with a connector instance
// const bot = new UniversalBot(connector);

// Create a DynamoDB client and select the AWS 
// region that hosts your instance of DynamoDB.
const client = new DynamoDB({ region: "ap-northeast-1" });

// Define the adapter settings
const settings = {
  // Required
  tableName: process.env.DYNAMODB_TABLE,

  // Required
  primaryKey: "id",

  // Optional but strongly recommended!
  ttl: {
    userData: 3600 * 24 * 365, // a year,
    conversationData: 3600 * 24 * 7, // a week,
    privateConversationData: 3600 * 24 * 7
  }
};

// Instantiate the adapter with the client and settings.
const adapter = new DynamoBotStorage(client, settings)


var config = require("./conf");
console.log("config", config)

var bot_dailog = require("./bot/bot")
var botbuilder_linebot_connector_1 = require("botbuilder-linebot-connector");
// var botbuilder_mongodb_storage_1 = require("botbuilder-mongodb-storage");
var builder = require('botbuilder');
var connector = new botbuilder_linebot_connector_1.LineConnector({
  hasPushApi: true,
  // your line
  channelId: process.env.channelId || config.channelId,
  channelSecret: process.env.channelSecret || config.channelSecret,
  channelAccessToken: process.env.channelAccessToken || config.channelAccessToken
});

var bot = new builder.UniversalBot(connector).set('storage', adapter);

bot_dailog.default(bot)

module.exports.line = (event, context, callback) => {
  connector.serverlessWebhock(event)
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};