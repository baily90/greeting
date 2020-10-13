<template>
    <date-part showMonthLength="12" v-on:selectDate="selectDate" selectedDate="2017-09-11" :vacationArr="vacation"></date-part>
</template>

<script>
    import  datePart from '../components/datePart.vue'
    export default {
        data(){
            return {
            // vocation中必要的属性"date"，"flag"，"name"
                vacation: [
            {
                "date": "2017-09-30",
                "flag": "班",
                "name": ""
            },
            {
                "date": "2017-10-01",
                "flag": "休",
                "name": "国庆"
            },
            {
                "date": "2017-10-02",
                "flag": "休",
                "name": ""
            },
            {
                "date": "2017-10-03",
                "flag": "休",
                "name": ""
            },
            {
                "date": "2017-10-04",
                "flag": "休",
                "name": "中秋"
            },
            {
                "date": "2017-10-05",
                "flag": "休",
                "name": ""
            },
            {
                "date": "2017-10-06",
                "flag": "休",
                "name": ""
            },
            {
                "date": "2017-10-07",
                "flag": "休",
                "name": ""
            },
            {
                "date": "2017-10-08",
                "flag": "休",
                "name": ""
            }
        ],

        //价格日历必要属性"specDate"，"sellPrice"
        PriceCalendarArr: [
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-11",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-11",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-12",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-12",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-13",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-13",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-14",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-14",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-15",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-15",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-16",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-16",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-17",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-17",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-18",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-18",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-19",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-19",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-20",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-20",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-21",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-21",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-22",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-22",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-23",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-23",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-24",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-24",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-25",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-25",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-26",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-26",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-27",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-27",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-28",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-28",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-29",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-29",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-30",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-30",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-08-31",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 318800,
                "routeName": "A行程",
                "sellPrice": 3188,
                "specDate": "2017-08-31",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-01",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-09-01",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-03",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-09-03",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-05",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-09-05",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-07",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-09-07",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-09",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-09-09",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-11",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-09-11",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-13",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-09-13",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-15",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-09-15",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-17",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-09-17",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-19",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-09-19",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-21",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-09-21",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-23",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-09-23",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-25",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 448800,
                "routeName": "A行程",
                "sellPrice": 4488,
                "specDate": "2017-09-25",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-27",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 448800,
                "routeName": "A行程",
                "sellPrice": 4488,
                "specDate": "2017-09-27",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-09-29",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 448800,
                "routeName": "A行程",
                "sellPrice": 4488,
                "specDate": "2017-09-29",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-01",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 448800,
                "routeName": "A行程",
                "sellPrice": 4488,
                "specDate": "2017-10-01",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-03",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 448800,
                "routeName": "A行程",
                "sellPrice": 4488,
                "specDate": "2017-10-03",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-05",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 448800,
                "routeName": "A行程",
                "sellPrice": 4488,
                "specDate": "2017-10-05",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-07",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-10-07",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-09",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-10-09",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-11",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-10-11",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-13",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-10-13",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-15",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-10-15",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-17",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-10-17",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-19",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-10-19",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-21",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-10-21",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-23",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-10-23",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-25",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-10-25",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-27",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-10-27",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-29",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-10-29",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-10-31",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-10-31",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-01",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-01",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-03",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-03",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-05",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-05",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-07",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-07",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-09",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-09",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-11",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-11",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-13",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-13",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-15",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-15",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-17",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-17",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-19",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-19",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-21",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-21",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-23",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-23",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-25",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-25",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-27",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-27",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-11-29",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-11-29",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-01",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-01",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-03",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-03",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-05",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-05",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-07",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-07",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-09",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-09",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-11",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-11",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-13",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-13",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-15",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-15",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-17",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-17",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-19",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-19",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-21",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-21",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-23",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-23",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-25",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-25",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-27",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-27",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-29",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-29",
                "stock": -1
            },
            {
                "childOnSaleFlag": false,
                "departureDate": "2017-12-31",
                "displayType": "DISPLAY_NORMAL",
                "groupName": "LOWEST_SALED_PRICE",
                "lineRouteId": 337202,
                "lowestSaledPrice": 268800,
                "routeName": "A行程",
                "sellPrice": 2688,
                "specDate": "2017-12-31",
                "stock": -1
            }
        ]
            }
        },
        components: {
            datePart
        },
        methods: {
            selectDate(day){
                //day {date: 'yy-mm-dd',day: 'd', price: '' ...}
                console.log(day)
            }
        },
        mounted(){

        }
    }

</script>

<style scoped>


</style>
