import { generate } from 'randomstring';
export class RandomGenerator{
    constructor(){}
    public async generateRandomData() {
        const now = new Date();
        const serialNumber = generate({
            length: 16,
            charset: ['alphanumeric', now.getTime()]
          });
    
        return serialNumber 
    }
}