import {
  Directive,
  HostListener,
  EventEmitter,
  OnInit,
  Input,
  Output,
  Inject,
  forwardRef,
  HostBinding,
  Renderer2,
  ElementRef
} from '@angular/core';

const ascending = 1;
const unset = 0;
const descending = -1;
const states = [
  unset,
  ascending,
  descending
];

@Directive({
  selector: '[appTablesort]'
})
export class TablesortDirective {

  private columns: Array<TablesortColDirective> = [];
  private sortColumns: Array<TablesortColDirective> = [];

  @Output() sort = new EventEmitter();

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'tablesort');
  }

  register(column: TablesortColDirective) {
    this.columns.push(column);
  }

  setSortColumn(column: TablesortColDirective) {
    if (!(this.sortColumns.length === 1 && this.sortColumns[0] === column)) {
      this.clearSortColumns();
      this.sortColumns.push(column);
    }
    this.rotateState(column);

    this.trigger();
  }

  addSortColumn(column: TablesortColDirective) {
    let found = false;
    for (const col of this.columns) {
      if (col === column) {
        found = true;
        break;
      }
    }
    if (!found) {
      this.sortColumns.push(column);
    }
    this.rotateState(column);
    this.trigger();
  }

  private trigger() {
    const values = [];
    for (const col of this.columns) {
      if (col.descending || col.ascending) {
        values.push((col.descending ? '-' : '') + col.name);
      }
    }
    const expression = values.join(',');
    this.sort.emit(expression);
  }

  private rotateState(column: TablesortColDirective) {
    column.stateIndex = ++column.stateIndex % states.length;
  }

  private clearSortColumns() {
    while (this.sortColumns.length > 0) {
      const col = this.sortColumns.pop();
      col.stateIndex = 0;
    }
  }
}

@Directive({
  selector: '[appTablesortCol]'
})
export class TablesortColDirective implements OnInit {

  stateIndex = 0;
  @HostBinding('class.asc') get ascending(): boolean {
    return states[this.stateIndex] === ascending;
  }
  @HostBinding('class.desc') get descending(): boolean {
    return states[this.stateIndex] === descending;
  }

  @Input('appTablesortCol') name: string;

  constructor(
    @Inject(forwardRef(() => TablesortDirective)) private _parent: TablesortDirective,
    renderer: Renderer2,
    elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'tablesort-col');
  }

  ngOnInit(): void {
    this._parent.register(this);
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (event.ctrlKey) {
      this._parent.addSortColumn(this);
    } else {
      this._parent.setSortColumn(this);
    }
  }
}

