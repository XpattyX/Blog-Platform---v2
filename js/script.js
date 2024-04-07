/*----------------------- hamberger menu */
$(document).ready(function () {
  $('.hamburger').on("click", function () {
    $(".nav-grid").toggleClass("open");
  });
});

function myFunction(x) {
  x.classList.toggle("change");
}

/*----------------------- แสดง */
fetch("../json/blog.json")
  .then(response => response.json())
  .then(data => appendData(data.blogs))
  .catch(err => { console.log('error:' + err) })

function appendData(data) {
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
    var h2 = document.createElement("h2");
    h2.innerHTML = `Title: ${data[i].title}`
    mainContainer.appendChild(h2);
  }
}

/*----------------------- Search */
/* let keyword = document.getElementById('search').value

fetch("../json/blog.json")
  .then(response => response.json())
  .then(function(data){
    var result = searchBlogs("keyword", data.blogs)
    console.log(result)
    console.log("value")
  })
  .catch(err => {console.log('error:' + err)})

const searchBlogs = (keyword, blogs) => {
  return blogs.filter(blog => blog.title.toLowerCase().includes(keyword.toLowerCase()));
}; */

/* ------------------------- Search by CHAT-GPT */
document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault(); // ป้องกันการโหลดหน้าใหม่เมื่อ submit form
  var searchQuery = document.getElementById('search-input').value.toLowerCase();
  var searchResults = document.getElementById('search-results');



  // เรียกใช้ฟังก์ชั่นค้นหา
  fetch("../json/blog.json")
    .then(response => response.json())
    .then(function (data) {

      /* var jsonData = [{
        "id": 1,
        "title": "dolorum ut in voluptas mollitia et saepe quo animi",
        "category": "Sea",
        "content": "Lorem ipsum...",
        "author": "Leanne Graham",
        "views": 1200
      },
      {
        "id": 2,
        "title": "nesciunt quas odio",
        "category": "Mountain",
        "content": "Lorem ipsum...",
        "author": "Jane Doe",
        "views": 800
      }]; */

      var results = searchInJSON(data.blogs, searchQuery);
      // ล้างผลลัพธ์เก่าทุกครั้งที่ค้นหาใหม่
      searchResults.innerHTML = '';

      // แสดงผลลัพธ์
      results.forEach(function (result) {

        var resultElement = document.createElement('div');
        resultElement.classList.add('imgbox'); // เพิ่มคลาส 'imgbox'
    
        var imgElement = document.createElement('img'); // สร้างแท็ก <img>
        imgElement.src = result.imageSrc; // กำหนดที่อยู่ของรูปภาพ
        imgElement.alt = result.title; // กำหนดข้อความแสดง alternative
    
        var textElement = document.createElement('div');
        textElement.classList.add('text-in-img'); // เพิ่มคลาส 'text-in-img'
        textElement.textContent = result.title;
    
        resultElement.appendChild(imgElement); // เพิ่มแท็ก <img> เข้าไปใน div
        resultElement.appendChild(textElement); // เพิ่ม div ข้อความเข้าไปใน div
        searchResults.appendChild(resultElement);
        
    
        
    });

      /* results.forEach(function (result) {
        var resultElement = document.createElement('div');
        resultElement.classList.add('imgbox');
        resultElement.textContent = result.title;
        searchResults.appendChild(resultElement);
      }); */
    }) 
    .catch(err => { console.log('error:' + err) });
});

// เพิ่มการตรวจสอบอีเวนต์การกดปุ่ม Enter
document.getElementById('search-input').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    document.getElementById('search-form').dispatchEvent(new Event('submit'));
  }
});

/* function searchInJSON(jsonData, query) {
  var results = [];
  console.log(jsonData)
  // วน loop ทุกๆ object ใน JSON
  for (var key in jsonData) {
    console.log(key[1])
    if (jsonData.hasOwnProperty(key)) {
      var value = jsonData[key].toString().toLowerCase();
      console.log(value)
      // หาคำค้นหาในข้อมูล
      if (value.indexOf(query) !== -1) {
        results.push(jsonData[key]);
      }
    }
  }
  return results;
} */

function searchInJSON(jsonData, query) {
  var results = [];
  // วน loop ทุกๆ object ใน JSON
  for (var i = 0; i < jsonData.length; i++) {
      // วน loop ทุกๆ property ใน object
      for (var key in jsonData[i]) {
          if (jsonData[i].hasOwnProperty(key)) {
              var value = jsonData[i][key].toString().toLowerCase();
              // หาคำค้นหาในข้อมูล
              if (value.indexOf(query) !== -1 && !results.includes(jsonData[i])) {
                  results.push(jsonData[i]);
                  break; // เมื่อเจอข้อมูลที่ตรงกับเงื่อนไขให้หยุดการค้นหาใน property ปัจจุบัน
              }
          }
      }
  }
  return results;
}

//---------------------------------------------------------------------
/* function searchInJSON(query) {
  // สมมติว่า jsonData เป็น JSON object ที่มีข้อมูลที่ต้องการค้นหา
  var jsonData = [{
    "id": 1,
    "title": "dolorum ut in voluptas mollitia et saepe quo animi",
    "category": "Sea",
    "content": "Lorem ipsum...",
    "author": "Leanne Graham",
    "views": 1200
  },
  {
    "id": 2,
    "title": "nesciunt quas odio",
    "category": "Mountain",
    "content": "Lorem ipsum...",
    "author": "Jane Doe",
    "views": 800
  }]; // ข้อมูล JSON 

  var results = [];
  // วน loop ทุกๆ object ใน JSON
  for (var key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      var value = jsonData[key].toString().toLowerCase();
      // หาคำค้นหาในข้อมูล
      if (value.indexOf(query) !== -1) {
        results.push(jsonData[key]);
      }
    }
  }
  return jsonData;
}



/*----------------------- Statistics */
fetch("../json/statistic.json")
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    var totalBlogs = document.getElementById("totalBlogs");
    var totalViews = document.getElementById("totalViews");
    var totalWriters = document.getElementById("totalWriters");
    totalBlogs.textContent = data.statistics.totalBlogs
    totalViews.textContent = data.statistics.totalViews
    totalWriters.textContent = data.statistics.totalWriters
  })
  .catch(function (err) {
    console.log('error:' + err)
  })

