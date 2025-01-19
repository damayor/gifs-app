import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifsService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

  constructor( private gifsService: GifsService) {}

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }


}
