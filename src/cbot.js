const cleverbot = require("cleverbot.io");

const bot = new cleverbot(process.env.CLEVERBOT_API_USER, process.env.CLEVERBOT_API_KEY);

let cleverbot_sessions = {};

const startSession = () =>{
  return new Promise((resolve, reject)=>{
    bot.create(function (err, session) {
      if(err){
        reject(err);
      }
      resolve(session);
    });
  })
};


const setSession = async(user)=>{
  let session = cleverbot_sessions[user];

  if(!session){
    session = await startSession(user);
    cleverbot_sessions[user] = session;
  }else{
    bot.setNick(session);
  }
};


export const askCleverbot = async (question, user) => {
  await setSession(user);
  return new Promise((resolve, reject) => {
    bot.ask(question, function (err, response) {
      if(err){
        reject(err);
      }
      resolve(response)
    });
  })
};

