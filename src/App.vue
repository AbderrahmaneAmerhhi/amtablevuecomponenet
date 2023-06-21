<script setup>

// import AbAm_Vue_Tabel from './components/AbAm_Vue_Tabel.vue';
import { reactive } from 'vue';
import AmhVueTable from './components/AmhVueTable.vue';

const state = reactive({
    data: [{
        name: 'ahmed',
        age: 22,
        aviable: 1,
        date: new Date('12/05/2022'),
        image: 'https://via.placeholder.com/640x480.png/0033aa?text=dolore'
    },
    {
        name: 'hasan',
        age: 33,
        aviable: 1,
        date: new Date('12/06/2022'),
        image: 'https://via.placeholder.com/640x480.png/0033aa?text=dolore'
    },
    {
        name: 'adam',
        age: 17,
        aviable: 0,
        date: new Date('12/05/2024'),
        image: 'https://via.placeholder.com/640x480.png/0033aa?text=dolore'

    }
        ,
    {
        name: 'abdo',
        age: 13,
        aviable: 0,
        date: new Date('12/05/2024')

    }
        ,
    {
        name: 'mhend',
        age: 14,
        aviable: 0,
        date: new Date('12/05/2024')

    }
        ,
    {
        name: 'samir',
        age: 30,
        aviable: 0,
        date: new Date('12/05/2024')

    }
        ,
    {
        name: 'hsen',
        age: 12,
        aviable: 0,
        date: new Date('12/05/2024')

    }
        ,
   {
        name: 'hamid',
        age: 12,
        aviable: 0,
        date: new Date('12/05/2024')

    }
        ,
    {
        name: 'marwan',
        age: 1,
        aviable: 0,
        date: new Date('12/05/2024')

    }
        ,
    {
        name: 'mostafa',
        age: 1,
        aviable: 0,
        date: new Date('12/05/2024')

    },
    ],

    columns: [

        {
            title: 'Name',
            field: 'name',
            hidden:true,
            EnableFilter: true,
            sortable: true,
            filterOptions: {
                InputType: 'text',
                placeholder: 'filter Bu Namee'
            }
        },
        {
            title: 'AGE',
            field: 'age',
            EnableFilter: true,
            sortable: true,
            filterOptions: {
                InputType: 'text',
                placeholder: 'filter By age'
            }
        },
        {
            title: 'Aviable',
            field: 'aviable',
            EnableFilter: true,
            sortable: true,
            filterOptions: {
                InputType: 'select',
                placeholder: 'filter Bu aviablity',
                filterSelectOptions: [
                    { title: 'all', selected: true },
                    { title: 'aviable', value: '1' },
                    { title: 'non aviable', value: '0' }
                ]
            }
        },
        {
            title: 'Date',
            field: 'date',
            isDate: true,
            dateMomentFormat: 'L',  // use momentjs formats
            EnableFilter: true,
            filterOptions: {
                InputType: 'date',
                placeholder: 'filter Bu Date',

            }
        },
        {
            title: 'Image',
            field: 'image',
            Cssclass: 'imageClass',
            isImage: true,
            EnableFilter: false,

        },
        {
            title: 'Actions',
            isHtml: true,
            EnableFilter: false,

        },
        {
            title: 'Actions2',
            isHtml: true,
            EnableFilter: false,

        },

    ],
    config: {
        EnableSearch: true,
        searchplaceholder: 'Search in Table',
        EnableUseDarkMode: true,
        EnableCardsTemp: true,
        SearchInFields: ['name', 'age', 'date'],
        EnablePagination: true,
        PaginationConfig: {
            itemsPerPage: 3,
            CurrentPage: 1,
        }

    }
})

</script>

<template>
    <h1>
        Hello
        <AmhVueTable :data="state.data" :columns="state.columns" :config="state.config">
            <template v-slot="{ column, row }">
                <div v-if="column.title == 'Actions'">
                    <button @click="add(row.name)"> add</button>
                </div>
            </template>
        </AmhVueTable>
    </h1>
</template>

<style scoped>
.imageClass {
    border-radius: 50%;
}
</style>
