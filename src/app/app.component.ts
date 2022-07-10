import { Component } from '@angular/core';
import { OutletContext, RouterOutlet, ActivatedRoute } from '@angular/router';
import { stepper, fader, slider } from 'src/routeAnimations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fader],
})
export class AppComponent {
  title = 'star-wars';

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
