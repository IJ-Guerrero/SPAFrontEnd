import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curriculum } from '../model/curriculum';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
// <<<<<<< HEAD
  curriculumURL = 'https://localhost:8081/curriculum/';
// =======
  URL = environment.URL + 'curriculum/';
// >>>>>>> dbccedd5c18384aa757cbb7ab7d9f7f3bc0e7672

  constructor(private httpClient : HttpClient) { }

  public lista(): Observable<Curriculum[]>{
    return this.httpClient.get<Curriculum[]>(this.URL + 'lista');
  }

  public detail(id: number): Observable<Curriculum>{
    return this.httpClient.get<Curriculum>(this.URL + `detail/${id}`);
  }

  public save(curriculum: Curriculum): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'create', curriculum);
  }

  public update(id: number, curriculum: Curriculum): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, curriculum);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }
}
