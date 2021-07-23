import { Channels } from "./Channels";
import { Commands } from "./Commands";
import { Messages } from "./Messages";
import { Roles } from "./Roles";

export interface Configuration{
    commands: Commands;
    channels: Channels;
    messages: Messages;
    roles: Roles;
    token: String;
}