            // Inputs
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let search = document.getElementById("search");
             //Buttons
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let submit = document.getElementById("submit");


let mood = "create";
let temp ;


// Get total

function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor="#007876"
        
    }else{
        total.style.backgroundColor="#007876"
    }

}


//Create Product
let dataProduct;

if(localStorage.product != null){
   
    dataProduct = JSON.parse(localStorage.product)

} else{
     dataProduct =[];
}
submit.onclick= function (){

    let product = {
        title : title.value,
        price :price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category:category.value
    }

    if(mood === "create")
    {
        // count 
        if(count.value > 1){
            for(let i=0; i<count.value;i++){
                dataProduct.push(product)
            }


        }else{
            dataProduct.push(product)
        }
        

    }else{
       dataProduct[temp] = product;
       mood="create"
       submit.innerHTML = "create"
       count.style.display = "block"
       
    }


    // Save localstorage
    localStorage.setItem("product",JSON.stringify(dataProduct))

    clearData()
    showData()
       
     
     }



// Clear Data
function clearData(){
    title.value =""
    price.value  =""
    taxes.value=""
    ads.value=""
    discount.value=""
    total.innerHTML=""
    count.value=""
    category.value=""
}

// Show Data

function showData(){
  
 
   
    let table =''

    for(let i=0; i < dataProduct.length ;i++){
        table +=`
        <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].count}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updatedata(${i})">update</button></td>
            <td><button onclick="DeleteData(${i})">delete</button></td>
        </tr>
        
        `

    }
   
    document.getElementById("tableBody").innerHTML = table;

    // Delete All Data
    let btnDelete = document.getElementById("delAll");
    if(dataProduct.length > 0){
        btnDelete.innerHTML = `<button onclick="DeleteAll()"> Delete All (${dataProduct.length})</button>  `

    }else{
        btnDelete.innerHTML = ""
    }

    getTotal()
}

showData()

// Delete Data

function DeleteData(index){
    dataProduct.splice(index,1);
    localStorage.product = JSON.stringify(dataProduct);

    showData()

}
// DeleteAll 
function DeleteAll(){
    localStorage.clear();
    dataProduct.splice(0)
    showData();
}


// Update Data
function updatedata(index){
    title.value = dataProduct[index].title
    price.value = dataProduct[index].price
    taxes.value = dataProduct[index].taxes
    ads.value = dataProduct[index].ads
    discount.value = dataProduct[index].discount
    getTotal()
    category.value = dataProduct[index].category
    count.style.display="none"
    submit.innerHTML = "Update"
    mood ="update"
    temp = index;
    scroll({
        top:0,
        behavior:"smooth"
    })
}


// Search Data 
let searchMood = "title"

function getSearchMood(id){
   if(id =="searchTitle"){
    searchMood = "title"
    search.placeholder="Search by Title"
   }else{
    searchMood = "category"
    search.placeholder="Search by Category "
   }

   search.focus()
 
}




