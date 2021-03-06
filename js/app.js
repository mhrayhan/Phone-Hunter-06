/* ===========Get API By Search Text=============== */
const searchPhone = () => {
    const searchInput = document.getElementById('search-input').value;
    searchInput.value = '';
    showSpinner('block') //show spinner
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInput}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhone(data.data));
}

/*==============Display Search Result=================*/
const displayPhone = brandName => {
    //Show how many result Found
    const qtyText = document.getElementById('qty-text');
    if(brandName.length == 0){
        document.getElementById('display-phone').textContent = '';
        document.getElementById('showAll-btn').style.display = 'none';
        showSpinner('none')
        qtyText.innerText = 'No Result Found';
        qtyText.style.color = 'red';
        return false;
    }else {
        qtyText.innerText = `${brandName.length} Result Found`;
        qtyText.style.color = '#029c24';
    }

    document.getElementById('showAll-btn').style.display = 'block'; 

    const displayPhone = document.getElementById('display-phone');
    displayPhone.textContent = ''; //clear previous search result.
    brandName.slice(0, 20).forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
        <div  class="card p-3 border-0 shadow rounded">
            <img src="${phone.image}" class="card-img-top ">
            <div class="card-body ">
                <h5 class="card-title">Model: ${phone.phone_name}</h5>
                <h6 class="card-title">Brand: ${phone.brand}</h6>
                <button data-bs-toggle="modal" data-bs-target="#phoneDetails"  onclick="getApiById('${phone.slug}')" type="button" class="details-btn">Details</button>
            </div>
        </div>
        `
        displayPhone.appendChild(div);
        showSpinner('none') //hide spinner
    })
}

/* ===============Get API By phone id====================  */
const getApiById = phoneId => {
    // console.log(phoneId);
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data));
}

/* =================Display Phone Details===================== */
const displayPhoneDetails = phone => {
    console.log(phone.others);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card p-2 border-0 " id="details-card">
        <img src="${phone.image}" class="card-img-top card-img">
        <button id="close-btn" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="card-body ">
            <h5 class="card-title model"><span id="model">Model: </span>${phone.name}</h5>
            <h6 class="card-title brand"><span id="brand">Brand: </span>${phone.brand}</h6>
            <p><span id="release-date">Release Date: </span>Release Date: ${phone.releaseDate ? phone.releaseDate : 'Release Date Not Found' }</p>
            <h5 class="features">Main Features</h5>
            <p><span>Storage: </span>${phone.mainFeatures.storage}</p>
            <p><span>Display: </span>${phone.mainFeatures.displaySize}</p>
            <p><span>Chipset: </span>${phone.mainFeatures.chipSet}</p>
            <p><span>Memory: </span>${phone.mainFeatures.memory}</p>
            <p><span>Sensor: </span>${phone.mainFeatures.sensors}</p>
            <h5 class="features">Others Features</h5>
            <p><span>WLAN: </span>${phone.others?.WLAN}</p>
            <p><span>Blutooth: </span>${phone.others?.Bluetooth}</p>
            <p><span>GPS: </span>${phone.others?.GPS}</p>
            <p><span>NFC: </span>${phone.others?.NFC}</p>
            <p><span>Radio: </span>${phone.others?.Radio}</p>
            <p><span>USB: </span>${phone.others?.USB}</p>
        </div>
    </div>
    `
    phoneDetails.appendChild(div);
}


/* ==============Show spinner======================= */
const showSpinner = style =>{
  document.getElementById('spinner').style.display = style;
}
