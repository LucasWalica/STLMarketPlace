import { Component, Input } from '@angular/core';
import { STL } from '../../../../models/STL.models';

@Component({
  selector: 'app-stl-card',
  imports: [],
  templateUrl: './stl-card.html',
  styleUrl: './stl-card.css'
})
export class StlCard {

  @Input({required:true}) stl!:STL;
}
