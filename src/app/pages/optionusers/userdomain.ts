export class UserDomain
{
          Id :number;
          UserId :string;
          DomainId :string;
          Notes :string;
          constructor()
          {
              this.Id = 0;
              this.UserId = '';
              this.DomainId = '';
              this.Notes = '';
          }
}