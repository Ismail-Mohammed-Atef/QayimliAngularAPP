import { Component } from '@angular/core';
import { PrimengtoolsModule } from '../primengtools/primengtools.module';
import { GetreviewsComponent } from "../reviews/getreviews/getreviews.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PrimengtoolsModule, GetreviewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
