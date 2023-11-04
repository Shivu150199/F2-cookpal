const data = [
    {
        "name": "Veggie Delight",
        "imageSrc": "https://source.unsplash.com/random?veggies",
        "time": "30 min",
        "type": "veg",
        "isLiked": false,
        "rating": 4.2
    },
    {
        "name": "Chicken Grill",
        "imageSrc": "https://source.unsplash.com/random?chicken",
        "time": "45 min",
        "type": "non-veg",
        "isLiked": false,
        "rating": 4.5
    },
    {
        "name": "Cheese Pizza",
        "imageSrc": "https://source.unsplash.com/random?pizza",
        "time": "40 min",
        "type": "veg",
        "isLiked": false,
        "rating": 4.1
    },
    {
        "name": "Steak",
        "imageSrc": "https://source.unsplash.com/random?steak",
        "time": "60 min",
        "type": "non-veg",
        "isLiked": false,
        "rating": 4.7
    },
    {
        "name": "Grilled Salmon",
        "imageSrc": "https://source.unsplash.com/random?salmon",
        "time": "50 min",
        "type": "non-veg",
        "isLiked": false,
        "rating": 4.6
    },
    {
        "name": "Tomato Pasta",
        "imageSrc": "https://source.unsplash.com/random?pasta",
        "time": "35 min",
        "type": "veg",
        "isLiked": false,
        "rating": 4.0
    },
    {
        "name": "Vegan Salad",
        "imageSrc": "https://source.unsplash.com/random?salad",
        "time": "20 min",
        "type": "veg",
        "isLiked": false,
        "rating": 3.9
    },
    {
        "name": "Fried Chicken",
        "imageSrc": "https://source.unsplash.com/random?friedChicken",
        "time": "55 min",
        "type": "non-veg",
        "isLiked": false,
        "rating": 4.3
    },
    {
        "name": "Mushroom Risotto",
        "imageSrc": "https://source.unsplash.com/random?risotto",
        "time": "45 min",
        "type": "veg",
        "isLiked": false,
        "rating": 4.5
    },
    {
        "name": "Burger",
        "imageSrc": "https://source.unsplash.com/random?burger",
        "time": "30 min",
        "type": "non-veg",
        "isLiked": false,
        "rating": 4.2
    },
    {
        "name": "Paneer Tikka",
        "imageSrc": "https://source.unsplash.com/random?paneerTikka",
        "time": "40 min",
        "type": "veg",
        "isLiked": false,
        "rating": 4.4
    },
    {
        "name": "BBQ Ribs",
        "imageSrc": "https://source.unsplash.com/random?ribs",
        "time": "70 min",
        "type": "non-veg",
        "isLiked": false,
        "rating": 4.6
    },
    {
        "name": "Caesar Salad",
        "imageSrc": "https://source.unsplash.com/random?caesarSalad",
        "time": "25 min",
        "type": "veg",
        "isLiked": false,
        "rating": 3.8
    },
    {
        "name": "Fish Tacos",
        "imageSrc": "https://source.unsplash.com/random?fishTacos",
        "time": "35 min",
        "type": "non-veg",
        "isLiked": false,
        "rating": 4.3
    },
    {
        "name": "Chocolate Cake",
        "imageSrc": "https://source.unsplash.com/random?chocolateCake",
        "time": "90 min",
        "type": "veg",
        "isLiked": false,
        "rating": 4.9
    }
]

let search = '';
let rating = '';
let foodType = '';


let currentData;


function filterData(){
    currentData = data.filter((e) => {
        let flag1 = !search || e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
        let flag2 = !rating || (rating == "Below 4" ? e.rating < 4 : e.rating >= 4);
        let flag3 = !foodType || e.type == foodType;
        return flag1 && flag2 && flag3;
    });
}

function reflectData() {
    let noResult = document.querySelector('.no-result');
    noResult.classList.add('d-none');
    if(currentData.length == 0){
        noResult.classList.remove('d-none');
    }

    let productBox = document.querySelector('.product-box');

    document.querySelectorAll('.card').forEach(e => e.remove());

    currentData.forEach((e) => {
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <img src="${e.imageSrc}" alt="card...">
        <div class="type">${e.type === 'veg'? "Veg":"Non Veg"}</div>
        <div class="title-box">
            <h3 class="title">${e.name}</h3>
            <div class="rating-box">
                <img src="./image/rating.png" alt="rating...">
                <p class="rating">${e.rating}</p>
            </div>
        </div>
        <div class="card-foot">
            <h5 class="time">${e.time}</h5>
            <div class="react-box">
                <img src="${e.isLiked?'./image/liked.png':'./image/like.png'}" alt="" class="like">
                <img src="./image/comment.png" alt="">
            </div>
        </div>
        `;
        card.querySelector('.like').addEventListener('click', toggleLike);
        function toggleLike(){
            e.isLiked = !e.isLiked;
            reflectData();
        }
        productBox.append(card);
    })
}

filterData();
reflectData();


document.querySelectorAll('.filter-btn').forEach((e) => {
    e.addEventListener('click', () => {
        foodType = e.classList[1] == 'all' ? '' : e.classList[1];
        filterData(search, rating, foodType);
        reflectData();
    })
})

document.querySelector('.search-ip').addEventListener('input', (event) => {
    search = event.target.value;
    filterData(search, rating, foodType);
    reflectData();
})

document.querySelector('.search-btn').addEventListener('click', (event) => {
    search = document.querySelector('.search-ip').value;
    filterData(search, rating, foodType);
    reflectData();
})

document.querySelectorAll('input[name="rate"]').forEach(e => {
    e.addEventListener('input', () => {
        let arr = [];
        document.querySelectorAll('input[name="rate"]:checked').forEach(e =>{
            arr.push(e.value);
        })
        if(arr.length != 0 && arr.length != 2){
            rating = arr[0];
        }
        else{
            rating = '';
        }
        filterData(search, rating, foodType);
        reflectData();
    })
})



// navbar-special
let toggleElement = document.querySelector('.toggle-box');
document.querySelector('.toggle-menu').addEventListener('click', () => {
    toggleElement.classList.remove('toggle-class');
})

toggleElement.addEventListener('click', () => {
    if(!(toggleElement.className.includes('toggle-calss'))){
        toggleElement.classList.add('toggle-class');
    }
})

document.querySelectorAll('.toggle-box>*').forEach((e) => {
    e.addEventListener('click', (event) => {
        event.stopPropagation();
    })
})