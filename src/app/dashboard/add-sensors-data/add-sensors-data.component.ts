import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-add-sensors-data',
  templateUrl: './add-sensors-data.component.html',
  styleUrls: ['./add-sensors-data.component.scss']
})
export class AddSensorsDataComponent implements OnInit {

  constructor(public storeService: StoreService, private formBuilder: UntypedFormBuilder, public backendService: BackendService) { }
  public sensorenDataForm: any;

  ngOnInit(): void {
    this.sensorenDataForm = this.formBuilder.group({
      sensorId: [0, [ Validators.required ] ],
      temperature: ['', [ Validators.required, Validators.min(-50), Validators.max(60) ] ],
      humidity: ['', [ Validators.required, Validators.min(0), Validators.max(100) ] ],
      date:  [null, [ Validators.required ] ]
    });
  }

  async onSubmit() {
    if(this.sensorenDataForm?.valid) {
      let formValue = this.sensorenDataForm.value;
      if (formValue.date.getMonth().toString().length < 2 && formValue.date.getDate().toString().length > 1) {
        formValue.date = `${formValue.date.getFullYear()}-0${formValue.date.getMonth()+1}-${formValue.date.getDate()}`;
      }
      if (formValue.date.getDate().toString().length < 2 && formValue.date.getMonth().toString().length > 1) {
        formValue.date = `${formValue.date.getFullYear()}-${formValue.date.getMonth()+1}-0${formValue.date.getDate()}`;
      }
      if (formValue.date.getDate().toString().length < 2 && formValue.date.getMonth().toString().length < 2) {
        formValue.date = `${formValue.date.getFullYear()}-0${formValue.date.getMonth()+1}-0${formValue.date.getDate()}`;
      }
      else {
        formValue.date = `${formValue.date.getFullYear()}-${formValue.date.getMonth()+1}-${formValue.date.getDate()}`;
      }
      await this.backendService.addSensorsData(this.sensorenDataForm.value);
      this.sensorenDataForm.resetForm();
      //this.sensorenDataForm.reset();
    }
  }
}
