import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../modelos/Client';
import { Branch } from '../modelos/Branch';

@Injectable({
  providedIn: 'root'
})
export class JumpService {

  private SERVER_URL = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }


  // branchs
  public getBrachLink(id: string) {
    return this.httpClient.get(`${this.SERVER_URL}/branchs/link/${id}`);
  }

  public getBrachs() {
    return this.httpClient.get(`${this.SERVER_URL}/branchs`);
  }


  // trae los horarios segun la fecha y sucursal id
  public getBranchSchedule(daily: any) {
    return this.httpClient.post(`${this.SERVER_URL}/branchSettings/getschedule/`, daily);
  }

  // regions
  public getRegion(id: string) {
    return this.httpClient.get(`${this.SERVER_URL}/regions/${id}`);
  }

  public getRegiones() {
    return this.httpClient.get(`${this.SERVER_URL}/regions`);
  }


  // comunas
  public getComuna(id: string) {
    return this.httpClient.get(`${this.SERVER_URL}/comunas/${id}`);
  }

  public getComunas() {
    return this.httpClient.get(`${this.SERVER_URL}/comunas`);
  }


  // companies
  public getCompany(id: string) {
    return this.httpClient.get(`${this.SERVER_URL}/companies/${id}`);
  }

  public getCompanyCode(id: string) {
    return this.httpClient.get(`${this.SERVER_URL}/companies/rut/${id}`);
  }

  public getCompanies() {
    return this.httpClient.get(`${this.SERVER_URL}/companies`);
  }


  // clients
  public getClient(id: string) {
    return this.httpClient.get(`${this.SERVER_URL}/clients/${id}`);
  }

  public getClientByEmail(email: string) {
    return this.httpClient.get(`${this.SERVER_URL}/clients/getClientByEmail/${email}`);
  }

  public getClients() {
    return this.httpClient.get(`${this.SERVER_URL}/clients`);
  }

  public saveClients(client: Client) {
    return this.httpClient.post(`${this.SERVER_URL}/clients`, client);
  }

  public updateClient(id: string, clientUpdated: Client) {

    return this.httpClient.put(`${this.SERVER_URL}/clients/${id}`, clientUpdated);

  }

}
