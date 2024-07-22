export class Perfomance {
    investment: {
        _id: string;
        security: {
          _id: string;
          securityCode: string;
          minTransactionAmount: number;
          rating: number;
          annualYield: number;
          additionalInfo: string;
          
        };
        client: {
          _id: string;
          name: string;
          ownershipType: string;
          address: string;
          phone: string;
          
        };
        purchasePrice: number;
        purchaseDate: string;
        saleDate: string;
        salePrice: number;
        
      };
      profit: number;
      profitPercentage: number;
    
      constructor() {
        this.investment = {
          _id: "",
          security: {
            _id: "",
            securityCode: "",
            minTransactionAmount: 0,
            rating: 0,
            annualYield: 0,
            additionalInfo: "",
    
          },
          client: {
            _id: "",
            name: "",
            ownershipType: "",
            address: "",
            phone: "",
            
          },
          purchasePrice: 0,
          purchaseDate: "",
          saleDate: "",
          salePrice: 0,
          
        };
        this.profit = 0;
        this.profitPercentage = 0;
      }
}
