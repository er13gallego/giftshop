import { Component, Input, ViewEncapsulation, Directive,
  TemplateRef, QueryList, ContentChildren, AfterContentChecked } from '@angular/core';
import { cardToggle, cardClose } from './card-animation';

@Directive({ selector: 'ng-template[appCardTitle]' })
export class CardTitleDirective {
  constructor(public templateRef: TemplateRef<any>) { }
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [cardToggle, cardClose],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements AfterContentChecked {

  private _collapsed: boolean;
  private _collapsedClass: string;
  private _closed: boolean;
  private _closedClass: string;

  private _loading: boolean;
  private _loadingClass: string;

  private _fullScreen: boolean;
  private _fullScreenClass: string;
  private _fullScreenIcon: string;

  @Input() headerContent: string;
  @Input() title: string;
  @Input() blockClass: string;
  @Input() cardClass: string;
  @Input() classHeader = false;
  isCardToggled = false;

  titleTpl: CardTitleDirective | null;
  @ContentChildren(CardTitleDirective, { descendants: false }) titleTpls: QueryList<CardTitleDirective>;

  public get fullScreen(): boolean {
    return this._fullScreen;
  }

  public get fullScreenClass(): string {
    return this._fullScreenClass;
  }

  public get fullScreenIcon(): string {
    return this._fullScreenIcon;
  }

  public get loading(): boolean {
    return this._loading;
  }

  @Input() public set loading(value: boolean) {
    this._loading = value;
    this._loadingClass = value ? 'card-load' : '';
    this.open();
  }

  public get loadingClass(): string {
    return this._loadingClass;
  }

  public get closed(): boolean {
    return this._closed;
  }

  public get closedClass(): string {
    return this._closedClass;
  }

  public get collapsed(): boolean {
    return this._collapsed;
  }

  public get collapsedClass(): string {
    return this._collapsedClass;
  }

  constructor() {
    this.setCollapsed(false);
    this.setFullScreen(false);
    this.loading = false;
  }

  ngAfterContentChecked(): void {
    this.titleTpl = this.titleTpls.first;
  }

  toggle() {
    this.setCollapsed(!this.collapsed);
    // this.cardToggle = this.cardToggle === 'collapsed' ? 'expanded' : 'collapsed';
  }

  close() {
    this.setClosed(true);
    // this.cardClose = this.cardClose === 'closed' ? 'open' : 'closed';
  }

  open() {
    this.setClosed(false);
  }

  toggleFullScreen() {
    this.setFullScreen(!this.fullScreen);
  }
  /*
    cardRefresh() {
      this.loading = true;
      this.cardLoad = 'card-load';
      setTimeout(() => {
        this.cardLoad = '';
        this.loading = false;
      }, 3000);
    }
  */
  private setFullScreen(value: boolean) {
    this._fullScreen = value;
    this._fullScreenClass = value ? 'full-card' : '';
    this._fullScreenIcon = value ? 'icofont-resize' : '';
  }

  private setClosed(value: boolean) {
    this._closed = value;
    this._closedClass = value ? 'closed' : 'open';
  }

  private setCollapsed(value: boolean) {
    this._collapsed = value;
    this._collapsedClass = value ? 'collapsed' : 'expanded';
  }
}
