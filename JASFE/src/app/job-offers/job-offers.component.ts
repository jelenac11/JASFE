import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobOfferRequest } from '../core/models/request/job-offer-request.model';
import { CompanyRequestResponse } from '../core/models/response/company-response.model';
import { CompanyService } from '../core/services/company.service';
import { JobOfferService } from '../core/services/job-offer.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss']
})
export class JobOffersComponent implements OnInit {
  allJobOffers: JobOfferRequest[] = [];
  myJobOffers: JobOfferRequest[] = [];

  constructor(
    private router: Router,
    private jobOfferService: JobOfferService,
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe((data: CompanyRequestResponse[]) => {
      const auth0id = localStorage.getItem('auth0id');
      const companies = data.filter((c) => '"' + c.OwnerId + '"' === auth0id);
      const companyIDS = companies.map((c) => c.ID);

      this.jobOfferService.getAllJobOffers().subscribe((data: JobOfferRequest[]) => {
        this.allJobOffers = data.filter(offer => !companyIDS.includes(offer.CompanyID));
      });

      companies.forEach(comp => {
        this.jobOfferService.getJobOffersByCompany(comp.ID).subscribe((data: JobOfferRequest[]) => {
          this.myJobOffers.push(...data);
        });
      });
    });
  }

  goTo(route: string) {
    console.log(this.allJobOffers);
    console.log(this.myJobOffers);
    this.router.navigate([route]);
  }

}
