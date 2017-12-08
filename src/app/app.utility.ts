import {Injectable} from "@angular/core";

@Injectable()

export class Utility {


  emailValidate(str) {
    /*for validating email*/
    const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (str.match(regex)) {
      return true;
    }
    return false;
  }

  validatePassword(str: string): boolean {
    /*for validating text*/
    if (str) {
      if (!str.trim() || str.trim() === '') {
        return false;
      }
      return true;
    }
    return false;
  }


}
