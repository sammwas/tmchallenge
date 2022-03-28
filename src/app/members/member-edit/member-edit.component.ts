import { ToastrService } from 'ngx-toastr';
import { MembersService } from './../../_services/members.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  member: Member;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private membersService: MembersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadMember(this.id);
  }

  loadMember(id: number) {
    this.membersService.getMember(id).subscribe((member) => {
      this.member = member;
    });
  }
  cancel() {
    this.router.navigateByUrl('/users');
  }
  edit() {
    this.membersService.editMember(this.id, this.member).subscribe(() => {
      let current = new Date();
      this.toastr.success('update successful ' + current.toLocaleString());
      this.router.navigateByUrl('/users');
    });
  }
}
