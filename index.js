const handleCategory = async () =>{ 
    const response = await fetch(' https://openapi.programming-hero.com/api/news/categories')
    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');
    data.data.news_category.slice(0, 3).forEach(category =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleloadNews('${category.category_id}')" class="tab">${category.category_name}</a>
        `;
        tabContainer.appendChild(div);
    });

    
    
};

const handleloadNews = async (categoryId)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = '';
    
    data.data.forEach(news =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src="${news?.image_url}" alt="">
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              ${news.title.slice(0,40)}
              <div class="badge badge-secondary p-5">${news.rating.badge}</div>
            </h2>
            <p>
              ${news.details.slice(0,50)}
            </p>
            <h3 class="font-semibold">Total Views: ${news.total_view ? news.total_view : 'no views'}</h3>
            <div class="card-footer flex justify-between mt-8">
              <div class="flex">
                <div>
                  <div class="avatar online ">
                    <div class="w-14 rounded-full">
                      <img src=${news.author.img} alt="">

                    </div>

                  </div>
                </div>
                <div>
                  <h6 class="ml-4">${news.author.name}</h6>
                  <small class="ml-4">${news.author.published_date}</small>
                </div>
              </div>
              <div class="card-detailed-btn">
                <button onclick=handleModal('${news._id}') class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900 ">

                  Details

                </button>

              </div>
            </div>
          </div>
        </div>
        `;

        cardContainer.appendChild(div);
    })
};


const handleModal = async (newsId) =>{
    console.log(newsId);

    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    const data = await response.json();
    console.log(data.data[0]);

    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement('div');
    div.innerHTML = `
    
  <dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>

    `;

    modalContainer.appendChild(div);

    const modal = document.getElementById('my_modal_1');

    modal.showModal();
}








handleCategory();
handleloadNews('01');
