let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let temp;

function getTotal()
{
    if(price.value!='')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040';
    }else
    {
        total.innerHTML = '';
        total.style.backgroundColor = '#a00d02';
    }
}

let dataPro;

if(localStorage.product != null)
{
   dataPro = JSON.parse(localStorage.product);
}
else
{
 dataPro = [];
}


submit.onclick = function(){
    
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    
    if(title.value !=''&&price.value!=''&&category.value!=''&&newPro.count<100)
    {
        if(mood == 'create')
            {
                if(newPro.count > 1)
                    {
                        for(let i = 0; i< newPro.count ; i++)
                        {
                            dataPro.push(newPro);
                        }     
                    }
                    else
                    {
                        dataPro.push(newPro);
                    }
                
            }else{
                dataPro[temp] = newPro;
                mood = 'create';
                submit.innerHTML = 'Create';
                count.style.display = 'block';
            }
            clearData();
    }
    else
    {
        alert("Please fill in the blank before submitting /Check Number of Count Max 99");
    }

    localStorage.setItem('product', JSON.stringify(dataPro));
    
    
    showData();
}

function clearData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showData()
{
    getTotal();

    let table =''
    for(let i= 0; i < dataPro.length ; i++)
    { 
        table += 
        `
            <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick = "updateData(${i})" id="update">update</button></td>
                    <td><button onclick = "deleteProduct(${i})" id="delete">delete</button></td>
            </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table;
    
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0)
    {
       btnDelete.innerHTML = `
       <button onclick = "deleteAll()">Delete All(${dataPro.length})</button>
       `
    }
    else
    {
        btnDelete.innerHTML = '';
    }
}

showData();

function deleteProduct(index)
{
    let isConfirm = confirm("Are You Sure You Want To Delete this Product ? " + dataPro[index].title);

    if(isConfirm)
    {
        dataPro.splice(index,1);
        localStorage.product = JSON.stringify(dataPro);
        showData();
    }
}

function deleteAll()
{
    let isConfirm = confirm("Are You  Sure You Want To Delete All Data ?");
    if(isConfirm)
    {
        localStorage.clear();
        dataPro.splice(0);
        showData();
    }
    
}

function updateData(index)
{
     title.value = dataPro[index].title;
     price.value = dataPro[index].price;
     taxes.value = dataPro[index].taxes;
     ads.value = dataPro[index].ads;
     discount.value = dataPro[index].discount;
     category.value = dataPro[index].category;
     getTotal();
     count.style.display='none';
     mood = 'update';
     submit.innerHTML = 'Update';
     temp = index;
     scroll({
        top:0,
        behavior:"smooth"
     })
}

let searchMode = 'title';

function getSearchMood(id)
{
    let searh = document.getElementById('search')
    if(id == 'searchTitle')
    {
        searchMode = 'title';
    }else
    {
        searchMode = 'category';
    }
    searh.placeholder = 'Search By '+searchMode;
    searh.focus();
    searh.value = '';
    showData();
}

function searchData(value)
{
    let table = '';

    if(searchMode == 'title')
    {
        for(let i=0;i<dataPro.length;i++)
            {
                if(dataPro[i].title.includes(value.toLowerCase()))
                {
                    table += 
                  `
                    <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick = "updateData(${i})" id="update">update</button></td>
                            <td><button onclick = "deleteProduct(${i})" id="delete">delete</button></td>
                    </tr>
                  `
                }
            }        
    
    }
    else
    {
        for(let i=0;i<dataPro.length;i++)
            {
                if(dataPro[i].category.includes(value.toLowerCase()))
                {
                    table += 
                  `
                    <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick = "updateData(${i})" id="update">update</button></td>
                            <td><button onclick = "deleteProduct(${i})" id="delete">delete</button></td>
                    </tr>
                  `
                }
            } 
    }
        

        document.getElementById('tbody').innerHTML = table;
    
}