import {Component, Host, Input} from '@angular/core';
import {FoodsComponent} from '../foods/foods.component';
import {Utils} from '../utils';

declare const $: any;

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent {
  @Input() food;

  private parent;

  constructor(@Host() parent: FoodsComponent) {
    this.parent = parent;
  }

  showDeleteModal(): void {
    Utils.showModal('delete-food-modal');

    $('#btn-delete').unbind().click(() => {
      this.parent.deleteFood(this.food);
    });

    $('#btn-delete-cancel').unbind().click(() => {
      Utils.hideModal('delete-food-modal');
    });
  }

  showEditModal(): void {
    Utils.showModal('edit-food-modal');

    $('#name_edit').val(this.food.name);
    $('#type_edit').val(this.food.type);
    $('#price_edit').val(this.food.price);
    $('#description_edit').val(this.food.description);
    $('#imageURL_edit').val(this.food.imageURL);

    $('#btn-save').unbind().click(() => {
      this.food.name = $('#name_edit').val();
      this.food.type = $('#type_edit').val();
      this.food.price = +$('#price_edit').val();
      this.food.description =  $('#description_edit').val();
      this.food.imageURL = $('#imageURL_edit').val();

      this.parent.editFood(this.food);
    });
  }
}

