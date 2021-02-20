const endpoint_url = 'https://51018021.p-web.click/KingOfPop/api/';

//newline to br
/*function nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}*/
function nl2br (str, is_xhtml) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Philip Peterson
  // +   improved by: Onno Marsman
  // +   improved by: Atli Þór
  // +   bugfixed by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Maximusya
  // *     example 1: nl2br('Kevin\nvan\nZonneveld');
  // *     returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
  // *     example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
  // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
  // *     example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
  // *     returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}




//req api
function frontalbum(){
 fetch(endpoint_url+"albums/albumlist")
 .then(status)
 .then(json)
 .then(function(data){
   var frontHTML = "";
   data.albums.forEach(function(album){
     if(album.album_id<4){

     frontHTML += `
     <div class="col s3 m4 offset-s3">
      <div class="card">
        <a href="./pages/albumsongs.html?id=${album.album_id}">
        <div class="card-image">
          <img src="..${album.album_image}">
          </div>
          <div class="card-content">
          <p class="center-align greykop-text">${album.album_name}</p>
        </div>
      </div>
     </div>
     `;
   }
   });
   document.getElementById("front-page").innerHTML = frontHTML;
 })
 .catch(error);
}

function albumlist(){
 fetch(endpoint_url+"albums/albumlist")
 .then(status)
 .then(json)
 .then(function(data){
   var alistHTML = "";
   data.albums.forEach(function(album){

     alistHTML += `
     <div class="col s3 m5 offset-s3">
      <div class="card">
        <a href="albumsongs.html?id=${album.album_id}">
        <div class="card-image">
          <img src="..${album.album_image}">
          </div>
          <div class="card-content">
          <p class="center-align greykop-text">${album.album_name}</p>
        </div>
      </div>
     </div>
     `;
   });
   document.getElementById("albumlist").innerHTML = alistHTML;
 })
 .catch(error);
}


function albuminfo1(album_id){
    fetch(endpoint_url+"albums/albuminfo"+"?id="+album_id)
    .then(status)
    .then(json)
    .then(function(songs){
      var albumHTML= "";
      //albuminfo
      songs.info.forEach(function(album){
        albumHTML += `
        <div class="col s1 m4">
          <img src="..${album.album_image}" style="width:300px">

          <h4>${album.album_name}</h4>
          <h5>${album.album_creator}</h5>
          <h6>Released: ${album.album_releasedate}</h6>

        </div>

        `;
      });
      document.getElementById("albuminfo").innerHTML=albumHTML;
})
  .catch(error);
}

function albumsonglist(album_id){
  fetch(endpoint_url+"albums/albumsonglist"+"?id="+album_id)
  .then(status)
  .then(json)
  .then(function(data){
    var asongsHTML = "";

    data.songs.forEach(function(songs){
      asongsHTML += `

    <div class="collection">
      <a href="lyrics.html?id=${songs.song_id}" class="collection-item">${songs.song_title}</a>
    </div>
      `;
      document.getElementById("albumsonglist").innerHTML=asongsHTML;
    });
  })
  .catch(error);
}

function songlyrics(song_id){
  fetch(endpoint_url+"lyrics/lyrics1"+"?id="+song_id)
  .then(status)
  .then(json)
  .then(function(data){
    var lyricsHTML="";
    var songtitle="";
    data.lirik.forEach(function(song){
     lyricsHTML=`
     <p class="center-align">${nl2br(song.lyrics)}</p>
     `;
     songtitle=`<h4 class="center-align">${song.song_title}</h4>`;
   });
   document.getElementById("lyric-content").innerHTML=lyricsHTML;
   document.getElementById("song-title").innerHTML= songtitle;
  })
  .catch(error);
}

function songlist(){
  fetch(endpoint_url+"songs/songlist")
  .then(status)
  .then(json)
  .then(function(data){
    var songlistHTML="";
    data.slist.forEach(function(song){
      songlistHTML=`
      <a href="lyrics.html?id=${song.song_id}" class="data collection-item">${song.song_title}</a>
      `;
    });
    document.getElementById("songlist").innerHTML = songlistHTML;
  })
  .catch(error);
}
