import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gif.service';

@Component({
  selector: 'shared-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {



  constructor(private gifsService: GifsService) {  }

  get tags() {
    return this.gifsService.tagsHistory;
  }

  searchTagInSidebar(tag: string) {

    this.gifsService.searchTag(tag);

  }



}
