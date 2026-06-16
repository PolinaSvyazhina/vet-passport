import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  templateUrl: 'event-creat.page.html'
})
export class EventCreatPage implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private pagesName = signal('')
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._activatedRoute.queryParams
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe(params => {
        this.pagesName = params['pageName'];
      })
  }
}
