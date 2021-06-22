<template>
  <div>
    <div class="wrapper marginTop wow slideInLeft">
      <div class="block aboutMe">
        <div class="avatar">
          <img
            src="http://59.110.143.188:3000\uploads\20210611\1623378587962.jpeg"
            alt=""
          />
        </div>
        <p><span class="threed threeds">黄文龙</span></p>
        <p><span class="threed threeds">男、95后</span></p>
        <p><span class="threed threeds">现居广东深圳</span></p>
        <p>
          <span class="threed threeds">一名前端学习者，为投奔IT行业而努力</span>
        </p>
        <p><span class="threed threeds">是万千程序猿中的一只</span></p>
        <p>
          <span class="threed threeds"
            >喜欢编程，喜欢探索新技术，热爱运动，大学生活迷茫过，失落过，还好没有放弃</span
          >
        </p>
        <p>
          <span class="threed threeds">希望看到这里的你也不要轻易地放弃</span>
        </p>
        <p>
          <span class="threed threeds"
            >这条路上的你并不是孤军奋战，有千千万万的猿在陪你前行</span
          >
        </p>
        <p>
          <span class="threed threeds">联系方式：13084991856@163.com</span>
        </p>
        <div class="bottom">
          本博客前端采用vue+element-ui+axios、MVVM架构模式，后端采用nodejs+express+mysql。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WOW from "wowjs";
export default {
  name: "aboutMe",
  mounted() {
    let wow = new WOW.WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: false,
    });
    wow.init();
  },
};
</script>

<style lang="scss" scoped>
.aboutMe {
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
  margin-bottom: 350px;
  .avatar {
    display: flex;
    justify-content: center;
    img {
      border-radius: 50%;
      width: 100px;
    }
  }

  p {
    font-size: 15px;
    text-align: center;
    span {
      line-height: 45px;
    }
  }
  .bottom {
    margin-top: 20px;
    padding: 20px;
    background-color: rgb(222, 223, 224);
    color: rgb(107, 106, 106);
    border-radius: 5px;
    line-height: 30px;
  }
}
.threed {
  font-size: 18px !important;
}
</style>