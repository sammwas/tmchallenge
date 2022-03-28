import { MembersService } from './../../_services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  constructor(
    private membersService: MembersService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.membersService
      .getMember(parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe((member) => {
        this.member = member;
      });
  }

  delete() {
    this.membersService
      .deleteMember(parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe((response: any) => {
        console.log(response);
        this.toastr.success('deleted');
        this.router.navigateByUrl('/users');
      });
  }
}
