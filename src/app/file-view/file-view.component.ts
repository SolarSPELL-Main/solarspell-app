import { Component, OnInit } from "@angular/core";
import { Folder } from "../models/folder";
import { Content } from "../models/content";
import { DataService } from "../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BreadcrumbService } from "../breadcrumb/breadcrumb.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-file-view",
  templateUrl: "./file-view.component.html",
  styleUrls: ["./file-view.component.css"],
})
  
export class FileViewComponent implements OnInit {

  public parentFolder: Folder;
  public content: Content;
  public metadataList: [];
  public fileURL: SafeResourceUrl;
  public resourceType: string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private sanitizer: DomSanitizer,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.content = data.fileData.content;
      this.metadataList = data.fileData.metadata;
      this.parentFolder = data.fileData.parentFolder;
      this.breadcrumbService.updateBreadcrumb(this.content.id, false);
      this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(
        environment.contentUrl.concat(this.content.file_name)
      );
    });

    window.scroll(0, 0);

    if (this.content.file_name.includes(".mp4")) {
      this.resourceType = "video";
    } else if (this.content.file_name.includes(".mp3")) {
      this.resourceType = "audio";
    } else if (this.content.file_name.includes(".pdf")) {
      this.resourceType = "pdf";
      this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/pdf-js/web/viewer.html?file=' + environment.contentUrl.concat(this.content.file_name));
    } else {
      this.resourceType = "undefined";
    }
  }

  searchKeyword(name) {
    if (name.trim() != "") {
      this.router.navigate(["/search-list/keyword", name.toLowerCase()]);
    }
  }
}
