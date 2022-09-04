export class Goal {
    splice(index: number, arg1: number) {
      throw new Error('Method not implemented.');
    }
    showDescription: boolean = false;
    constructor(public id: number, public name: string, public description: string, public completeDate: Date) {
        this.showDescription = false;
    }
    
}
