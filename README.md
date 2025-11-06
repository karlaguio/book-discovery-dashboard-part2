<<<<<<< HEAD
# Web Development Project 6 - Book Discovery Dashboard (Part 2)
=======
# Web Development Project 7 - Book Discovery Dashboard (Part 2)
>>>>>>> b3771e24303fd234d10c6eb8155b9c68e645ff11

Submitted by: **Karla Guio Cortes**

This web app: **An elegant, library‑themed React dashboard that explores programming books from the Open Library API. The app shows a searchable, filterable list of books, multiple charts that visualize different aspects of the dataset, and a detail view for each book with additional information (author bios, excerpts, subjects, external links). Built with React, React Router, and Recharts.**

Time spent: **5 hours**

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking a book card navigates to a detail view for that book.
  - The detail view includes extra information not shown on the dashboard: full description, author biography and birth date (when available), excerpts and external links.
  - The same sidebar is visible in both dashboard and detail views (used for navigation and for grading recordings).
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  - Example: /book/:bookId — the URL updates and is bookmarkable/shareable.
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - Bar chart: Books by Decade — shows distribution of books across decades.
  - Pie chart: Edition Count Distribution — shows how edition counts are distributed across the collection.
  - Both charts are displayed on the dashboard and describe different aspects of the dataset.
<<<<<<< HEAD

The following **optional** features are implemented:

- [x] The site’s customized dashboard contains more content that explains what is interesting about the data
  - Chart headings and short descriptions explain what each visualization shows and suggest how filters can be used.
- [ ] The site allows users to toggle between different data visualizations
  - (Not implemented — both charts are visible simultaneously on the dashboard.)

The following **additional** features are implemented:

* [x] Elegant library-themed styling (warm brown palette, serif font)
* [x] Responsive layout and persistent sidebar

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://submissions.us-east-1.linodeobjects.com/web102/ir9EqvAW.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif (Windows)

## Notes

Challenges encountered while building the app:

- Working with the Open Library API required mapping nested objects into a clean shape for UI use (works vs authors vs covers).
- Building simultaneous search + filter logic required careful state coordination to avoid stale results.
- Detail pages fetch additional endpoints (work and author resources); had to handle missing fields and inconsistent structures.
- Styling a classical "library" look while keeping good contrast and responsive behavior took several iterations.
- Debugging routing and default exports (ensure components default export) resolved an initial blank page.

## License

    Copyright 2025 Karla Guio Cortes

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
=======

The following **optional** features are implemented:

- [x] The site’s customized dashboard contains more content that explains what is interesting about the data
  - Chart headings and short descriptions explain what each visualization shows and suggest how filters can be used.
- [ ] The site allows users to toggle between different data visualizations
  - (Not implemented — both charts are visible simultaneously on the dashboard.)

The following **additional** features are implemented:

* [x] Elegant library-themed styling (warm brown palette, serif font)
* [x] Responsive layout and persistent sidebar

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<url src='https://submissions.us-east-1.linodeobjects.com/web102/ir9EqvAW.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif (Windows)

## Notes

Challenges encountered while building the app:

- Working with the Open Library API required mapping nested objects into a clean shape for UI use (works vs authors vs covers).
- Building simultaneous search + filter logic required careful state coordination to avoid stale results.
- Detail pages fetch additional endpoints (work and author resources); had to handle missing fields and inconsistent structures.
- Styling a classical "library" look while keeping good contrast and responsive behavior took several iterations.
- Debugging routing and default exports (ensure components default export) resolved an initial blank page.

## License

    Copyright 2025 Karla Guio Cortes

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

>>>>>>> b3771e24303fd234d10c6eb8155b9c68e645ff11
