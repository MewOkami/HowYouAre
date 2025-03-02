import { Component } from '@angular/core';
import { HowYouAreComponent } from '../../componentes/how-you-are/how-you-are.component';

@Component({
  selector: 'app-home',
  imports: [HowYouAreComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
