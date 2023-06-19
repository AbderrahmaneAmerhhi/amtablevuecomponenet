# amtablevuecomponenet

This template should help you get started with Vue 3 development as a ready-made table that offers various services and integrates easily with various projects

![table image, table image](/src//assets/files//amtableimage.png)

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

## Installation

Install amtablevuecomponenet with npm

```bash or terminal
  npm install amtablevuecomponenet
  npm i amtablevuecomponenet
```

## Usage/Examples

```html
<template>
  <AmhVueTable
    :data="state.data"
    :columns="state.columns"
    :config="state.config"
  >
    <template v-slot="{ column, row }">
      <div v-if="column.title == 'Actions'">
        <button @click="add(row.name)">add</button>
      </div>
    </template>
  </AmhVueTable>
</template>
<script setup>
  // import AbAm_Vue_Tabel from './components/AbAm_Vue_Tabel.vue';
  import { reactive } from "vue";
  import AmhVueTable from "amtablevuecomponenet";
  // import css
  import "amtablevuecomponenet/dist/style.css";

  const state = reactive({
    htmlCode: "<p>This is some HTML code</p>",
    data: [
      {
        name: "ahmed",
        age: 22,
        aviable: 1,
        date: new Date("12/05/2022"),
        image: "https://via.placeholder.com/640x480.png/0033aa?text=dolore",
      },
      {
        name: "hasan",
        age: 33,
        aviable: 1,
        date: new Date("12/06/2022"),
        image: "https://via.placeholder.com/640x480.png/0033aa?text=dolore",
      },
      {
        name: "adam",
        age: 17,
        aviable: 0,
        date: new Date("12/05/2024"),
        image: "https://via.placeholder.com/640x480.png/0033aa?text=dolore",
      },
      {
        name: "abdo",
        age: 13,
        aviable: 0,
        date: new Date("12/05/2024"),
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
          placeholder: "filter Bu Namee",
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
          placeholder: "filter Bu aviablity",
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
          placeholder: "filter Bu Date",
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
</script>
```
