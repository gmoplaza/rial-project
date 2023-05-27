import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rial-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MainHeaderComponent {

}
