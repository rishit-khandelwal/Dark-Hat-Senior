import search from "./music";
import * as Discord from "discord.js";
import { readFileSync } from "fs"
const client = new Discord.Client();

client.once(
	"ready", () => {
		console.log('Go!')
		client.user.setActivity("xhelp");
	}
)

let subs = [];
const SECOND = 1000
	, MINUTE = 60*SECOND
	, HOUR = 60*MINUTE
client.setInterval(
	async () => {
		const res = await search("whitehat jr exposed");
		subs.forEach(
			(sub) => {
				sub.send(`**${res.title}**\nLink: ${res.url}`)
			}
		);
	},
	HOUR/2
)

client.on(
	"message",
	(msg) => {
		if (msg.content == "xhelp") {
			msg.channel.send(
				"xhelp, sub-stat, dssr-sub, dssr-usub, expose"
			)
		}
		
		if (msg.content == "sub-stat")
		{
			msg.channel.send(
				subs.includes(msg.author) ? "**You are subscribed!**" : "**You aren't subscribed!**"
			)
		}

		if (msg.content == "dssr-sub") {
            if (subs.includes(msg.author))
				return msg.channel.send("**You are already subscribed**");
			else
				subs.push(msg.author)
				return msg.channel.send("**Subscribed**");
		}
		if (msg.content == "dssr-usub") {
			if (subs.includes(msg.author)) {
				msg.channel.send("Unsubscribed");subs = subs.filter(v => v!=msg.author);
			}
			else {
				msg.channel.send('**You need to subscribe first!**')
			}
		}
		if (msg.content != "expose") {return;}
		search("whitehat jr exposed")
			.then
			(
				(res) => {
				msg.channel.send(`**${res.title}**\nLink: ${res.url}`)
				}
			)
	}
)

client.login("Nzg1MzkzOTU2NDc2MTU3OTcy.X83NHw.ith84FOg9Mmp4bgTdLKV5WKnWTs")
