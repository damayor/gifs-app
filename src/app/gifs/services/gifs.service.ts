import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.development';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const gifs = localStorage.getItem('gifsHistory');
  return gifs ? JSON.parse(gifs) : {};
}

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient)

  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage()) //ToDo, deje en el localStorage

  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveToLocalStorage = effect(() => {
     console.log(`se llamo el local storage ${this.searchHistory()}`)
    localStorage.setItem('gifsHistory', JSON.stringify(this.searchHistory()))
  })


  loadTrendingGifs() {

    this.http.get<GiphyResponse>(`${environment.giphyUrl}gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    }).subscribe((resp) => {

      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);

      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log({gifs});
    } );

  }

  //Otra modalidad, retorna el observable, y quien lo llama Has To suscribe it
  searchGifs(query:string) {

    return this.http.get<GiphyResponse>(`${environment.giphyUrl}gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 20,
      }
    })
    .pipe(
      map( ({data})  => data ),
      map( (items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLowerCase()]:items,
        }))
      })
    )
  }

  getHistoryGifs(query: string) : Gif[]{
    return this.searchHistory()[query] ?? [];
  }



}
