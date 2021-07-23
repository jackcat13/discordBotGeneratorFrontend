import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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

  botId = new FormControl('');
  botDescription = new FormControl('');
  isLoading = false;

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

  }

  createBot(): void {
    this.service.createBot(this.botId.value, this.botDescription.value).subscribe(
      bot => this.bots.push(bot),
      err => console.error(err),
      () => console.log("get all bots service completed")
    );
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
