"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder");
var linebot = require("botbuilder-linebot-connector");
exports.default = (bot) => {
    bot.dialog("/", [
        s => {
            s.send("hello");
            s.send(new builder.Message(s).addAttachment(new linebot.Sticker(s, 1, 2)));
            s.beginDialog("ask_weather");
        },
        s => {
            s.beginDialog("ask_pet");
        }, s => {
            s.endDialog();
        }
    ]);
    bot.dialog("ask_weather", [
        s => {
            s.send("what`s the weather? now");
            let getOption = (pic_url, title) => new builder.HeroCard(s)
                .title("what`s the weather? now")
                .subtitle("sunny rainy cloudy ...")
                .text("how`s the weather? sunny wendy cloudy ...")
                .images([builder.CardImage.create(s, pic_url)])
                .buttons([
                builder.CardAction.imBack(s, title, title)
            ]);
            var msg = new builder.Message(s);
            msg.attachmentLayout(builder.AttachmentLayout.carousel);
            msg.attachments([
                getOption("https://feelgoodinyourspace.files.wordpress.com/2012/06/020.jpg", "sunny"),
                getOption("https://i2-prod.manchestereveningnews.co.uk/incoming/article9988099.ece/ALTERNATES/s810/Sunrise040915.jpg", "cloudy"),
                getOption("https://4.bp.blogspot.com/-lb-NEOZnvT0/Wqk31cDIJtI/AAAAAAAAoGs/oLlL_4rDy1UosXRvyKkgK6DcyCDTB89qACLcBGAs/s1600/rainy-weather-1.jpg", "rainy")
            ]);
            // builder.Prompts.text(s, msg)
            builder.Prompts.choice(s, msg, `sunny|rainy|cloudy`);
        },
        (s, r) => {
            // console.log(r.response);
            s.endDialog(`it is ${r.response.entity}`);
        }
    ]);
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
            ]));
            builder.Prompts.choice(s, m, "dog|cat|other|no");
        },
        (s, r) => __awaiter(this, void 0, void 0, function* () {
            // console.log(r.response);
            let u = yield linebot.getUserProfile(s.message.from.id);
            console.log("u" + u);
            s.endDialog(`${s.message.from.name} like ${r.response.entity}`);
        })
    ]);
};
