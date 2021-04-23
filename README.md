
# ProviderSearchApp

##see it run here! https://angular-ivy-byjmls.stackblitz.io/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

##------------------
##Overview
Use Case:
Angular application which can aggregate provider data from multiple data sources.
This application will be querying external and internal data sources to provide relevant search details.
Candidate is expected to use one such data source and query it real-time using the below provided data source: 
https://data.medicare.gov/Nursing-Home-Compare/Provider-Info/4pq5-n9py
Business Rules:
1.	User should be able to search by one or more terms.
2.	Search form should include option to search by: 
o	Provider Number
o	Provider Name
o	Zip Code
3.	Results should be Wildcard search to one or more details provided by the user.
4.	Results should be paginated and sortable.
5.	Results page should include following details for each provider:
o	Provider Name
o	Provider Number
o	Provider Address (complete)
o	Phone Number
Expected Outcome:
1.	Provider search application, which will query the dataset in real-time to provide results.
2.	Results page can be bookmarked to be accessed later. Results should refresh every time it is accessed. 


