// require('dotenv').config();

import {askCleverbot} from './cbot';
import slack from 'slack';

const slackbot = slack.rtm.client();
const token = process.env.SLACK_TOKEN;
const botid = process.env.SLACK_BOTID;


// do something with the rtm.start payload
slackbot.started(function (payload) {
  console.log('payload from rtm.start', payload)
});

// respond to a user_typing message
// slackbot.user_typing(function (msg) {
//   console.log('several people are coding', msg)
// });

// { type: 'message',
//   channel: 'C3QU68Z4J',
//   user: 'U3RK2LZQF',
//   text: '<@U3R1CKNGM> tere', <- kriimsilm
//   ts: '1484261899.000049',
//   team: 'T3R116FS8' }

slackbot.message(function (msg) {
  console.log('MESSAGE', msg);
  if (msg.text.indexOf(botid) > -1) {
    const question = msg.text.replace(botid, '');
    console.log('QUESTION', question);

    askCleverbot(question, msg.user)
      .then((answer)=>{
      const params = {token: token, text: answer, channel: msg.channel};
      slack.chat.postMessage(params, function (err, res) {
        console.log('DATA', res)
      })
    })
      .catch((err)=>{
      console.error(err);
    })
  }
});


// start listening to the slack team associated to the token
slackbot.listen({token: token});

