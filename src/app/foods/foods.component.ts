import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Food} from '../models/food';
import {FoodService} from '../services/food.service';
import {Utils} from '../utils';

declare let $: any;
declare const Materialize: any;

@Component({
  selector: 'app-home',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodsComponent implements OnInit {
  foods: Food[] = [];

  constructor(private foodService: FoodService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    $(function () {
      $('.modal').modal();
    });

    $('#btn-add').unbind().click(() => {
      Utils.showModal('add-food-modal');
    });
    $('#add-item-btn').unbind().click(() => {
      const food = new Food();
      food.id = 0;
      food.name = $('#name_new').val();
      food.type = $('#type_new').val();
      food.price = +$('#price_new').val();
      food.description = $('#description_new').val();
      food.imageURL = $('#imageURL_new').val();
      this.addFood(food);
    });
    this.fetchElements();
  }

  addFood(food: Food): void {
    this.foodService.addFood(food, {
      success: (f: Food) => {
        this.foods.push(f);
        this.ref.markForCheck();
        Utils.hideModal('add-food-modal');
        this.clearInputs();
      }
    });
  }

  deleteFood(food: Food) {
    this.foodService.deleteFood(food, {
      success: (f: Food) => {
        for (let i = this.foods.length - 1; i >= 0; i--) {
          if (this.foods[i].id === f.id) {
            this.foods.splice(i, 1);
            this.ref.markForCheck();
            Utils.hideModal('delete-food-modal');
            break;
          }
        }
      }
    });
  }

  editFood(food: Food) {
    this.foodService.editFood(food, {
      success: (f: Food) => {
        for (let i = this.foods.length - 1; i >= 0; i--) {
          if (this.foods[i].id === f.id) {
            this.foods[i] = f;
            this.ref.markForCheck();
            Utils.hideModal('edit-food-modal');
            break;
          }
        }
      }
    });
  }

  fetchElements() {
    this.foodService.getFoods().subscribe(foods => {
      this.foods = foods;
      this.ref.markForCheck();
    });
  }

  clearInputs(): void {
    $('#name_new').val('');
    $('#type_new').val('');
    $('#price_new').val('');
    $('#description_new').val('');
    $('#imageURL_new').val('');
    Materialize.updateTextFields();
  }
}
