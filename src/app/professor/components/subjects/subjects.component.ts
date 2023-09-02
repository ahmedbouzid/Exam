import { Component , OnInit} from '@angular/core';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  allSubjects :any[] = [] ;
constructor(private service : ProfessorService , ){}


ngOnInit(): void {
    this.getAllSubjects()
  }
  getAllSubjects(){
    this.service.getAllSubjects().subscribe((subject : any) => {
      this.allSubjects = subject ;
    }) 
  }
}
