import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ManagerService} from "../../../services/manager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css']
})
export class CreateHouseComponent implements OnInit {

  formCreateHouse: FormGroup | undefined;
  imgUrls: Array<string> = [];
  statusSubmit = false;
  constructor(private fb: FormBuilder,
              private storage: AngularFireStorage,
              private managerService: ManagerService,
              private router: Router) { }

  ngOnInit(): void {
    this.formCreateHouse = this.fb.group({
      name: ['', [Validators.required]],
      category_id: ['1'],
      address: ['', [Validators.required]],
      bedroom: ['1'],
      bathroom: ['1'],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: [[]],
      user_id: [JSON.parse(<string>localStorage.getItem('userLogin')).id],
      status: ['còn trống'],
    })
  }

  submit() {
    if (this.imgUrls.length == 0) {
      // @ts-ignore
      this.formCreateHouse?.value.image[0] = 'https://firebasestorage.googleapis.com/v0/b/home-from-home-93499.appspot.com/o/RoomsImages%2Fdefault--image-house.jpeg?alt=media&token=5b157fe2-a513-46ff-8055-4315b54afda9';
    }
    else {
      // @ts-ignore
      this.formCreateHouse?.value.image = [];
      for (let i = 0; i < this.imgUrls.length; i++) {
        // @ts-ignore
        this.formCreateHouse?.value.image[i] = this.imgUrls[i];
      }
    }
    console.log(this.formCreateHouse?.value.image);
    let data = this.formCreateHouse?.value;
    // console.log(data);
    this.managerService.createHouse(data).subscribe(res => {
      this.router.navigate(['manager/list-house']).then(r => {
        alert('Thêm thành công')
      })
    },
      error => {
      this.router.navigate(['manager/list-house'], )
      // console.log(error);
      })
  }

  get name() {
    return this.formCreateHouse?.get('name');
  }

  get address() {
    return this.formCreateHouse?.get('address');
  }

  get description() {
    return this.formCreateHouse?.get('description');
  }

  get price() {
    return this.formCreateHouse?.get('price');
  }

  files: File[] = [];
  downloadURL: Observable<string> | undefined;

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    let rejectedFiles: File[] = [];
    rejectedFiles.push(...event.rejectedFiles);
    if (rejectedFiles.length > 0) {
      alert('Có file tải lên không phải định dạng ảnh!')
    }
    // console.log(rejectedFiles);
    // console.log(this.files);
    let imgUrlLengthOld = this.imgUrls.length;
    if (this.files.length <= 5) {
      if (this.files.length > imgUrlLengthOld) {
        this.statusSubmit = true;
        // console.log(imgUrlLengthOld);
        for (let i = 0; i < this.files.length - imgUrlLengthOld; i++) {
          setTimeout( () => {
            var n = Date.now();
            const file = this.files[i + imgUrlLengthOld];
            const filePath = `RoomsImages/${n}`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(`RoomsImages/${n}`, file);
            task.snapshotChanges().pipe(
              finalize(() => {
                this.downloadURL = fileRef.getDownloadURL();
                this.downloadURL.subscribe(url => {
                  if (url) {
                    this.imgUrls[i + imgUrlLengthOld] = url;
                  }
                  // console.log(this.imgUrls);
                  if (this.imgUrls.length == this.files.length) {
                    this.statusSubmit = false;
                  }
                });
              })
            )
              .subscribe(url => {
                if (url) {
                  // console.log(url);
                }
              });
          }, 1)
        }
      }
    }
    else {
      alert('Chỉ được phép tải lên tối đa 5 ảnh. Mời chọn lại!');
      this.files = [];
      this.imgUrls = [];
    }
  }

  onRemove(event: any) {
    // console.log(event);
    let indexOfEvent = this.files.indexOf(event);
    this.files.splice(indexOfEvent, 1);
    this.imgUrls.splice(indexOfEvent, 1);
    // console.log(this.imgUrls);
  }
}
