import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  standalone: false,
  // imports: [],
  templateUrl: './lazy-image.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyImageComponent implements OnInit {


  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;


  ngOnInit(): void {
    if( !this.url) throw new Error('Url is required.');
  }

  onLoad()
  {
    setTimeout(() => {
      console.log("image loaded")
      this.hasLoaded = true;
    }, 1000)


  }



}
