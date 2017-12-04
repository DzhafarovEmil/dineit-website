import {Component, Host, Input, OnInit} from '@angular/core';
import {SettingsComponent} from '../settings/settings.component';

@Component({
  selector: 'app-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.css']
})
export class SocialNetworkComponent implements OnInit {

  @Input() socialNetwork;
  private parent;

  constructor(@Host() parent: SettingsComponent) {
    this.parent = parent;
  }

  deleteSocialLink(): void {
    this.parent.deleteSocialLink(this.socialNetwork);
  }

  ngOnInit() {
  }
}
