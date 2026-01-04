export class Product {

    constructor(
        public id : string,
        public name: string,
        public sizes: Array<{ size: string, quantity: number }>,
        public price: number,
        public description: string,
        public image1: string,
        public image2: string,
        public category: string,
        public color :string,
        public origin :string
        
      ) {}
}
