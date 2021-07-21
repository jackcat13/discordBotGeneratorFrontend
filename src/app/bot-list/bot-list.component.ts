import { Component, OnInit } from '@angular/core';
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

}
