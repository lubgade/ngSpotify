import { Component } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

  

@Component({
    moduleId: module.id,  
    selector: 'modal',
    templateUrl: 'modal.component.html',
    providers: [SpotifyService, NgbModal],
  })
  
  export class ModalComponent {
      closeResult:string;
    
    constructor(private spotifyService: SpotifyService, private modalService: NgbModal){
    }

    open(content){
        this.modalService.open(content).result.then((result) =>{
            console.log(result);
            this.closeResult = 'Closed with: ${result}';
        },(reason) => {
            this.closeResult = 'Dismissed ${this.getDismissReason(Reason)}';
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }
    

    loginSpotify(){
        console.log('login to spotify');
        
      }
  
      
    }
  