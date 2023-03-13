Technical Task

We’d like to find out a bit more about how you approach problem solving by completing a technical exercise. You should aim to spend around 2-3 hours on this technical task, but are free to spend as much or little of those 2-3 hours as you wish. Please upload your code sample to GitHub and submit the link. Don’t worry if you don’t complete the task, can’t get the code to compile or have any other issues. We’re most interested in seeing how it is you tackle problem solving, and we’re looking to understand why you’ve made the decisions you have when it comes to your solution.

Your solution will provide the basis for your technical interview where we will explore extending your solution given certain business challenges.  If you don’t finish then don’t worry just send over what you’ve got.

To be clear that while we practise TDD in some of our teams, unit tests are not required for this task.

E-Commerce Listing Page Task

Please choose one or multiple parts below you feel best reflects your abilities.

Generate a grid of product cards from the listing results using our API
Add to your list of product cards by adding Sort by filters and/ or pagination functionality
Show us what you got? Use our data to build anything you want (keep it safe for work)

API
Here is our publicly available API: https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI

Example body schema for the provided POST endpoint:
{
  "query": "toilets",
  "pageNumber": 0,
  "size": 0,
  "additionalPages": 0,
  "sort": 1
}

query is the slug of the listing page e.g. “toilets” or “baths/corner-baths”
pageNumer, size and additionalPages are all used for pagination.
Sort accepts integers which correspond to the following values:
1 = recommended
2 = PriceLowToHight
3 = PriceHighToLow
4 = LargestDiscount



Here is another example with facets and filters applied:

{
  "query": "toilets",
  "pageNumber": 0,
  "size": 0,
  "additionalPages": 0,
  "sort": 1,
  "facets": {
      "prices": [{
            "identifier": "3D-02-FC-D0-B1-8F-65-51",
            "value": {
                "gte": 150.0,
                "lte": 200.0
            }
      }],
      "toiletStyle": [{
            "identifier": "1A-0D-8E-F5-02-80-29-13",
            "value": "Modern"
      }]
  }
}

Example Page
Here is a link to one of our product listings pages - https://www.victorianplumbing.co.uk/toilets.
Please note we don’t expect a full page with headers and footer but specifically the listing section of the page. I’ve provided a screen shot to assist **.

You can build this however you like; we’d prefer React to be used as this is our main stack for our projects. Using Create React App is fine.
** screen shot of section of our product listing page we’d like you to focus on.

<img width="570" alt="Screenshot 2023-03-13 at 11 58 00" src="https://user-images.githubusercontent.com/6755754/224695425-44aa0351-9bbd-462e-be85-b69dbe7da447.png">


