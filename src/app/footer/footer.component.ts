import { Component } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { PrimengtoolsModule } from '../primengtools/primengtools.module';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [PrimengtoolsModule,MenubarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(public layoutService: LayoutService) { }
}
