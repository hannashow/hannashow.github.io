let shopData = {}
let selectedModel, selectedColor, selectedStorage

window.onload = function () {
    //TODO: 取得商店列表並渲染成商店分類清單
    // use fetch()......
    fetch('./data/shop-category.json')
        .then(response => response.json())
        .then(data => {
            renderingCategory(data);
            return fetchMerchandise(data[0].dataUrl)
        })
        .then(shop => {
            renderingShop(shop)
        })
    //TODO: 取得預設的商品並渲染出來(第一筆資料)
}

/**
 * 取得商店商品資料
 * @param {String} url 
 * @returns {Promise} Merchandise
 */
function fetchMerchandise(url) {
    return fetch(url)
        .then(response => response.json())
    //回傳json格式的response物件
}

/**
 * 渲染商店內分類列表
 * @param {Array} categoryArray 
 */
function renderingCategory(categoryArray) {
    const ul = document.getElementById('category_list');
    // categoryArray.forEach(item=>{
    //     ul.innerHTML+=`<li class="nav-item">
    //     <a class="nav-link" aria-current="page" href="#">${item.title}</a>
    // </li>`
    // })
    categoryArray.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('nav-item');

        const button = document.createElement('button');
        button.classList.add('nav-link');
        button.setAttribute('aria-current', 'page')
        button.textContent = item.title
        //TODO: Click事件:點擊之後要切換商品內容
        button.onlick = function () {
            fetchMerchandise(item.dataUrl)
                .then(data => {
                    console.log(data);
                })
        }

        // button.onclick=async function(){
        //     const data=await fetchMerchandise(item.dataUrl)
        //     console.log(data)
        // }

        li.append(button);
        ul.append(li);
    })



}


/**
 * 渲染商店內商品
 * @param {*} shop 
 */
function renderingShop(merchandise) {
    console.log(merchandise)
    //TODO: 計算最少需多少$   把資料取出來找最小值
    const priceList = merchandise.specifications.map(spec => spec.price);
    console.log(priceList);
    const minPrice = Math.min(...priceList)
    console.log(minPrice);
    //TODO: 產出標題區塊
    createTitleArea(merchandise.title, minPrice)
    //TODO: 產出主圖區塊
    const defaultImgs=merchandise.images
    createCarousel()

    //TODO: 商品客製化選擇組件
    let widgetHTML = ''
    merchandise.widgets.forEach(widget => {
        widgetHTML += createWidgetHTML(widget)
    })

    document.querySelector('.spec-widget').innerHTML = widgetHTML

    document.querySelector('.qna-area').classList.remove('d-none')
    document.querySelector('footer').classList.remove('d-none')
}

/**
 * 產出商品標題區塊
 * @param {String} title 
 * @param {Number} price 
 */
function createTitleArea(title, price) {
    const titleArea = document.querySelector('.title-area')
    //TODO: 加入h1及金額 NT$ xxx起
    titleArea.innerHTML = `    
    <h1>${title}</h1>
<div class="total-price">
    NT$ ${price.toLocaleString()} 起
</div>`

}

/**
 * 產出主圖區塊Carousel
 * @param {String[]} images 
 */
function createCarousel(images) {
    const mainImgArea = document.querySelector('.main-img-area')
    //TODO:
    const carouselIndicatorsHTML = createCarouselIndicatorsHTML(images)
    //TODO:
    const carouselInnerHTML = createCarouselHTML(images)

    //TODO: 整體幻燈片HTML
    mainImgArea.innerHTML = `<div id="carouselExampleAutoplaying" class="carousel slide  sticky-top" data-bs-ride="carousel">
    <div class="carousel-indicators">
        ${carouselIndicatorsHTML}
    </div>
    <div class="carousel-inner">
        ${carouselInnerHTML}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>`
}

/**
 * 幻燈片指標區塊
 * @param {String[]} images 
 * @returns Indicators Area HTML
 */
function createCarouselIndicatorsHTML(images) {



    
    //     let html = `<button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0"
    //     class="active" aria-current="true" aria-label="Slide 1"></button>
    // <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1"
    //     aria-label="Slide 2"></button>
    // <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2"
    //     aria-label="Slide 3"></button>`
    let html = ''
    //TODO: 產生指標
    images.forEach((img,idx)=>{
        html+=`<button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`
    })

    return html
}

/**
 * 幻燈片主圖區區塊
 * @param {String[]} images 
 * @returns Carousel Img Area HTML
 */
function createCarouselHTML(images) {
    //     let html = `<div class="carousel-item active">
    //     <img src="./images/iphone-14-pro/iphone-14-pro-finish-select-202209-6-1inch-deeppurple.jpeg"
    //         class="d-block w-100" alt="...">
    // </div>
    // <div class="carousel-item">
    //     <img src="./images/iphone-14-pro/iphone-14-pro-finish-select-202209-6-1inch-deeppurple_AV1.jpeg"
    //         class="d-block w-100" alt="...">
    // </div>
    // <div class="carousel-item">
    //     <img src="./images/iphone-14-pro/iphone-14-pro-finish-select-202209-6-1inch-deeppurple_AV2.jpeg"
    //         class="d-block w-100" alt="...">
    // </div>`
    let html = ''
    //TODO: 產生主圖

    return html
}

/**
 * 產出商品客製化規格區塊
 * @param {Object} widget 商品客製化區塊物件
 * @returns Widget區塊HTML
 */
function createWidgetHTML(widget) {

    //TODO: 取得該區塊所有的項目
    const items = getWidgetItem(widget.type)

    //TODO: 產出區塊內所有的item的innerHTML
    let itemHTML = ''


    //

    let html = `
    <section class="widget-item mb-4 mx-lg-3">
        <h2 class="fs-4">${widget.title} <span class="text-black-50">${widget.subTitle}</span></h2>
        ${widget.type === 'color' ? `<p><span class="picked-color fw-medium">顏色</span> </p>` : ''}
        <div class="row row-cols-${widget.col} gy-3">
            ${itemHTML}
        </div>
    </section>`


    return html
}

/**
 * 從商品的規格類型內取得選項
 * @param {string} type 規格類型
 * @returns Spec Items
 */
function getWidgetItem(type) {
    //TODO: 透過type取得不重複的spec items
    const items = []
    return new Set(items)
}

/**
 * 商品客製化區塊點擊動態樣式
 * @param {DOMElement} element 
 */
function specSelectActiveHandler(element) {
    //TODO: 找到屬於那個DOM的區塊，沒點擊的變成原本樣式，點擊的就變成active樣式

}

/**
 * WidgetItem點擊事件
 * @param {DOMElement} element 
 * @param {String} type 客製化規格類型
 */
function clickHandler(element, type) {

    specSelectActiveHandler(element)

    const specWidget = document.querySelector('.spec-widget')
    if (type === 'color') {
        //TODO: 設定選取得顏色

        //TODO: 新增顏色區塊文字

        //TODO: 替換主圖幻燈片

    }

    if (type === 'model') {
        //TODO: 設定選取的規格

        //TODO: 處理儲存裝置區價錢(點擊不同機型時，儲存裝置的錢需要重算)


    }

    if (type === 'storage') {
        //TODO: 設定選取的儲存空間
    }

    createSummaryInfo()
}



/**
 * 商品資訊小計區塊
 */
function createSummaryInfo() {
    if (selectedModel && selectedColor && selectedStorage) {
        //TODO: 取得選到的 Spec

        //TODO: 顯示小計區塊、產品名稱、圖片、完整產品名稱、價錢

    }


}

/**
 * 重設小計區塊（載入時應該會需要）
 */
function resetSummaryArea() {
    selectedModel = ''
    selectedColor = ''
    selectedStorage = ''
    document.querySelector('.summary-area').classList.add('d-none')
}
