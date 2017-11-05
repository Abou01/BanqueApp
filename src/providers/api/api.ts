import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
    private apiUrl:string = "http://127.0.0.1:3000/";
    public token: any;

    constructor(private http: Http, public storage: Storage) {
        console.log('Hello ApiProvider Provider');
    }

    public getVirements(){
        // return this.http.get(this.apiUrl+"/virements")
        //     .map(res => res.json()).subscribe();
        
        return new Promise((resolve, reject) => {
            
            let headers = new Headers();
            headers.append('authorization', this.token);
    
            this.http.get(this.apiUrl+"virements", {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
        });
    }

    public addVirements(virement){
        return new Promise((resolve, reject) => {
            
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('authorization', this.token);

            this.http.post(this.apiUrl+"virement", JSON.stringify(virement), {headers: headers})
                .subscribe(res => {

                let data = res.json();
                resolve(data.success);

                }, (err) => {
                    reject(err);
                }
            );

        });
    }




    checkAuthentication(){
        
        return new Promise((resolve, reject) => {
    
            //Load token if exists
            this.storage.get('token').then((value) => {
    
                this.token = value;
    
                let headers = new Headers();
                headers.append('authorization', this.token);
    
                this.http.get(this.apiUrl+"dashboard", {headers: headers})
                    .subscribe(res => {
                        resolve(res);
                    }, (err) => {
                        reject(err);
                    }
                );
    
            });        
        
        });
        
    }
        
    createAccount(details){

        return new Promise((resolve, reject) => {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.apiUrl+"register", JSON.stringify(details), {headers: headers})
                .subscribe(res => {

                let data = res.json();
                this.token = data.token;
                this.storage.set('token', data.token);
                resolve(data);

                }, (err) => {
                reject(err);
                }
            );

        });

    }
        
    login(credentials){

        return new Promise((resolve, reject) => {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.apiUrl+"login", JSON.stringify(credentials), {headers: headers})
                .subscribe(res => {
                    let data = res.json();
                    if(data.success == true ){
                        this.token = data.token;
                        console.log(this.token);
                        this.storage.set('token', data.token);
                        resolve(data);
                        resolve(res.json());
                    }else{
                        reject();
                    }

                }, (err) => {
                reject(err);
                }
            );

        });

    }
        
    logout(){

        return new Promise((resolve, reject) => {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.get(this.apiUrl+"logout", {headers: headers})
                .subscribe(res => {
                    this.storage.set('token', '');
                    resolve(res);
                }, (err) => {
                    reject(err);
                }
            );
           
        
        });
    }

}
