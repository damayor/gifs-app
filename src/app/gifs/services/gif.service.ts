import { Gif, SearchResponse } from './../interfaces/gifs.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

// const GIPHY_APY_KEY = "1AL1FByZr6gEY1GDY9loRKgVoAU1eSss"

@Injectable({providedIn: 'root'})
export class GifsService {


  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private api_key = "1AL1FByZr6gEY1GDY9loRKgVoAU1eSss";
  private serviceUrl = 'https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) { }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  searchTag(tag: string) {

    if(tag.length === 0) return ;

    this.organizeHistory(tag);

    // fetch('https://api.giphy.com/v1/gifs/search?q=valorant&limit=10&api_key=1AL1FByZr6gEY1GDY9loRKgVoAU1eSss')
    //   .then(resp => resp.json())
    //   .then( data => console.log({data}))

    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`https://api.giphy.com/v1/gifs/search`, {params})
      .subscribe( (resp) =>  {

        this.gifList = resp.data
        console.log({gifs: this.gifList});
      })


  }


  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag))
    {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);

    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
  }

}
