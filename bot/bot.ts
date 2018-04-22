import * as builder from "botbuilder"
var linebot = require("botbuilder-linebot-connector");

export default (bot: builder.UniversalBot) => {
    bot.dialog("/", [
        s => {
            s.send("hello")
            s.send(new builder.Message(s).addAttachment(new linebot.Sticker(s, 1, 2)))
            s.beginDialog("ask_weather")
        },
        s => {
            s.beginDialog("ask_pet")
        }, s => {
            s.endDialog()
        }

    ]);
    bot.dialog("ask_weather", [
        s => {
            s.send("what`s the weather? now")

            let getOption = (pic_url: string, title: string) => new builder.HeroCard(s)
                .title("what`s the weather? now")
                .subtitle("sunny rainy cloudy ...")
                .text("how`s the weather? sunny wendy cloudy ...")
                .images([builder.CardImage.create(s, pic_url)])
                .buttons([
                    builder.CardAction.imBack(s, title, title)
                ])
            var msg = new builder.Message(s);
            msg.attachmentLayout(builder.AttachmentLayout.carousel)
            msg.attachments([
                getOption("https://feelgoodinyourspace.files.wordpress.com/2012/06/020.jpg", "sunny"),
                getOption("https://i2-prod.manchestereveningnews.co.uk/incoming/article9988099.ece/ALTERNATES/s810/Sunrise040915.jpg", "cloudy"),
                getOption("https://4.bp.blogspot.com/-lb-NEOZnvT0/Wqk31cDIJtI/AAAAAAAAoGs/oLlL_4rDy1UosXRvyKkgK6DcyCDTB89qACLcBGAs/s1600/rainy-weather-1.jpg", "rainy")
            ]);

            // builder.Prompts.text(s, msg)
            builder.Prompts.choice(s, msg, `sunny|rainy|cloudy`)
        },
        (s: builder.Session, r: builder.IPromptChoiceResult) => {
            // console.log(r.response);
            s.endDialog(`it is ${r.response.entity}`);
        }
    ])

    bot.dialog("ask_pet", [
        s => {
            let m = new builder.Message(s).addAttachment(new builder.HeroCard(s)
                .title("do you like pet?")
                .subtitle("dog ,cat, other, no ...")
                .text("do you like this song? ok ,like, unlike...")
                .buttons([
                    builder.CardAction.imBack(s, "dog", "I like dog"),
                    builder.CardAction.imBack(s, "cat", "I like cat"),
                    builder.CardAction.imBack(s, "other", "I like other"),
                    builder.CardAction.imBack(s, "no", "I like no pet")
                ])
            )
            builder.Prompts.choice(s, m, "dog|cat|other|no")
        },
        (s: builder.Session, r: builder.IPromptChoiceResult) => {
            // console.log(r.response);
            s.endDialog(`you like ${r.response.entity}`);

        }
    ])
}


