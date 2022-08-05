export class Goal {
    showDescription: boolean = false;
    constructor(public id: number, public name: string, public description: string) {
        this.showDescription = false;
    }
    
}
