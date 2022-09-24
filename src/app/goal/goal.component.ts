import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goal } from '../goal';

import { Quote } from '../quote-class/quote';

import { GoalService } from '../goal-service/goal.service';
import { AlertService } from '../alert-service/alert.service';
import { QuoteRequestService } from '../quote-http/quote-request.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
 
  alertService:AlertService; 
  quote:Quote;

  public isLoading: boolean = false;

  goals: any;  addNewGoal(goal: { id: any; completeDate: string | number | Date; }){
  let goalLength = this.goals.length;
  goal.id = goalLength+1;
  goal.completeDate = new Date(goal.completeDate)
  this.goals.push(goal)
}  

  
  toggleDetails(index:any ){
    this.goals[index].showDescription = !this.goals[index].showDescription;
  } 

  deleteGoal(isComplete: any, index: number){
    if (isComplete) {
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)
      
      if (toDelete){
        this.goals.splice(index,1)
        this.alertService.alertMe("The goal has been deleted")
      }
    }
  }
  
  constructor(goalService:GoalService, alertService:AlertService,  private http:HttpClient, private quoteService:QuoteRequestService) {
    this.goals = goalService.getGoals()
    this.alertService = alertService;
  }

  ngOnInit() {

    interface ApiResponse{
      author:string;
      quote:string;
    }

    this.isLoading = true;

    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote

    this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data=>{
      // Succesful API request
      this.quote = new Quote(data.author, data.quote)
      this.isLoading = false;
    },err=>{
      this.isLoading = false; 
      this.quote = new Quote("Winston Churchill","Never never give up!")
      console.log("An error occurred")
    })
  }

}
