import {
    Component, OnInit, ViewChild, Input, Output,
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

// import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { ActivatedRoute } from '@angular/router';

import { Optionlink } from "./optionlink";
import { OptionLinkService } from "./optionlinks.service";
import { ItemsService } from "../shared/utils/items.service";
import { NotificationService } from "../shared/utils/notification.service";
import { ConfigService } from "../shared/utils/config.service";
import { PaginatedResult } from "../shared/interfaces";
// import { Option } from "./option";
import { OptionService } from "./option.service";
import { OptionSearchObject } from "./optionsearch";
import { OptionLinkUpdateObject } from "./optionupdateobject";




// import { ManageUser } from "./manageuser";
// import { ManageUserService } from "./manageuser.service";

@Component({
    // moduleId: module.id,

    selector: 'optionlinks',
    templateUrl: 'optionlinks-list.component.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 10 ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})
export class OptionLinkListComponent {
    //@ViewChild('childModal') public childModal: ModalDirective;
    optionlinks: Array<Optionlink>;
    selectedOptions: Optionlink;
    domainid : string;
    apiHost: string;
    currentOptionSearch : OptionSearchObject;

    public itemsPerPage: number = 10;
    public totalItems: number = 0;
    public currentPage: number = 1;
    
    public addOptionLink:Optionlink;
    // Modal properties
    //@ViewChild('modal')
   // modal: any;
    items: string[] = ['item1', 'item2', 'item3'];
    selected: string;
    output: string;
    //selectedDomainId: number;
    //selectedDomainLoaded: boolean = false;
    index: number = 0;
    backdropOptions = [true, false, 'static'];
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
    onEdit: boolean = false;
    public addingDomain: boolean = false;
    
    constructor(
        private dataService: OptionLinkService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService,
        private loadingBarService: SlimLoadingBarService,
        private route: ActivatedRoute,
        private optionService: OptionService

        ) {this.addOptionLink = new Optionlink();  }

    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.route.params.subscribe(params => {this.domainid=params['domainid']});
        
        this.loadOptionlinks();
        this.loadOption();
        
        
    }
    loadOption()
    {
        this.optionService.getOption(this.domainid).subscribe((data: OptionSearchObject)=>{
            this.currentOptionSearch = data;
        },
        error => {
                 this.loadingBarService.complete();
               this.notificationService.printErrorMessage('Có lỗi khi tải .- ' + error);
                }
        );
    }
    saveOption()
    {
         let updObject = new OptionLinkUpdateObject();
         updObject.DOMAINLINK = this.optionlinks;
         updObject.IsEditLink = '1';
         updObject.OPTION = this.currentOptionSearch;
         this.optionService.updateOption(updObject).subscribe(() => {
                this.notificationService.printSuccessMessage('Link đã được cập nhật');
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Cập nhật thất bại ' + error);
            });
        //this.optionService.updateOption()
    }
    loadOptionlinks() {
        this.loadingBarService.start();

        this.dataService.getOptionLinks(this.domainid,this.currentPage, this.itemsPerPage)
            .subscribe((res: PaginatedResult<Array<Optionlink>>) => {
                this.optionlinks = res.result;// schedules;
                this.totalItems = res.pagination.TotalItems;
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.printErrorMessage('Có lỗi khi tải. ' + error);
            });
    }

    pageChanged(event: any): void {
        this.currentPage = event.page;
        //this.loadOptionlinks();

    };

    addNewOption(optlink: Optionlink) {
        this.itemsService.addItemToStart(this.optionlinks,optlink);


    }

deletOptionLink(link:Optionlink)
{
    this.itemsService.removeItemFromArray<Optionlink>(this.optionlinks, link);

}



}