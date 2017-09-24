
//
// All functions about content_item
//
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.setRequestHeader('Access-Control-Allow-Origin', '*');

    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
};

function auto_margin_left() {
  // auto_margin of content_carousel area
  var element = document.getElementsByClassName('profile')[0],
  style = window.getComputedStyle(element)
  content_carousels = document.querySelectorAll('.content_carousel');

  for (var i=0; i<content_carousels.length; i++) {
    content_carousels[i].children[1].style.marginLeft = style.getPropertyValue('margin-left');
  }
}

function auto_margin_right() {
  var element = document.getElementsByClassName('profile')[0],
  style = window.getComputedStyle(element)
  content_carousels = document.querySelectorAll('.content_carousel');

  for (var i=0; i<content_carousels.length; i++) {
    content_carousels[i].children[0].style.width = style.getPropertyValue('margin-right');
    var content_count = content_carousels[i].children.length
    content_carousels[i].children[content_count-1].style.marginRight = style.getPropertyValue('margin-left');
  }
}

function content_visible() {
  document.getElementsByClassName('content')[0].classList.add('appear');
  for (i=0; i < document.getElementsByClassName('content_yearbox').length; i++) {
    document.getElementsByClassName('content_yearbox')[i].classList.add('appear');
  }
};

function create_content_yearbox(year) {
  var content_yearbox_div = document.createElement("div");
  content_yearbox_div.className = 'content_yearbox';
  content_yearbox_div.id = 'content_yearbox_' + year;
  document.querySelector('.content').appendChild(content_yearbox_div);

  var header_div = document.createElement("div");
  header_div.className = 'header';
  content_yearbox_div.appendChild(header_div);
  var year_div = document.createElement("div");
  year_div.className = 'year';
  year_div.innerText = year;
  header_div.appendChild(year_div);
  var timeline_div = document.createElement("div");
  timeline_div.className = 'timeline'
  header_div.appendChild(timeline_div)
  var content_carousel_div = document.createElement("div");
  content_carousel_div.className = 'content_carousel';
  content_yearbox_div.appendChild(content_carousel_div);
  var content_curtain_div = document.createElement("div");
  content_curtain_div.className = 'content_curtain';
  content_carousel_div.appendChild(content_curtain_div);
}

function create_content_item(content_id, parent_location, thumbnail_url, title, desc, happened_at, ended_at) {
  // create content_item
  var content_item_div = document.createElement("div");
  content_item_div.className = 'content_item';
  content_item_div.id = content_id;
  parent_location.appendChild(content_item_div);

  // set thumbnail
  var thumbnail_div = document.createElement("div");
  thumbnail_div.className = 'image';
  content_item_div.appendChild(thumbnail_div);
  var thumbnail_img = document.createElement("img");
  thumbnail_img.src = thumbnail_url;
  thumbnail_div.appendChild(thumbnail_img);

  // set text
  var text_wrapper_div = document.createElement("div");
  text_wrapper_div.className = 'text_wrapper';
  content_item_div.appendChild(text_wrapper_div);
  var title_div = document.createElement("div");
  title_div.className = 'title';
  title_div.innerText = title;
  text_wrapper_div.appendChild(title_div);
  var desc_div = document.createElement("div");
  desc_div.className = 'desc';
  desc_div.innerText = desc;
  text_wrapper_div.appendChild(desc_div);
  var footer_div = document.createElement("div");
  footer_div.className = 'footer'
  text_wrapper_div.appendChild(footer_div);
  var start_div = document.createElement("div");
  start_div.className = 'start';
  start_div.innerText = happened_at.substr(0, 4) + '.' + happened_at.substr(5, 2);
  footer_div.appendChild(start_div);
  var end_div = document.createElement("div");
  end_div.className = 'percent';
  end_div.innerText = ended_at.substr(0, 4) + '.' + ended_at.substr(5, 2);
  footer_div.appendChild(end_div);
  // var percent_div = document.createElement("div");
  // percent_div.className = 'percent';
  // percent_div.innerText = percent;
  // footer_div.appendChild(percent_div);
}

function segment_content_item() {
  for (item_key in data.content_item) {
    var item = data.content_item[item_key]
    var d = new Date(item.happened_at)
    var year = d.getFullYear();
    if (document.getElementById('content_yearbox_' + year) == null) {
      create_content_yearbox(year);
    }
    var this_parent_location = document.querySelector('#content_yearbox_' + year + ' .content_carousel');
    create_content_item(
      item_key,
      this_parent_location,
      item.thumbnail_url,
      item.title,
      item.description,
      item.happened_at,
      item.ended_at
    );
  }
};


//
// All functions about content_show
//
function apply_content_show_transition() {
  for (i=0; i<document.getElementsByClassName('content_item').length; i++) {
    var content_id = document.getElementsByClassName('content_item')[i].id;
    document.getElementById(content_id).onclick = function() {
      show_content_show(this.id);
    };
  };
  document.getElementsByClassName('show')[0].onclick = hide_content_show;
}
function show_content_show(content_id) {
  // Styling content_show
  document.getElementsByClassName('show')[0].style.height = 'auto';
  document.getElementsByClassName('show')[0].style.opacity = '1';
  document.getElementsByClassName('content_show')[0].style.opacity = '1';
  if ( window.screen.width < 1024 ) {
    // Mobile
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    document.getElementsByClassName('content_show')[0].style.marginTop = '48px';
    document.getElementsByClassName('content_show')[0].style.pointerEvents = 'none'
  }
  else {
    // PC
    document.getElementsByClassName('content_show')[0].style.boxShadow = '#CCD4D9 0 10px 30px';
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    document.getElementsByClassName('content_show')[0].style.marginTop = '84px';
    let show_children = document.getElementsByClassName('show')[0].children;
    for (i=0; i<show_children.length; i++) {
      show_children[i].addEventListener("click", function(e){
          e.stopPropagation();
        }
      )
    }
    document.getElementsByClassName('content_show')[0].style.pointerEvents = ''

  }

  var title_div = document.querySelector(".show .title");
  title_div.innerText = data.content_item[content_id].title;
  var desc_div = document.querySelector(".show .desc");
  desc_div.innerHTML = data.content_item[content_id].description + " <br>[<a target='_blank' href='" + data.content_item[content_id].link[0] + "'>링크 바로가기</a>]";

  // Assign content to content_show
  for (image_url in data.content_item[content_id].image_urls) {
    var image_urls = data.content_item[content_id].image_urls
    var content_images = document.createElement("img");
    content_images.className = 'content_image'
    content_images.src = image_urls[image_url];
    document.querySelector(".show .content_show").appendChild(content_images)
  }
}
function hide_content_show() {
  document.getElementsByClassName('show')[0].style.height = '0';
  document.getElementsByClassName('show')[0].style.opacity = '0';
  document.getElementsByClassName('content_show')[0].style.opacity = '0';
  document.getElementsByClassName('content_show')[0].style.marginTop = '96px';
  document.getElementsByClassName('content_show')[0].style.boxShadow = '';

  document.getElementsByTagName('body')[0].style.overflow = 'scroll';
  document.querySelector('.show .content_show').innerHTML = "";
}
