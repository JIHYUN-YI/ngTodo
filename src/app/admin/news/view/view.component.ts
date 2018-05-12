import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../admin.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private adminService: AdminService) {
    // view 객체를 호출할 때, 첫 번째만 생성, 두 번째부터는 찍히지 않는다.
    // => 한 번만 생성
    console.log(location.pathname);

    this.route.params.subscribe(params => {
      console.log(params);
      const news_id = +params['news_id']; // +기호는 string to number
      console.log(news_id);
      this.findOneNews(news_id);
    });
  }

  findOneNews(news_id: number) {
    this.adminService.findOneNews(news_id)
      .subscribe(body => {
        console.log(body);
    });
  }

  ngOnInit() {
  }

}
