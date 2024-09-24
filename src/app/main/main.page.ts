import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, LoaderComponent] 
})
export class MainPage implements OnInit {
  showLoader: boolean = false;

  constructor() { }

  ngOnInit() { }

  startLoader() {
    this.showLoader = true;
  }

  onLoaderFinished() {
    this.showLoader = false;
  }
}