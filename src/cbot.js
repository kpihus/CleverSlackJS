const cleverbot = require("cleverbot.io");

const bot = new cleverbot(process.env.CLEVERBOT_API_USER, process.env.CLEVERBOT_API_KEY);

let nickname = "Clever";

export const askCleverbot = async(question) => {

  return new Promise((resolve) => {
      bot.setNick(nickname);
    bot.create(function (err) {
      if(err){
        resolve('Sorry, something bad happened');
      }
      bot.ask(question, function (err, response) {
        if (err) {
          resolve('Sorry, something really bad happened');
        }
        resolve(response)
      });
    });
  })
};

