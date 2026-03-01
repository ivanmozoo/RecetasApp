import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  constructor(
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cd.detectChanges;
  }
}
