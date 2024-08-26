import { Component, Input } from '@angular/core';
import { PopularTagType } from '../../types/popularTag.type';


@Component({
  selector: 'mc-tag-list',
  templateUrl: './tagList.component.html',
  standalone: true,
  imports: [],
})
export class TagListComponent {
  @Input() tags: PopularTagType[] = [];
}
