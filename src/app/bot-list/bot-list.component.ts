import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Bot } from '../model/Bot';
import { BotService } from '../service/bot.service';

@Component({
  selector: 'app-bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.css'],
  providers: [BotService]
})
export class BotListComponent implements OnInit {

  bots: Bot[] = [];

  selectedBot!: Bot;

  //token
  token = new FormControl('');
  //bot creation
  botId = new FormControl('');
  botDescription = new FormControl('');
  //commands
  sondage = new FormControl('');
  help = new FormControl('');
  mp = new FormControl('');
  mute = new FormControl('');
  unmute = new FormControl('');
  //channels
  messagesChannel = new FormControl('');
  welcomeChannel = new FormControl('');
  logsChannel = new FormControl('');
  //messages
  rulesMessages = new FormControl('');
  //roles
  activeRole = new FormControl('')
  muteRole = new FormControl('')
  adminRole = new FormControl('')

  isLoading = false;
  isConfiguring = false;
  isBotStarted: Boolean = false;

  constructor(private service: BotService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.service.getBots().subscribe(
      bots => (this.bots.push(...bots)),
      err => console.error(err),
      () => {
        console.log("get all bots service completed")
        this.isLoading = false;
      }
    );
  }

  onSelect(bot: Bot): void {
    this.selectedBot = Object.assign({}, bot);

    //token
    this.token.setValue(bot.configuration?.token);
    //comands
    this.sondage.setValue(bot.configuration?.commands.sondage);
    this.help.setValue(bot.configuration?.commands.help);
    this.mp.setValue(bot.configuration?.commands.mp);
    this.mute.setValue(bot.configuration?.commands.mute);
    this.unmute.setValue(bot.configuration?.commands.unMute);
    //channels
    this.messagesChannel.setValue(bot.configuration?.channels.messagesChannel);
    this.welcomeChannel.setValue(bot.configuration?.channels.welcomeChannel);
    this.logsChannel.setValue(bot.configuration?.channels.logsChannel);
    //messages
    this.rulesMessages.setValue(bot.configuration?.messages.rulesMessage);
    //channels
    this.activeRole.setValue(bot.configuration?.roles.activeRole);
    this.muteRole.setValue(bot.configuration?.roles.muteRole);
    this.adminRole.setValue(bot.configuration?.roles.adminRole);

    this.isConfiguring = true
    this.getBotServiceStatus(this.selectedBot.id)
  }

  createBot(): void {
    this.service.createBot(this.botId.value, this.botDescription.value).subscribe(
      bot => this.bots.push(bot),
      err => console.error(err),
      () => console.log("get all bots service completed")
    );
  }

  configureBot(): void {
    this.changeSelectedBotConfiguration();
    this.service.configureBot(this.selectedBot).subscribe(
      res => console.log("Bot updated"),
      err => console.error(err),
      () => console.log("Configure bot completed")
    );
  }

  private changeSelectedBotConfiguration(){
    //token
    this.selectedBot.configuration!.token = this.token.value;
    //commands
    this.selectedBot.configuration!.commands.help = this.help.value;
    this.selectedBot.configuration!.commands.mp = this.mp.value;
    this.selectedBot.configuration!.commands.mute = this.mute.value;
    this.selectedBot.configuration!.commands.unMute = this.unmute.value;
    this.selectedBot.configuration!.commands.sondage = this.sondage.value;
    //channels
    this.selectedBot.configuration!.channels.logsChannel = this.logsChannel.value;
    this.selectedBot.configuration!.channels.messagesChannel = this.messagesChannel.value;
    this.selectedBot.configuration!.channels.welcomeChannel = this.welcomeChannel.value;
    //messages
    this.selectedBot.configuration!.messages.rulesMessage = this.rulesMessages.value;
    //roles
    this.selectedBot.configuration!.roles.activeRole = this.activeRole.value;
    this.selectedBot.configuration!.roles.adminRole = this.adminRole.value;
    this.selectedBot.configuration!.roles.muteRole = this.muteRole.value;
  }

  startBot(): void{
    this.service.startBot(this.selectedBot.id).subscribe(
      res => {
        console.log("Bot started")
        this.getBotServiceStatus(this.selectedBot.id)
      },
      err => console.error(err),
      () => console.log("Starting bot completed")
    );
  }

  private getBotServiceStatus(id: String){
    this.service.getBotServiceStatus(id).subscribe(
      res => this.isBotStarted = res,
      err => console.error(err),
      () => console.log("Configure bot completed")
    )
  }
  
  downloadBotCode(){
    this.service.downloadBotCode(this.selectedBot.id)
  }

  deleteBot(bot: Bot): void {
    this.service.deleteBot(bot).subscribe(
      res => this.removeBotFromList(bot.id),
      err => console.error(err),
      () => console.log("delete bot service completed")
    );
  }

  private removeBotFromList(botId: string): void {
    const removeIndex = this.bots.findIndex(item => item.id === botId);
    this.bots.splice(removeIndex, 1);
  }
}
