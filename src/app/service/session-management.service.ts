import { Injectable }              from '@angular/core';

@Injectable()
export class SessionManagementService {

  private sozlukTokenKey: string  = "sozlukToken";
  
  constructor () {
    console.log('EksiciService constructor');
  }
  addSozlukToken(pToken: string){
    console.log("SessionManagementService:addSozlukToken:" + pToken );
    localStorage.setItem(this.sozlukTokenKey, pToken);
  }

  getSozlukToken(): String{
    let token = localStorage.getItem(this.sozlukTokenKey);
    console.log("SessionManagementService:getSozlukToken:" + token );
    return token;
  }

  removeSozlukToken(){
    console.log("SessionManagementService:removeSozlukToken:" );
    localStorage.removeItem(this.sozlukTokenKey);
  }

}