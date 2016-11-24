import { Component, OnInit, Optional } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import { AlgoliaService } from '../algolia.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  isDarkTheme: boolean = false;
  lastDialogResult: string;
  search = {query:''};


  hits: any[] = [];

  progress: number = 0;

  constructor(private _dialog: MdDialog, private _snackbar: MdSnackBar,private _algolia:AlgoliaService) {
    // Update the value for the progress-bar on an interval.
       console.log("START");
    //  _algolia.setConfig('BHFNGI9C92','170f22b70d7e9ad72b1fc2991812cb2e');

  }
  searchFor(value){
      //this._algolia.search({query:value},null,null).subscribe(items => this.hits = items.hits);

      this._algolia.setConfig('9KHJLG93J1','2e0b9ee9857808ac9e388fa9f68f29c4');
      this._algolia.indexName("S.Prod.UAE");
      this._algolia.search({query:value},null,null).subscribe(items => this.hits = items.hits);
  }

  openDialog() {
    let dialogRef = this._dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }

  showSnackbar() {
    this._snackbar.open('YUM SNACKS', 'CHEW');
  }

  ngOnInit() {


  }

}


@Component({
  template: `
    <p>This is a dialog</p>
    <p>
      <label>
        This is a text box inside of a dialog.
        <input #dialogInput>
      </label>
    </p>
    <p> <button md-button (click)="dialogRef.close(dialogInput.value)">CLOSE</button> </p>
  `,
})
export class DialogContent {
  constructor(@Optional() public dialogRef: MdDialogRef<DialogContent>) { }
}
