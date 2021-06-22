<template>
  <div class="wow slideInLeft">
    <article-lists :AllArticle="AllArticle"></article-lists>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      @current-change="change"
    >
    </el-pagination>
  </div>
</template>

<script>
import WOW from "wowjs";
import ArticleLists from "../components/articleLists/ArticleLists.vue";
export default {
  inject: ["reload"],
  components: { ArticleLists },
  data() {
    return {
      AllArticle: [],
      key: this.$route.query.key,
      // 当前的页，默认为第一页
      curPage: 1,
      // 设置每页的数量
      pageSize: 10,
      // 全部文章数量
      count: 0,
    };
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.reload();
    next();
  },
  watch: {
    key(val) {
      alert(val);
    },
  },
  methods: {
    change(val) {
      this.GetAllArticle(val, this.pageSize);
    },
    GetAllArticle(curPage, pageSize) {
      if (this.key) {
        // 获取分类文章信息
        this.$http
          .get("/api/article/list/Singleclassify", {
            params: { classname: this.key },
          })
          .then((res) => {
            if (res.data.code === 0) {
              // 获取文章数组
              this.AllArticle = res.data.data.list;
              //console.log("获取分类文章信息", this.AllArticle.length);
            }
          });
      } else {
        // 获取全部文章信息
        this.$http
          .get("/api/article/typeList", {
            params: { curPage: curPage, pageSize: pageSize },
          })
          .then((res) => {
            if (res.data.code === 0) {
              // 获取文章数组
              this.AllArticle = res.data.data;
              //console.log(this.AllArticle);
              this.count = res.data.coust;
            }
          });
      }
    },
  },
  created() {
    // 分页请求
    this.GetAllArticle(this.curPage, this.pageSize);
  },
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
.el-pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>