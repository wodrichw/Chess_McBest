import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.css']
})
export class PiecesComponent{
  imageSource: string = "../../assets/images/chess/";
  piece: string;
  imgTag: string;
  cleanImgTag: any;

  constructor(private sanitizer: DomSanitizer) { }
  @Input()
  set imgSource(piece: string) {
    this.piece = piece;
    this.genTag();
  }

  @Input() id: number;
  @Output() idOut: EventEmitter<number> = new EventEmitter<number>();

  toggle(): void {
    this.genTag();
    this.idOut.next(this.id);  
  }

  genTag(): void {
    this.imgTag = '<img src="' + this.imageSource + this.piece + '.png" width="100%">'
    this.cleanImgTag = this.sanitizer.bypassSecurityTrustHtml(this.imgTag);
  }
}
