import { Component , OnInit} from '@angular/core';
import { ProfessorService } from '../../services/professor.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  allSubjects :any[] = [] ;
  user : any = {}
constructor(
  private service : ProfessorService ,
  private authService : AuthService ,
  private toast : ToastrService
  ){}


ngOnInit(): void {
    this.getAllSubjects() ;
    this.getUserInfo()

  }
  getAllSubjects(){
    this.service.getAllSubjects().subscribe((subject : any) => {
      this.allSubjects = subject ;
    })
  }


  getUserInfo() {
    this.authService.getRole().subscribe((res) => {
      this.user = res ;
      console.log('USer Info ====================================');
      console.log(this.user);
      console.log('====================================');
    })
  }
  delete(index:number){

    let id = this.allSubjects[index].id ;
    this.allSubjects.splice(index , 1)
    this.service.deleteSubject(id).subscribe(res => {
      this.toast.success('Delete Succufully')
    })


  }
}
