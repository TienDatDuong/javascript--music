const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const thumb = $('.cd-thumb');
const heading = $('header h2');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const play = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const RepeatBtn = $('.btn-repeat')
const playList = $('.playlist');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom:false,
    isRepeat:false,
    songs:[
        {
        name: "Reality",
        singer: "Raftaar x Brobha V",
        path:"./music/music-3.mp3",
        image: "./img/image-3.jpg"
        },
        {
          name: " Summertime K 391",
          singer: "Raftaar x Salim Merchant x Karma",
          path: "./music/music-2.mp3",
          image:"./img/image-2.jpg"
        },
        {
          name: "Nevada",
          singer: "Raftaar x Fortnite",
          path: "./music/music-2.mp3",
          image: "./img/image-1.jpg"
        },
        {
          name: "Yeu Nguoi Khong Duoc Lai Duoc Nguoi Khac Yeu Nguyen Phi Bang",
          singer: "Raftaar x Nawazuddin Siddiqui",
          path: "./music/music-4.mp3",
          image:"./img/image-4.jpg"
        },
        {
          name: "Lemon Tree Mina",
          singer: "Raftaar",
          path: "./music/music-5.mp3",
          image:
            "./img/image-5.jpg"
        },
        {
          name: "Sugar Free T ARA",
          singer: "Raftaar x kr$na",
          path:"./music/music-6.mp3",
          image:"./img/image-6.jpg"
        },
        {
          name: "My Love Westlife",
          singer: "Raftaar x Harjas",
          path: "./music/music-7.mp3",
          image:"./img/image-7.jpg"
        },
        {
            name: "Attention Beat Niki Nhi Ha",
            singer: "Raftaar x kr$na",
            path:"./music/music-8.mp3",
            image:"./img/image-8.png"
          },
      ],
    render: function() {
        const html = this.songs.map( (song,index) => {
                return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                      <div class="thumb"
                          style="background-image: url('${song.image}')">
                      </div>
                      <div class="body">
                          <h3 class="title">${song.name}</h3>
                          <p class="author">${song.singer}</p>
                      </div>
                      <div class="option">
                          <i class="fas fa-ellipsis-h"></i>
                      </div>
                  </div>
                `
            }
            
        )
        playList.innerHTML = html.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this,'currentSong',{
          get: function() {
            return this.songs[this.currentIndex];
          }
        })
    },
    handleEvent: function() {
      const _this = this;
      // X??? l?? t??? ph??t l???i song
      RepeatBtn.onclick = function() {
        _this.isRepeat = !_this.isRepeat;
        RepeatBtn.classList.toggle('active',_this.isRepeat);
      },
      //X??? l?? t??? chuy???n b??i
      audio.onended = function() {
        if(_this.isRepeat) {
          audio.play()
        }else{
          nextBtn.click();
        }
      }
      //X??? l?? quay CD/ D???ng
     const CdthumbAnimation = thumb.animate([
       {transform:'rotate(360deg)'}
      ],{
        duration:3000,
        iterations: Infinity
      })
      CdthumbAnimation.pause()
      //next song

      //x??? l?? khi click play
      playBtn.onclick = function() {
        if(_this.isPlaying) {
          audio.pause();
        }else{
          audio.play();
        }
      },
      //khi audio b??? pause
      audio.onpause =function() {
        _this.isPlaying = false;
        play.classList.remove('playing')
        CdthumbAnimation.pause()
      }
      //khi audio dc play
      audio.onplay = function() {
        _this.isPlaying = true;
        play.classList.add('playing')
        CdthumbAnimation.play()
      }
      //khi ti???n ????? b??i hat thay ?????i
      audio.ontimeupdate = function() {
        if(audio.currentTime) {
          const progressPercent = Math.floor(audio.currentTime/audio.duration * 100);
          progress.value = progressPercent ;
        }

      }
      // x??? l?? khi tua song
      progress.onchange = function(e) {
          const seekTime = audio.duration / 100 * e.target.value;
          audio.currentTime = seekTime
      }

      //x??? l?? ph??ng to thu nh???
          const cdWidth = cd.offsetWidth;
        document.onscroll = function() {
            const scrollTop = document.documentElement.scrollTop || window.scrollY;
            const newcdWidth = cdWidth - scrollTop;

            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0;
            thumb.style.opacity = newcdWidth/cdWidth;
            
        },
         //X??? l?? next Song
         nextBtn.onclick = function() {
           if(_this.isRandom) {
             _this.playRandomSong()
           }else{
             _this.nextSong();
           }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        },
        //X??? l?? prev Song
        prevBtn.onclick = function() {
          if(_this.isRandom) {
            _this.playRandomSong()
          }else{
            _this.prevSong();
          }
          audio.play();
          _this.render();
          _this.scrollToActiveSong();

        },
        //x??? l?? random
        randomBtn.onclick = function() {
        _this.isRandom = !_this.isRandom;
        randomBtn.classList.toggle('active',_this.isRandom);

        },
        playList.onclick = function(e) {
          const songNote = e.target.closest('.song:not(.active)');
          if( songNote || e.target.closest('.option') ) {
            // X??? l?? khi click v??o Song
            if(songNote) {
              // console.log(songNote.getAttribute('data-index'))
              _this.currentIndex = Number(songNote.dataset.index);
              _this.loadcurrentSongs();
              _this.render();
              audio.play()

            }
            // X??? l?? khi click v??o song option
            if(e.target.closest('.option')) {

            }

          }

          
        }
    },
    scrollToActiveSong: function() {
      setTimeout(()=> {
        $('.song.active').scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      },500)
    },
    loadcurrentSongs: function() {
      heading.innerText = this.currentSong.name;
      thumb.style.backgroundImage = `url(${this.currentSong.image})`;
      audio.src = this.currentSong.path; 
    },
    nextSong: function() {
      this.currentIndex++
      if (this.currentIndex >= this.songs.length) {
        this.currentIndex = this.songs.length - 2
      }
      this.loadcurrentSongs()
    },
    prevSong: function() {
      this.currentIndex--
      if (this.currentIndex < 0) {
        this.currentIndex = 0
      }
      this.loadcurrentSongs()
    },
    playRandomSong: function() {
      let newIndex 
      do {
        newIndex = Math.floor(Math.random() * this.songs.length);
      }while( newIndex === this.currentIndex );
      this.currentIndex =  newIndex;
      this.loadcurrentSongs()
    },
    start: function() {
      // ?????nh ngh??a c??c thu???c t??nh cho Object
        this.defineProperties();
      // l???ng nghe v?? s??? l?? c??c s??? ki???n(DOM event)
        this.handleEvent();
      //t???i th??ng tin b??i h??t ?????u ti??n v??o UI v?? ch???y ???ng d???ng
      this.loadcurrentSongs();
      //render playlist
        this.render();
    }
}

app.start();

