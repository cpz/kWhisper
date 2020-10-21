#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import Bot = require('keybase-bot');
const index_js_1 = __importDefault(require("keybase-bot/lib/index.js"));
require("es6-promise/auto");
const tl = __importStar(require("azure-pipelines-task-lib/task"));
/// General Settings
let bot_username = tl.getInput('Bot Username', false); // Bot Username
let bot_paper_key = tl.getInput('Bot Paper Key', false); // Paper key to log in
let bot_type = tl.getBoolInput('Bot Team', false); // Is Team Channel?
/// General Settings
/// Channel Settings
// If bot should message to personal then we need to get this username
let bot_personal = tl.getInput('Username', false);
// if bot should message to team then we need team name\team channel to write
let bot_team_username = tl.getInput('Team Username', false); // Team name to join
let bot_team_channel = tl.getInput('Team Channel', false); // Team channel to write
/// Channel Type
/// Message Settings
let bot_taskstatus = tl.getBoolInput('Task Status', false); // Adds information about task status (e.g Failed, Succeeded).
let bot_project = tl.getBoolInput('Project', false); // Adds project URL (e.g https://yourteam.visualstudio.com/).
let bot_release = tl.getBoolInput('Release', false); // Adds release name to message.
let bot_reason = tl.getBoolInput('Reason', false); // Adds information about event that caused the build to run to message.
let bot_buildnum = tl.getBoolInput('Build Number', false); // Adds build number to message.
let bot_queuedby = tl.getBoolInput('Queued by', false); // Adds info about who queued the build to message.
let bot_message = tl.getInput('Message Text', false); // Adds custom message text to message.
let bot_react = tl.getBoolInput('Reacts to Message', false); // Reacts to message.
let bot_status_react = tl.getBoolInput('Status React', false); // Adds task status react to message.
let bot_custom_react = tl.getInput('Custom React', false); // Adds your own react to mesage (e.g. :thinking_face:)
/// Message Settings
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const bot = new index_js_1.default({ debugLogging: true });
        console.log(process.version);
        if (!bot_username) {
            console.info(`Bot Username is empty`);
            return;
        }
        if (!bot_paper_key) {
            console.info(`Bot Paper key is empty`);
            return;
        }
        if (!bot_personal) {
            bot_personal = 'qword';
        }
        const username = bot_username;
        console.log('Bot username: ', username);
        const paperkey = bot_paper_key;
        console.log('Bot paperkey: ', paperkey);
        const keybase_path = process.env.localappdata + '\\keybase\\keybase.exe';
        console.log('Keybase path: ', keybase_path);
        try {
            console.log('Trying to initialize bot');
            yield bot
                .init(username, bot_paper_key, {
                verbose: true,
                // botLite: true, 
                // useDetachedService: true, 
                autoLogSendOnCrash: true,
            })
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const info = bot.myInfo();
                console.log(`
         Key Whisper is initialized.\n
         It is logged in as '${info.username}'\n
         Device used '${info.devicename}'\n
         From directory '${info.homeDir}'\n`);
                let channel = '';
                const channel_personal = {
                    name: bot_personal + ',' + info.username,
                    public: false,
                    topicType: 'chat'
                };
                const channel_team = {
                    name: bot_team_username,
                    public: false,
                    topicType: 'chat',
                    membersType: 'team',
                    topicName: bot_team_channel,
                };
                if (!bot_type) {
                    if (!bot_personal) {
                        console.info(`Username is empty`);
                        //return
                    }
                    channel = channel_personal;
                }
                else {
                    if (!bot_team_username || !bot_team_channel) {
                        console.info(`Team Username or Channel is empty`);
                        //return
                    }
                    channel = channel_team;
                }
                let body_of_message = "";
                if (bot_taskstatus) {
                    switch (tl.getVariable("Agent.JobStatus")) {
                        case "Succeeded":
                            body_of_message += `:white_check_mark: Task succeeded\n`;
                            break;
                        case "Failed":
                            body_of_message += `:x: Task failed\n`;
                            break;
                        case "SucceededWithIssues":
                            body_of_message += `:warning: Task succeeded with issues\n`;
                            break;
                        case "Canceled":
                            body_of_message += `:warning: Task was canceled\n`;
                            break;
                        default:
                            body_of_message += `:grey_question: unknown status\n`;
                            break;
                    }
                }
                if (bot_buildnum) {
                    body_of_message += `Build: ${tl.getVariable("Build.BuildNumber")}\n`;
                }
                if (bot_release) {
                    body_of_message += `Release: ${tl.getVariable("Release.ReleaseName")}\n`;
                }
                if (bot_queuedby) {
                    body_of_message += `Build queued by:  ${tl.getVariable("Build.QueuedBy")}\n`;
                }
                if (bot_release) {
                    body_of_message += `Release queued by: ${tl.getVariable("Release.RequestedFor")}\n`;
                }
                if (bot_project) {
                    body_of_message += `Project URL: ${tl.getVariable("System.TeamFoundationCollectionUri")}${tl.getVariable("System.TeamProject")}\n`;
                }
                if (bot_reason) {
                    body_of_message += `Reason: ` + tl.getVariable("Build.Reason") + `\n`;
                }
                if (bot_message) {
                    body_of_message += bot_message;
                }
                if (!body_of_message) {
                    body_of_message += 'Bot message was empty, please configure bot settings properly!';
                }
                const message = {
                    body: body_of_message,
                };
                console.log(`Channel:`, channel);
                console.log(`Message: `, message);
                const res = yield bot.chat.send(channel, message)
                    .catch((error) => {
                    console.error(error);
                    tl.setResult(tl.TaskResult.Failed, error);
                    bot.deinit();
                });
                const message_id = res.id;
                console.log(`Message was sent, message id: `, message_id);
                if (bot_react) {
                    var react = '';
                    if (bot_status_react) {
                        switch (tl.getVariable("Agent.JobStatus")) {
                            case "Succeeded":
                                react += `:white_check_mark:`;
                                break;
                            case "Failed":
                                react += `:x:`;
                                break;
                            case "SucceededWithIssues":
                                react += `:warning:`;
                                break;
                            case "Canceled":
                                react += `:warning:`;
                                break;
                            default:
                                react += `:grey_question:`;
                                break;
                        }
                    }
                    else if (bot_custom_react) {
                        react += bot_custom_react;
                    }
                    if (react) {
                        yield bot.chat.react(channel_team, message_id, react)
                            .catch((error) => {
                            console.error(error);
                            tl.setResult(tl.TaskResult.Failed, error);
                            bot.deinit();
                        });
                    }
                }
            }))
                .catch((error) => {
                console.error(error);
                tl.setResult(tl.TaskResult.Failed, error);
                bot.deinit();
            });
        }
        catch (error) {
            console.error(error);
            tl.setResult(tl.TaskResult.Failed, error);
        }
        finally {
            console.log(`
           Keybase bot will be deinitialized.
    `);
            yield bot.deinit();
        }
    });
}
run();
