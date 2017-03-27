function getMusicGroup(index) {
    $.ajax({
        data: {
            method: "baidu.ting.billboard.billList",
            type: index,
            size: 10,
            offset: 0
        },
        dataType: "jsonp",
        type: "get",
        url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
        success: function(data) {
            // console.log(data);
            var tit = document.getElementById("list_name");
            tit.innerHTML = data.billboard.name;
            console.log(data);
            var ol = document.getElementById("song_list");
            var lis = ol.children;
            for (var i = 0; i < lis.length; i++) {
                var curr_song = data.song_list[i];
                lis[i].children[0].innerHTML = curr_song.title;
                lis[i].children[1].innerHTML = curr_song.author;

                lis[i].index = curr_song.song_id;
            }

        }
    });
}
getMusicGroup(2);

$("#song_list").find("li").on("click", function() {
    // console.log(this.index);
    getMusic(this.index);
    setTimeout(function() {
        $("#audio")[0].load();
        $("#audio")[0].play();
    },1000);

});

function getMusic(index) {
    $.ajax({
        // method=baidu.ting.song.play&songid=877578
        data: {
            method: "baidu.ting.song.play",
            songid: index
        },
        dataType: "jsonp",
        type: "get",
        url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
        success: function(data) {
            console.log(data);

            $(".left_info").find("img")[0].src = data.songinfo.pic_big;
            $("#curr_music").html(data.songinfo.title);
            $("#musician").html(data.songinfo.author);
            $("#music_url").attr("src", data.bitrate.file_link);
        }
    })
}
var musics = $("#group_music").find("a");
musics.on("click", function() {
    getMusicGroup(this.title);
});
// $("#play").on("click", function(){

// });