<template>
  <div class="data-container">
    <div class="filter-section">
      <div class="theme_filter">
        <button v-if="state.config.EnableUseDarkMode" @click="changeTheme()" class="ChThembtn">
          <svg xmlns="http://www.w3.org/2000/svg" class="changeThemicon" width="16" height="16" viewBox="0 0 24 24"
            style="transform: ;msFilter:;">
            <path
              d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z">
            </path>
          </svg>
        </button>
        <div class="input-group-search" v-if="state.config.EnableSearch">
          <svg xmlns="http://www.w3.org/2000/svg" class="searchicon" width="12" height="12" viewBox="0 0 24 24"
            style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
            <path
              d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z">
            </path>
          </svg>
          <input v-model="SearchString"
            :placeholder="state.config.searchplaceholder ? state.config.searchplaceholder : ''" @keyup="search"
            type="search" class="search_input" name="search_str" id="searchinput">
        </div>
      </div>


      <div class="filter-buttons" v-if="state.config.EnableCardsTemp">
        <button @click="chageFetchingFormate('cards')" class="content-array">
          <svg xmlns="http://www.w3.org/2000/svg" class="datatypeicon" width="16" height="16" viewBox="0 0 24 24"
            style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
            <path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z"></path>
          </svg>
        </button>
        <button @click="chageFetchingFormate('List')" class="content-cards">
          <svg xmlns="http://www.w3.org/2000/svg" class="datatypeicon" width="16" height="16" viewBox="0 0 24 24"
            style="transform: ;msFilter:;">
            <path
              d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z">
            </path>
          </svg>
        </button>
      </div>

    </div>
    <div class="table-responsive" id="content_table" v-if="FetchSeFormList">
      <table>
        <thead>
          <tr>
            <th v-show="state.config.EnableselectOptions == true"></th>
            <th v-show="!column.hidden" v-for="(column, index) in state.columns" :key="index"  >
              <span >
                 <p>{{ column.title }}</p>
                <a v-if="column.sortable" @click="sort(column.field)" href="#" class="sort">
                 <svg xmlns="http://www.w3.org/2000/svg" class="sortIcon" width="13" height="13" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M7 20h2V8h3L8 4 4 8h3zm13-4h-3V4h-2v12h-3l4 4z"></path></svg>
                </a>
              </span>
            </th>

          </tr>
          <tr class="filter-row">
            <th v-show="state.config.EnableselectOptions == true">
                <input type="checkbox"  @change="OptionChecked('', 'CheckAll')" class="checkinput"   />

            </th>
            <th v-show="!column.hidden" v-for="(column, index) in state.columns" :key="index">
              <input v-if="column.EnableFilter == true && column.filterOptions.InputType == 'text'"
                v-model="state.filterStrings[column.field]" @keyup="filter(column.field)"
                :placeholder="column.filterOptions.placeholder ? column.filterOptions.placeholder : ''" type="search"
                class="filter-element" />
              <div v-else-if="column.EnableFilter == true && column.filterOptions.InputType == 'date'"
                class="date-filter-container">
                <flat-pickr :placeholder="column.filterOptions.placeholder ? column.filterOptions.placeholder : ''"
                  v-model="state.filterStrings[column.field]" @on-change="filter(column.field)"
                  @on-close="clearDate(column.field)" :config="config" class="filter-element filter-date" />
                <button class="clear-date" @click="clearDate(column.field)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="clearIcon" width="12" height="12" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                </button>
              </div>
              <select v-else-if="column.EnableFilter == true && column.filterOptions.InputType == 'select'"
                v-model="state.filterStrings[column.field]" @change="filter(column.field)" class="filter-element">
                <option v-for="(option, index) in column.filterOptions.filterSelectOptions" :key="index"
                  :value="option.value ? option.value : ''" :selected="option.selected == true ? true : false">{{
                    option.title }}</option>

              </select>

            </th>


          </tr>
        </thead>
        <tbody>

          <tr v-for="(item, index) in state.data" :key="index">
            <td v-show="state.config.EnableselectOptions == true">
               <input type="checkbox" v-model="CheckedOptions.IndexSelected[index]" @change="OptionChecked(item,index)" class="checkinput checkOne"   />
            </td>
            <td v-show="!column.hidden" v-for="(column, columnindex) in state.columns" :key="columnindex">
              <img v-if="column.isImage" :src="item[column.field]" :alt="item[column.field] + ' image'" width="30"
                height="30" :class="column.Cssclass ? column.Cssclass : ''">
              <div v-else-if="column.isHtml">
                <!-- The slot will render the HTML code received from the parent component -->
                <slot :column="column" :row="item"></slot>
              </div>
              <span v-else :class="column.Cssclass ? column.Cssclass : ''">{{ item[column.field] }}</span>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-responsive" id="content_cards" v-else-if="state.config.EnableCardsTemp">
      <div class="card-conetnt " v-for="(item, index) in state.data" :key="index">
        <div v-for="(column, columnindex) in state.columns" :key="index">
          <img v-if="column.isImage" :src="item[column.field]" :alt="item[column.field] + ' image'"
            :class="column.Cssclass ? column.Cssclass + ' vh-img' : 'vh-img'">
        </div>
        <div class="vh-infos">
          <div v-for="(column, columnindex) in state.columns" :key="index">
            <div v-if="!column.isImage && !column.isHtml">
              <span class="vh-info">
                <span class="info-title">{{ column.title }} : </span> <span class="info">{{
                  item[column.field] }}</span>
              </span>
            </div>
          </div>
        </div>

        <div>
            <div v-for="(column, columnindex) in state.columns" :key="index">
              <div  class="vh-actions" v-if="column.isHtml">
               <span class="info-title">{{ column.title }} : </span> 
                   <slot :column="column" :row="item"></slot>                
              </div>
            </div>
          </div>


      </div>
    </div>

    <!-- paginate  -->
    <nav v-if="state.config.EnablePagination">
      <ul class="pagination_section">
        <li class="page-item">
          <button class="page-link next-prev" @click="Paginate('prev')" :disabled="state.PaginationData.currentPage === 1"
            rel="prev" aria-label="« Previous">‹</button>
        </li>
        <li class="page-item" v-for="pagenumber in   state.PaginationData.pageNumbers" :key="pagenumber">
          <button :class="pagenumber == state.PaginationData.currentPage ? 'page-link active' : 'page-link '"
            @click="Paginate(pagenumber)">{{ pagenumber }}</button>
        </li>
        <li class="page-item">
          <button class="page-link next-prev" @click="Paginate('next')"
            :disabled="state.PaginationData.currentPage === state.PaginationData.totalPages" rel="next"
            aria-label="Next »">›</button>
        </li>
      </ul>
    </nav>

  </div>
</template>

<script setup>
import '../assets/main.css';
import { onMounted, reactive, ref, defineEmits  } from 'vue';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import moment from 'moment';

const FetchSeFormList = ref(true);



// flatpicler config
const config = reactive({
  mode: "range",
  dateFormat: "Y-m-d",
});
const state = reactive({
  possibleDatesFormat: {
    formats: [
      'L',
      'l',
      'LL',
      'LLL',
      'lll',
      'LLLL',
      'llll',
    ]
  },
  IsRowSelected:false,
  dateIsValidFilterFormat: false,
  data: props.data,
  columns: props.columns,
  config: props.config,
  filterStrings: {},
  PaginationData: {
    currentPage: props.config.PaginationConfig ? props.config.PaginationConfig.CurrentPage : 1,
    itemsPerPage: props.config.PaginationConfig ? props.config.PaginationConfig.itemsPerPage : 5,
    totalPages: null,
    pageNumbers: []
  }
})
const props = defineProps({
  data: { type: Object, required: true },
  columns: { type: Object, required: true },
  config: { type: Object, required: false }
})
const chageFetchingFormate = (type) => {
  if (type === 'List') {
    FetchSeFormList.value = false;
  } else {
    FetchSeFormList.value = true;
  }
}



const key = ref('');
const sortType = ref('asc');
const sort = (sortKey) => {
  key.value = sortKey;

  if (key.value && sortType.value == 'asc') {
    sortType.value = 'desc';
    return state.data = state.data.sort((a, b) => {
      if (typeof (a[key.value]) == 'string' && typeof (b[key.value]) == 'string') {
        const dataA = a[key.value].toLowerCase();
        const dataB = b[key.value].toLowerCase();
        if (dataA < dataB) {
          return -1; // a should come before b
        }
        if (dataB > dataA) {
          return 1; // b should come before a
        }
        return 1; // a and b are equal in terms of sorting 3tini 1 lihowa asc
      } else {
        return b[key.value] - a[key.value]
      }
    })
  } else if (key.value && sortType.value == 'desc') {
    sortType.value = 'asc';
    return state.data = state.data.sort((a, b) => {
      if (typeof (a[key.value]) == 'string' && typeof (b[key.value]) == 'string') {
        const dataA = a[key.value].toLowerCase();
        const dataB = b[key.value].toLowerCase();
        //    return 1
        if (dataA < dataB) {
          return -1; // a should come before b
        }
        if (dataB > dataA) {
          return 1; // b should come before a
        }
        return -1; // a and b are equal in terms of sorting 3tini -1 lihowa desc
      } else {
        return a[key.value] - b[key.value]

      }
    })
  }
  else {
    sortType.value = 'asc';
    return state.data
  }
}
const SearchString = ref('');

// Search in all field of table of object string or numbers
const search = () => {
  state.data = props.data;
  if (SearchString.value !== '') {
    return state.data = state.data.filter((item, index) => {
      for (var i = 0; i < state.config.SearchInFields.length; i++) {
        if (
          (typeof item[state.config.SearchInFields[i]] === 'string' || typeof item[state.config.SearchInFields[i]] === 'number') &&
          String(item[state.config.SearchInFields[i]]).toLowerCase().includes(SearchString.value.toLowerCase())) {
          return true;
        }
      }
    })
  } else {
    Paginate(1)

  }
}

const clearDate = (key) => {
  state.filterStrings[key] = '';
  filter(key)
}

// function to validae date
const momentJsFormatValidator = (dateToValidate) => {
  state.possibleDatesFormat.formats.map(format => {
    const momentDate = moment(dateToValidate, format, true); // The third parameter 'true' enables strict parsing
    if (momentDate.isValid()) {
      state.dateIsValidFilterFormat = true;
      return;
    }
    return false;
  })
}
const filter = (key) => {

  state.data = props.data;
  if (key !== '' && state.filterStrings[key] !== '') {

    return state.data = state.data.filter((item, index) => {
      // filter dates
      momentJsFormatValidator(item[key])
      if (state.dateIsValidFilterFormat) {// check if is a date

        if (state.filterStrings[key] !== '') {
          let dates = state.filterStrings[key].split('to')
          if (dates.length == 2) {
            state.dateIsValidFilterFormat = false;
            const Startdate = new Date(dates[0]);
            const EndDate = new Date(dates[1]);
            return new Date(item[key]) >= Startdate && new Date(item[key]) <= EndDate
          }
        } else {
          if (state.config.EnablePagination) {
            state.PaginationData.totalPages = Math.ceil(state.data.length / state.PaginationData.itemsPerPage)
            state.PaginationData.pageNumbers = [];
            for (var i = 1; i <= state.PaginationData.totalPages; i++) {
              state.PaginationData.pageNumbers.push(i)
            }
            state.PaginationData.currentPage = 1;
            const startIndex = (state.PaginationData.currentPage - 1) * state.PaginationData.itemsPerPage;
            const endIndex = startIndex + state.PaginationData.itemsPerPage;
            return index >= startIndex && index < endIndex
          } else {
            state.dateIsValidFilterFormat = false;
            return item
          }
        }
      }// filter numbers
      else if (typeof (item[key]) == 'number') {
        return item[key].toString().includes(state.filterStrings[key])

      }// filter strings
      else if (typeof (item[key]) == 'string') {
        return item[key].toLowerCase().includes(state.filterStrings[key].toLowerCase())
      }
    })
  } else {
    Paginate(1)
  }

}

// Pagination



const Paginate = (type) => {
  state.data = props.data;
  if (state.config.EnablePagination) {
    state.PaginationData.totalPages = Math.ceil(state.data.length / state.PaginationData.itemsPerPage)
    if (typeof (type) == 'string' && type == 'next') {
      if (state.PaginationData.currentPage < state.PaginationData.totalPages) {
        state.PaginationData.currentPage += 1;
      }
    } else if (typeof (type) == 'string' && type == 'prev') {
      if (state.PaginationData.currentPage > 1) {
        state.PaginationData.currentPage--;
      }
    } else if (typeof (type) == 'number') {
      state.PaginationData.currentPage = type
    }
    state.PaginationData.pageNumbers = [];
    for (var i = 1; i <= state.PaginationData.totalPages; i++) {
      // pageNumbers
      state.PaginationData.pageNumbers.push(i)
    }
    const startIndex = (state.PaginationData.currentPage - 1) * state.PaginationData.itemsPerPage;
    const endIndex = startIndex + state.PaginationData.itemsPerPage;
    return state.data = state.data.slice(startIndex, endIndex);
  } else {
    state.data = props.data;
  }
}

// change them
const changeTheme = () => {
  const contentContainer = document.querySelector('.data-container');

  const ThemIcon = document.querySelector('.changeThemicon')
  if (contentContainer.classList.length) {
    contentContainer.classList.forEach(element => {
      if (element == 'dark_mode') {
        contentContainer.classList.remove('dark_mode')
        console.log(ThemIcon.innerHTML)
        ThemIcon.innerHTML = '<path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"></path>'
      } else {
        contentContainer.classList.add('dark_mode')
        console.log(ThemIcon.innerHTML)
         ThemIcon.innerHTML = '  <path d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759 4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"></path>'


      }
    });
  } else {
    body.classList.add('dark_mode')
    ThemIcon.classList.remove('fa-moon')
    ThemIcon.classList.toggle('fa-sun')
  }
}

// option chekced 

const emit  = defineEmits(['SelectedRows-Changed']);
const CheckedOptions = reactive({
  SelectedRows :[

  ],
  IndexSelected: {},
})
const OptionChecked = (item, index) => { 
  if (index == 'CheckAll') {
    var inputsCheck = document.querySelectorAll('.checkinput.checkOne');
    inputsCheck.forEach((element,ind) => {
      if (element.checked == true) {
          delete CheckedOptions.SelectedRows[ind];
          element.checked = false;
      } else { 
        element.checked = true;
         CheckedOptions.SelectedRows[ind] = state.data[ind];
      }
    })
  } else {
    if (CheckedOptions.IndexSelected[index]) { // ila kan true donc mchecke kan false donc check is false
      CheckedOptions.SelectedRows[index] = item;
    } else {
      delete CheckedOptions.SelectedRows[index]; // delete for delete in object
    }
  }
    emit('SelectedRows-Changed', CheckedOptions.SelectedRows)
}
onMounted(() => {
  console.log('ABDERRAMANE AMERRHI Table Component With VUEJS  Mounted YOU ARE WELCOME ')
  state.columns.map((elem,index) => {
 
    state.data.map(item => {
      if (elem.isDate == true) {
        item[elem.field] = moment(item[elem.field]).format(elem.dateMomentFormat);
      }
    })
  })
  Paginate();
})

</script>


