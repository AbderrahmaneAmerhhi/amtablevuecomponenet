# am_table_vuejs_componenet

This template should help you get started with Vue 3 development as a ready-made table that offers various services and integrates easily with various projects

<!-- ![table image, table image](/src//assets/files//amtableimage.png) -->

## Demo

Discover [Demo](https://amtabledemo.netlify.app/).

## Features

- Sorting
  - Allow users to click on table headers to sort data in ascending or descending order.
- Filtering
  - Enable filtering of data based on different types, such as text, numbers, dates, etc.
  - Implement filter inputs or dropdowns for each column to allow users to enter filter criteria.
  - Apply filters dynamically as users input their criteria.
- Pagination
  - Divide the data into pages and display a set number of rows per page.
  - Provide pagination controls (e.g., previous, next, page numbers) to navigate between pages.
  - Allow users to configure the number of rows per page.
- Search
  - mplement a search input to allow users to search for data by any field.
  - Dynamically update the table to display only the rows that match the search criteria.
  - Provide options to perform case-sensitive or case-insensitive searches.
- Card View
  - Provide an option to switch between table view and card view.
  - Display relevant information in the card, including images, titles, descriptions, etc.
- Responsive Design
  - Ensure that the table or card view is responsive and adjusts to different screen sizes.
  - responsive behavior for columns, pagination, and any other relevant elements.
- Dark mode
- hide fields
  - You can hide fields as simply as possible

## Installation

Install amtablevuecomponenet with npm

```bash or terminal
  npm install am_table_vue
  npm i am_table_vue
```

## Usage/Examples

```html
<template>
  <AmhVueTable
    :data="state.data"
    :columns="state.columns"
    :config="state.config"
  >
    <!-- to render the html code -->
    <template v-slot="{ column, row }">
      <div v-if="column.title == 'Actions'">
        <button @click="add(row.name)">add</button>
      </div>
    </template>
  </AmhVueTable>
</template>
<script setup>
   import { reactive } from "vue";
  import AmhVueTable from "am_table_vue";
   // import css
   import "am_table_vue/dist/style.css";

   const state = reactive({
     data: [
       {
         name: "ahmed",
         age: 22,
         adresse:'Tamri Agadir'
         aviable: 1,
         date: new Date("12/05/2022"),
         image: "https://via.placeholder.com/640x480.png/0033aa?text=dolore",
       },
       {
         name: "hasan",
         age: 33,
         adresse:'Taghazout Agadir',
         aviable: 1,
         date: new Date("12/06/2022"),
         image: "https://via.placeholder.com/640x480.png/0033aa?text=dolore",
       },
     ],

     columns: [
       {
         title: "Name",
         field: "name",
         EnableFilter: true,
         sortable: true,
         filterOptions: {
           InputType: "text",
           placeholder: "filter By Name",
         },
       },
        {
       title: "Adresse",
       field: "adresse",
       hidden:true,
       EnableFilter: true,
       sortable: true,
       filterOptions: {
         InputType: "text",
         placeholder: "filter By Name",
       },
     },

       {
         title: "AGE",
         field: "age",
         EnableFilter: true,
         sortable: true,
         filterOptions: {
           InputType: "text",
           placeholder: "filter By age",
         },
       },
       {
         title: "Aviable",
         field: "aviable",
         EnableFilter: true,
         sortable: true,
         filterOptions: {
           InputType: "select",
           placeholder: "filter By aviablity",
           filterSelectOptions: [
             { title: "all", selected: true },
             { title: "aviable", value: "1" },
             { title: "non aviable", value: "0" },
           ],
         },
       },
       {
         title: "Date",
         field: "date",
         isDate: true,
         dateMomentFormat: "L", // use momentjs formats
         EnableFilter: true,
         filterOptions: {
           InputType: "date",
           placeholder: "filter By Date",
         },
       },
       {
         title: "Image",
         field: "image",
         Cssclass: "imageClass",
         isImage: true,
         EnableFilter: false,
       },
       {
         title: "Actions",
         isHtml: true,
         EnableFilter: false,
       },
     ],
     config: {
       EnableSearch: true,
       searchplaceholder: "Search in Table",
       EnableUseDarkMode: true,
       EnableCardsTemp: true,
       SearchInFields: ["name", "age", "date"],
       EnablePagination: true,
       PaginationConfig: {
         itemsPerPage: 3,
         CurrentPage: 1,
       },
     },
   });

   const add = (name) => {
     console.log(name);
   };
</script>
```

## Available props

| Attribute |       Type       |   Default | required |                                                                                     description                                                                                     |
| :-------- | :--------------: | --------: | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| data      | Array of objects | null , [] | true     |                                                             This attribute define the data to be displayed in the table                                                             |
| columns   | Array of objects |  null ,[] | true     | This attribute defines which columns will be displayed in the table, if you will allow fields to be filtered or sorted by this column, if you want to hide it can be specified here |
| config    |      object      |        {} | true     |                  This attribute defines table settings such as applying pagination, dark mode, and table search, as well as allowing data to be displayed as cards                  |

## Explanation of using config props

Here we define the able configuration

config: {

EnableSearch: True or False if you want to enable all table searching,

searchplaceholder: all table searching placeholder,

EnableUseDarkMode: true or false if you want to use dark mode or not,

SearchInFields: ["field1", "field2"], // Determine the fields that are used in the comprehensive search

EnableCardsTemp: true or false if you want provide an option to switch between table view and card view,

EnablePagination: true or false to enable pagination or not,

PaginationConfig: { // if pagination enbled this object for config the pagination

itemsPerPage: 3, // number of items by page

CurrentPage: 1, // start page or current page

},

},

## Explanation of using columns props

Here we define the columns

columns: [ {

title: The defined title for the column that will appear in the
table columns,

field:The field as it is in object data in order to fetch the data related to this field,

hidden:true or flase if you want to hide fields or not,

EnableFilter: true or false In order to allow table
filtering using this column ,

sortable: true or false In order to allow table
sorting using this column ,

isDate: true or false We specify if this field is for the date ,

dateMomentFormat: if this field is for the date choose the format from momentjs between 'l', 'LL', 'LLL', 'lll', 'LLLL', 'llll', 'L',

isImage: true or false We specify if this field is for the image ,

isHtml: true or false We specify if this field is for the render html code ,

filterOptions: An object with which we define filter settings
{
InputType: type of filter input text for number and string or select or date for filtring date,

filterSelectOptions: [ // if InputType is select
{ title: 'select option title', value: 'select option value' },
]

placeholder:"placeholder for filtring input element",

},

},

]

```html
<script setup>
  import { reactive } from "vue";

  const state = reactive({
    // exemple
    columns: [
      {
        title: "Name",
        field: "name",
        isImage: false,
        isHtml: false,
        isDate: false,
        EnableFilter: true,
        sortable: true,
        filterOptions: {
          InputType: "text",
          placeholder: "filter By name",
        },
      },
    ],
  });
</script>
```

## Explanation of using data props

This table contains objects that contain data that populates the table from the field specified in the column for each field

```html
<script setup>
  import { reactive } from "vue";

  const state = reactive({
    data: [
      {
        name: "ahmed",
        age: 22,
        aviable: 1,
        date: new Date("12/05/2022"),
        image: "https://via.placeholder.com/640x480.png/0033aa?text=dolore",
      },
    ],
  });
</script>
```

## hide field

```html
<template>
  <AmhVueTable
    :data="state.data"
    :columns="state.columns"
    :config="state.config"
  >
  </AmhVueTable>
</template>
<script setup>
  import { reactive } from "vue";
  import AmhVueTable from "am_table_vue";
   // import css
   import "am_table_vue/dist/style.css";

  const state = reactive({
   data: [
      {
        name: "ahmed",
        age: 22,
        aviable: 1,
        date: new Date("12/05/2022"),
        image: "https://via.placeholder.com/640x480.png/0033aa?text=dolore",
      },

    ],

    columns: [
      {
        title: "Name",
        field: "name",
        hidden:true , // to hide field name
        EnableFilter: true,
        sortable: true,
        filterOptions: {
          InputType: "text",
          placeholder: "filter By Name",
        },
      },
      {
        title: "AGE",
        field: "age",
        EnableFilter: true,
        sortable: true,
        filterOptions: {
          InputType: "text",
          placeholder: "filter By age",
        },
      },
    ]
     config: {
      EnableSearch: true,
      searchplaceholder: "Search in Table",
      EnableUseDarkMode: true,
      EnableCardsTemp: true,
      SearchInFields: ["name", "age", "date"],
      EnablePagination: true,
      PaginationConfig: {
        itemsPerPage: 3,
        CurrentPage: 1,
      },
    },
  });
</script>
```

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://main--abderrahmaneamerrhiportfoliov2.netlify.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abderrahmane-amerrhi-807b40201/)
