import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';

import 'style-loader!./register.scss';
import {UploadService} from "./upload.service";

@Component({
  selector: 'register',
  templateUrl: './register.html',
})
export class Register {
  picName: string;
  constructor(private service:UploadService) {
    this.service.progress$.subscribe(
      data => {
        console.log('progress = '+data);
      });
  }

  onChange(event) {
    console.log('onChange');
    var files = event.srcElement.files;
    console.log(files);
    this.service.makeFileRequest('http://localhost:9823/api/Messages', [],      files).subscribe(() => {
      console.log('sent');
      this.picName = "ga";
    });
  }
}
