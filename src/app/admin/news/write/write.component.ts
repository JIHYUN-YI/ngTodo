import { Component, OnInit } from '@angular/core';
import {NewsVO} from '../../../domain/news.vo';
import {AdminService} from '../../admin.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  news = new NewsVO();  // 명시적 초기화
  fileList: FileList;

  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  addNews() {
    this.adminService.addNews(this.news)
      .subscribe( body => {
        if (body.result === 0) {
          // success
          this.snackBar.open('등록하였습니다.', null, {duration: 3000});
          this.router.navigateByUrl('/admin/news');

          // 2)이벤트 발생자: 뉴스 등록 이벤트 발생 = subject 객체의 next를 이용해 객체 발생
          this.adminService.refresh.next(true);
        }
      });
  }

  fileChange (event: any) {
    console.log(event);
    // 여러 개의 파일 중 첫 번째 파일을 가져와서 File API의 FileReader를 객체를 이용해서 읽는다
    this.fileList = event.target.files;
    console.log(this.fileList);

    const reader = new FileReader();
    reader.readAsDataURL((this.fileList[0]));
    reader.onload = () => {
      // this.thumbnailSrc = reader.result;
      this.imageUpload();
    };
  }

  // 서버에 이미지 전송
  imageUpload() {
    const formData = new FormData();
    formData.append('a', 'b');  // dummy data for test
    formData.append('file', this.fileList[0], this.fileList[0].name);

    this.adminService.imageUpload(formData)
      .subscribe(body => {
        if (this.news.content) {
          this.news.content += `<img src="http://www.javabrain.kr${body['value']}" style="max-width: 100%;">`;
        } else {
          this.news.content = `<img src="http://www.javabrain.kr${body['value']}" style="max-width: 100%;">`;
        }
      });
  }

}
