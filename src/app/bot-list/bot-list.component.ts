import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Bot } from '../model/Bot';
import { BotService } from '../service/bot.service';

@Component({
  selector: 'app-bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.css'],
  providers: [ BotService ]
})
export class BotListComponent implements OnInit {

  bots: Bot[] = [];

  selectedBot!: Bot;

  botId = new FormControl('');
  botDescription = new FormControl('');

  constructor(private service: BotService) { 
    this.service.getBots().subscribe(
      bots => (this.bots.push(...bots)),
      err => console.error(err),
      () => console.log("get all bots service completed")
    );
  }

  ngOnInit(): void {
  }

  onSelect(bot: Bot): void{

  }

  createBot(): void{
    this.service.createBot(this.botId.value, this.botDescription.value).subscribe(
      bot => this.bots.push(bot),
      err => console.error(err),
      () => console.log("get all bots service completed")
    );
  }

}
