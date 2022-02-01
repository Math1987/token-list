import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolWalletsService } from 'angular-sol-wallets';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";

type User = {
  _id : string,
  address : string,
  pseudo? : string,
} | null ;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  datas : ReplaySubject<User> = new ReplaySubject();
  datasNow : User | null = null ;

  constructor(
    private walletsS : SolWalletsService,
    private http : HttpClient
  ) {

    this.datas.subscribe( d => {
      this.datasNow = d ;
      console.log('datas', d)
    });

    this.getUser();

  }

  getUser(){

    this.http.get(`${environment.apiURL}/user/get`).subscribe( userDatas => {
      this.datas.next(userDatas as User);
    }, err => {
      console.log('Error geting user.');
    });

  }
  getPseudo(){
    return this.datas.pipe(
      map( d => {

        if ( !d?.pseudo ){
            return d!.address.slice(0,7) ;
        }

        return d.pseudo ;
      })
    )
  }

  connect(){

    this.http.get(`${environment.apiURL}/messageSample`).subscribe( messageSampleR => {
      const a = async () => {
        try{
          const message = (messageSampleR as any).message ;
          const signature = await this.walletsS.signMessage(message) ;
          const address = this.walletsS.selected?.publicKey ;
          this.http.post(`${environment.apiURL}/user/connect`, { address, signedMessage : signature}).subscribe( response => {

            this.datas.next( (response as any).user as User );
            localStorage.setItem('token', (response as any).token );

          }, err => {
            console.log('error connect');
          });
        }catch(err) {
          console.log('error connect');
        }
      };
      a();
    }, err => {
      console.log('error message', err);
    });

  }
  isConnected(){
    if ( this.datasNow )
    return true ;
    return false ;
  }
  disconnect(){
    this.datas.next(null);
    localStorage.removeItem('token');
  }

  update( datas : any ){

    this.http.get(`${environment.apiURL}/messageSample?code=1`).subscribe( messageSampleR => {
      const a = async () => {
        try{
          const message = (messageSampleR as any).message ;
          const signature = await this.walletsS.signMessage(message) ;
          const address = this.walletsS.selected?.publicKey ;
          this.http.post(`${environment.apiURL}/user/update`, { address, signedMessage : signature, datas}).subscribe( response => {

            console.log(response);
            this.datas.next( (response as any) as User );

          }, err => {
            console.log('error connect', err);
          });
        }catch(err) {
          console.log('error connect');
        }
      };
      a();
    }, err => {
      console.log('error message', err);
    });

  }

  remove(){

    this.http.get(`${environment.apiURL}/messageSample?code=2`).subscribe( messageSampleR => {
      const a = async () => {
        try{
          const message = (messageSampleR as any).message ;
          const signature = await this.walletsS.signMessage(message) ;
          const address = this.walletsS.selected?.publicKey ;
          this.http.post(`${environment.apiURL}/user/remove`, { address, signedMessage : signature}).subscribe( response => {

            this.disconnect();

          }, err => {
            console.log('error connect');
          });
        }catch(err) {
          console.log('error connect');
        }
      };
      a();
    }, err => {
      console.log('error message', err);
    });

  }

}
