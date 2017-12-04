import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FoodCompanyService} from '../services/food.company.service';
import {FoodCompany} from '../models/food.company';
import {AppComponent} from '../app.component';
import {Utils} from '../utils';
import {Router} from "@angular/router";

declare let Materialize: any;
declare let $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {

  foodCompany: FoodCompany = new FoodCompany();
  socialNetworks = [];

  private static arrayToObject(arr): object {
    const result = {};
    for (let i = 0; i < arr.length; ++i) {
      result[arr[i].name] = arr[i].url;
    }
    return result;
  }

  private static clearChangePasswordFields(): void {
    $('#repeat').val('');
    $('#new').val('');
    $('#current').val('');
    Materialize.updateTextFields();
  }

  private static clearAddSocialNetworkFields(): void {
    $('#name_new').val('');
    $('#url_new').val('');
    Materialize.updateTextFields();
  }

  constructor(private foodCompanyService: FoodCompanyService,
              private ref: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit() {
    $(function () {
      $('.modal').modal();
    });
    $('#delete-btn').unbind().click(() => {
      Utils.showModal('delete-modal');
    });

    $('#save-btn').unbind().click(() => {
      Utils.showModal('edit-modal');
      this.editFoodCompany();
    });

    $('#change-pass-btn').unbind().click(() => {
      Utils.showModal('change-password-modal');
    });

    $('#btn-cancel-pass-modal').unbind().click(() => {
      Utils.hideModal('change-password-modal');
      SettingsComponent.clearChangePasswordFields();
    });

    $('#btn-change-pass-modal').unbind().click(() => {
      this.changePassword();
    });

    $('#btn-delete-cancel-modal').unbind().click(() => {
      Utils.hideModal('delete-modal');
    });

    $('#btn-delete-modal').unbind().click(() => {
      this.deleteFoodCompany();
    });

    $('#add-network-btn').unbind().click(() => {
      Utils.showModal('add-modal');
    });
    $('#btn-add-item-modal').unbind().click(() => {
      const socNet = {
        name: $('#name_new').val(),
        url: $('#url_new').val()
      };

      this.addSocialNetwork(socNet);
    });

    $('#btn-cancel-social-network').unbind().click(() => {
      Utils.hideModal('add-modal');
      SettingsComponent.clearAddSocialNetworkFields();
    });
    this.fetchData();
  }

  editFoodCompany(): void {
    this.foodCompanyService.editFoodCompany(this.foodCompany, {
      success: () => {
        Materialize.toast('Changes have been successfully saved!', 3000, 'rounded');
        this.fetchData();
      }
    });
  }

  deleteSocialLink(socialLink) {
    for (let i = this.socialNetworks.length - 1; i >= 0; i--) {
      if (this.socialNetworks[i].name === socialLink.name) {
        this.socialNetworks.splice(i, 1);
        this.ref.markForCheck();
        this.foodCompany.socialNetworkRefs = SettingsComponent.arrayToObject(this.socialNetworks);
        break;
      }
    }
  }

  private changePassword(): void {
    const currentPassword = $('#current').val().toString();
    const newPassword = $('#new').val().toString();
    const repeatPassword = $('#repeat').val().toString();

    if (repeatPassword === newPassword) {
      this.foodCompanyService.changePassword(
        currentPassword, newPassword, {
          success: () => {
            Materialize.toast('Password has been successfully changed!', 3000, 'rounded');
            Utils.hideModal('change-password-modal');
            SettingsComponent.clearChangePasswordFields();
            AppComponent.logoutStatic();
          },

          error: (message: string) => {
            Materialize.toast(message, 3000, 'rounded');
          }
        }
      );
    } else {
      Materialize.toast('Passwords do not equals!', 3000, 'rounded');
    }
  }

  private deleteFoodCompany(): void {
    this.foodCompanyService.deleteFoodCompany(this.foodCompany, {
      success: () => {
        Utils.hideModal('delete-modal');
        AppComponent.logoutStatic();
      }
    });
  }

  private addSocialNetwork(socNet) {
    this.socialNetworks.push(socNet);
    this.ref.markForCheck();
    Utils.hideModal('add-modal');
    SettingsComponent.clearAddSocialNetworkFields();
    this.foodCompany.socialNetworkRefs = SettingsComponent.arrayToObject(this.socialNetworks);
  }

  private fetchData() {
    this.foodCompanyService.findByUsername(localStorage.getItem('username'))
      .subscribe(foodCompany => {
        this.foodCompany = foodCompany;

        this.socialNetworks.length = 0;
        const data = Object.keys(foodCompany.socialNetworkRefs);
        for (let i = 0; i < data.length; i++) {
          this.socialNetworks.push({
              name: data[i],
              url: this.foodCompany.socialNetworkRefs[data[i]]
            }
          );
        }
        this.ref.markForCheck();
      });
  }
}
