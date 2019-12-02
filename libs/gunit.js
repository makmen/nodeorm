var TSC = require('../Models/tsc');
var _ = require('lodash');

var GUnit = function() {


};

GUnit.testFunc = async function() {
    var a = Math.random()*1000;
    a = a.toString();
    var promise = new Promise(function(resolve, reject){
        resolve('45')

    });

    let result = await promise.then(res => {
        console.log('Inside then', res);
        return res;
    }).catch(e => {
        console.log(e);
    })

    console.log('______')
    console.log(result)
    console.log('______')

    return result;

    promise.then(
        function(result) {
            /!* обработает успешное выполнение *!/
            console.log(111);
            return result;
            },
        function(error) {
            /!* обработает ошибку *!/
            console.log(222);
            return error;
        }
    );
    console.log(333);

    return a;
};


GUnit.union = function(itemsFirst, itemsSecond, separator = 'S') {
    return _.uniqBy( _.union(itemsFirst, itemsSecond), separator);
};

GUnit.difference = function(itemsFirst, itemsSecond, separator = 'S') {
    return _.differenceBy( itemsFirst, itemsSecond, separator);
};

GUnit.intersect = function(itemsFirst, itemsSecond, separator = 'S') {
    return _.intersectionBy( itemsFirst, itemsSecond, separator);
};

GUnit.getIds = function(items) {
    let ids = [];
    items.forEach(function(item){
        ids.push(item.id);
    });

    return ids;
};

GUnit.getParent = function() {
    console.log('getParent...');
};

GUnit.getChildren = function(Tu, Su, T) {

    return TSC.where({Tu: Tu, Su: Su, T: T });

    async function getItems() {
        return await TSC.where({Tu: Tu, Su: Su, T: T });
    }

    return getItems;



    // let getItems = new Promise(function(resolve, reject){
    //     let items = TSC.where({Tu: Tu, Su: Su, T: T });
    //     resolve(items);
    // }).then(function (items) {
    //     return { error: false, items:items}
    // }).catch(function (error) {
    //     return { error: true, message: err}
    // });
    //
    // Promise.all([getItems]).then(
    //     function(items) {
    //         /* обработает успешное выполнение */
    //         console.log(11)
    //         return { error: false, items: items}
    //     },
    //     function(error) {
    //         /* обработает ошибку */
    //         console.log(22)
    //         return { error: true, message: error}
    //     }
    // );
    //
    // console.log(333)

    //
    // let getItems = async () => {
    //     let items = await TSC.where({Tu: Tu, Su: Su, T: T });
    //
    //     return items;
    // };

    // async function getItems() {
    //     return await TSC.where({Tu: Tu, Su: Su, T: T });
    // }
    //
    // async function getItems2() {
    //     return await 'dsdsd';
    // }
    //
    // var result = {};
    // console.log('getChildren...');
    // getItems().then(items => {
    //     result = { error: false, items:items };
    // }).catch(err => {
    //     result =  { error: true, message: err}
    // });
    //
    // Promise.all([getItems, getItems2]).then(
    //     function(result) {
    //         /* обработает успешное выполнение */
    //         console.log(result);
    //         },
    //     function(error) {
    //         /* обработает ошибку */
    //         console.log(error);
    //     }
    // );
    //
    // console.log(111111111111111)

};


module.exports = GUnit;
