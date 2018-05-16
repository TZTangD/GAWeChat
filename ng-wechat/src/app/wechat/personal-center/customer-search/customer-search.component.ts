import { Component, ViewChild } from '@angular/core';
import { InfiniteLoaderComponent } from 'ngx-weui';
import { timer } from 'rxjs/observable/timer';

@Component({
    moduleId: module.id,
    selector: 'customer-search',
    templateUrl: 'customer-search.component.html',
    styleUrls: ['customer-search.component.scss']
})
export class CustomerSearchComponent {
    @ViewChild(InfiniteLoaderComponent) il;
    restartBtn = false;
  
    items: any[] = Array(20)
      .fill(0)
      .map((v: any, i: number) => i);
    onLoadMore(comp: InfiniteLoaderComponent) {
      this.restartBtn = false;
      timer(1500).subscribe(() => {
        this.items.push(
          ...Array(10)
            .fill(this.items.length)
            .map((v, i) => v + i),
        );
  
        if (this.items.length >= 50) {
          this.restartBtn = true;
          comp.setFinished();
          return;
        }
        comp.resolveLoading();
      });
    }
  
    restart() {
      this.items.length = 0;
      this.il.restart();
    }
}
