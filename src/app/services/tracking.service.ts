import { Injectable } from '@angular/core';
import mixpanel from "mixpanel-browser";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  init() {
    mixpanel.init(environment.MIXPANEL_TOKEN, {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
  }

  trackEvent(event: string, properties?: any) {
    mixpanel.track(event, properties);
  }
}
