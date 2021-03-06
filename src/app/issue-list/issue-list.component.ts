import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
})
export class IssueListComponent implements OnInit {
  constructor(private issueService: IssuesService) {}

  issues: Issue[] = [];
  showReportIssue = false; // toggles the appearance of the report issue form

  selectedIssue: Issue | null = null;
  selectedAction: string | null = null;

  ngOnInit(): void {
    this.getIssues();
  }

  private getIssues() {
    this.issues = this.issueService.getPendingissues();
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.getIssues();
  }

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }

    this.selectedIssue = null;
  }

  select(issue: Issue, action: string) {
    this.selectedIssue = issue;
    this.selectedAction = action;
  }

  resolve(issue: Issue) {
    this.selectedIssue = issue;
    this.selectedAction = 'resolve';
  }

  edit(issue: Issue) {
    this.selectedIssue = issue;
    this.selectedAction = 'edit';
    this.showReportIssue = true;
  }
}
