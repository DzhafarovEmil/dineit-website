import {Component, OnInit} from '@angular/core';
import {FoodCompanyService} from '../services/food.company.service';
import {FoodCompany} from '../models/food.company';
import {Router} from '@angular/router';
import {Utils} from '../utils';
import {AppComponent} from "../app.component";

declare let $: any;
declare let Materialize: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error = '';

  public foodCompany: FoodCompany = new FoodCompany();
  public confirmPassword: string;
  public socialLink = {name: '', url: ''};

  constructor(private foodCompanyService: FoodCompanyService,
              private router: Router) {
  }

  ngOnInit(): void {
    $(function () {
      $('select').material_select();
      $('.modal').modal();
      $('.chips-placeholder').material_chip('data');
      Materialize.updateTextFields();
    });

    $('.chips-placeholder').material_chip({
      placeholder: 'Social network'
    });

    $('.chips').on('chip.add', (e, chip) => {
      this.socialLink.name = chip.tag;
      Utils.showModal('modal1');
      $('#url-link').focus();
    }).on('chip.delete', (e, chip) => {
      delete this.foodCompany.socialNetworkRefs[chip.tag];
    });

    $('#url-link').on('keydown', (e) => {
      if (e.which === 13) {
        e.preventDefault();
        this.addSocialLink();
      }
    });
  }

  register() {
    if (this.validateForm()) {
      this.error = '';
      this.foodCompanyService.addNewCompany(this.foodCompany, {
        success: () => {
          this.foodCompany = new FoodCompany();
          this.router.navigate(['/login']);
        }
      });
    }
  }

  addSocialLink(): void {
    this.foodCompany.socialNetworkRefs[this.socialLink.name] = this.socialLink.url;
    this.socialLink = {name: '', url: ''};
    Utils.hideModal('modal1');
  }

  private validateForm(): boolean {
    return true;
  }
}
