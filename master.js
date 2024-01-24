//fun get total ✅
//fun create product ✅
//fun save data in local storage ✅
//fun clear input after create ✅
//fun read ✅
//fun count in  same time ✅
//fun delete , update , search ✅
//enter clean data ✅


let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let search = document.getElementById('search');
let deleteBtn = document.getElementById('deleteAll');
let form = document.getElementById('form');



let mood = 'create';
let tmp;


//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040';
    } else {
        total.innerHTML = '';
        total.style.backgroundColor='darkred'
    }
    
}

//fun create product
let dataPro = (localStorage.product ? JSON.parse(localStorage.product) : []);
    
     

submit.onclick = () => {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        total:total.innerHTML,
        category: category.value.toLowerCase()
    }

    //fun count in  same time
    if (title.value != ''  && price.value != 0   && category.value != ''  && newPro.count < 100) {
        if (mood = 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro)
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block'
        }
        clear();
    }
   
    //fun save data in local storage
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

//fun clear after create
clear = () => {
    title.value = '';
    price.value = '';
    taxes.value = '';
    discount.value = '';
    ads.value = '';
    count.value = 1;
    category.value = '';
    total.innerHTML = '00';
}

//fun read
showData = () => {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table +=
            `<tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick='updateData(${i})' id="update">update</button></td>
        <td><button onclick='deleteItem(${i})' id="delete">delete</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    if (dataPro.length > 0) {
        deleteBtn.innerHTML = `<button onclick='deleteAll()'>Delete All ${dataPro.length}</button> `
    } else {
        deleteBtn.innerHTML = ``;
    }
}
showData();

title.addEventListener('input', (event) => {
    event.preventDefault();
    if (/[0-9]/.test(title.value) || title.value.trim() =='') {
        alert('Enter Text in the Title متبقاش رخم')
    }
});
category.addEventListener('input', (event) => {
    event.preventDefault();
    if (/[0-9]/.test(category.value) || category.value.trim() =='') {
        alert('Enter Text in the Title متبقاش رخم')
    }
});


//OTHER WAY⬆️
// title.addEventListener('input', function() {
//   if (/^\d+$/.test(this.value)) {                   //  '^\d+$'
//     alert('Please enter text in the Title field');
//     this.value = '';
//   } else {
//     this.value = this.value.replace(/\d/g, '');
//     }
// });

//fun delete
deleteItem = (i) => {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

deleteAll = () => {
    alert("all data deleted")
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

//update
updateData = (i) => {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Updated'
    mood = 'update'
    tmp = i;
    scroll({
        top: 0,
        behavior:"smooth"
    })
}


// search
let searchMood = 'title';
getSearchMood = (id) => {
    if (id == 'searchTitle') { 
        searchMood = 'title'
    } else {
        searchMood = 'category'
    }
    search.placeholder = `Search by ${searchMood}`;
    search.focus();
    search.value = '';
    showData();
};

searchData = (value) => {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table +=
                    `<tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">update</button></td>
                    <td><button onclick='deleteItem(${i})' id="delete">delete</button></td>
                </tr>`
            }
 
        } else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table +=
                    `<tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">update</button></td>
                    <td><button onclick='deleteItem(${i})' id="delete">delete</button></td>
                </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}