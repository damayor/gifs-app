import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  standalone: false,
  // imports: [],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {


  @Input()
  public gifs: Gif[] = [];
}
