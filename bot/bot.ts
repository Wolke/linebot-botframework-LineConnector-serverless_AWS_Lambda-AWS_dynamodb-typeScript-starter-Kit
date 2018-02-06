import * as builder from "botbuilder"
var linebot = require("botbuilder-linebot-connector");

export default (bot: builder.UniversalBot) => {
    bot.dialog("/", [
        function (s) {
            s.send("財神到！")
            console.log("who speak", s.message.from)
            s.send(new builder.Message(s)
                .addAttachment(
                new linebot.Sticker(s, 1, 4)
                ))
            s.send(`感謝 ${s.message.from.name} 加 本財神 好友!`)
            s.send(`立碼送您３個紅包抽！`)
            s.beginDialog("draw")
        },
        s=>{
            // s.beginDialog("draw")
            s.send("end")
        }
    ]);

    bot.dialog("draw", [
        s => {

            let m = new builder.Message(s).addAttachment(
                new builder.HeroCard(s)

                    .title("💰財神到＜百萬紅包大方抽＞💰")
                    .subtitle("💰免費抽紅包試手氣。獎品豐富，等您拿。")
                    .text("抽紅包💰好玩喔💰")
                    .images([builder.CardImage.create(s, 'https://imagelab.nownews.com/?w=1080&q=85&src=http://s.nownews.com/11/b9/11b93df1ec7012f4d772c8bb0ac74e10.png')])

                    .buttons([
                        builder.CardAction.imBack(s, "抽", "立碼抽紅包")
                    ])
            )
            builder.Prompts.choice(s, m, `抽`)
        },
        (s: builder.Session, r: builder.IPromptChoiceResult) => {
            // console.log(r.response);
            // s.send("抽")
            var m = new builder.Message(s);
            m.addAttachment(
                new builder.MediaCard(s).image(builder.CardImage.create(s, 'https://imagelab.nownews.com/?w=1080&q=85&src=http://s.nownews.com/5d/6b/5d6b74b674e643f522ed68ef83053a1f.JPG'))
            )
            s.send(m)
            s.endDialog("再接再勵！");

        }
    ])
}


