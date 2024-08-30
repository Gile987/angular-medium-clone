import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToFavoritesActions } from './store/actions';

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './addToFavorites.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class AddToFavoritesComponent {
  @Input() isFavorited: boolean = false;
  @Input() favoritesCount: number = 0;
  @Input() articleSlug: string = '';

  constructor(private store: Store) {}

  handleLike(): void {
    this.store.dispatch(
      addToFavoritesActions.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      })
    );
    this.updateFavoriteState();
  }

  private updateFavoriteState(): void {
    const newFavoritesCount = this.isFavorited
      ? this.favoritesCount - 1
      : this.favoritesCount + 1;
    const newIsFavorited = !this.isFavorited;

    this.favoritesCount = newFavoritesCount;
    this.isFavorited = newIsFavorited;
  }
}
