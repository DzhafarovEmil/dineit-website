declare const $: any;

export class Utils {
  public static showModal(id: string): void {
    $('#' + id).modal('open');
  }

  public static hideModal(id: string) {
    $('#' + id).modal('close');
  }
}
