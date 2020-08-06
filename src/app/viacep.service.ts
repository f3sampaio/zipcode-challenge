import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  constructor(
    private http: HttpClient
  ) { }


  getCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    return this.http.get(url);
  }
}
