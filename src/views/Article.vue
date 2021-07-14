<template>
  <div class="wrapper">
    <h1 class="title">文章列表</h1>
    <div class="article">
      <div class="top">
        <el-input
          class="input_title"
          placeholder="请输入博客标题"
          prefix-icon="el-icon-search"
          v-model="blog_title"
          clearable=""
          @clear="getMyBlogList(blog_title, curPage, pageSize)"
          @input="handleInput"
        >
        </el-input>
        <el-button class="addBtn" @click="handleAdd">新增+</el-button>
      </div>
      <el-table :data="articleList" border stripe>
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column label="日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleLook(scope.row)"
              >查看</el-button
            >
            <el-button size="mini" type="success" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelect(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="change"
      :current-page="curPage"
      :page-sizes="[6, 12, 18]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    >
    </el-pagination>
  </div>
</template>

<script>
//防抖函数
// import debounce from "@/assets/js/debounce.js";
import debounce from "lodash.debounce";
export default {
  name: "Article",
  data() {
    return {
      articleList: [],
      // 当前的页，默认为第一页
      curPage: 1,
      // 设置每页的数量
      pageSize: 6,
      // 全部文章数量
      count: 0,
      blog_title: "",
      that: this,
    };
  },
  methods: {
    handleAdd() {
      this.$router.push({ name: "editArticle", params: { id: 0 } });
    },
    handleLook(row) {
      let id = row.id;
      this.$router.push({ path: "/detail/" + id });
    },
    handleEdit(row) {
      let id = row.id;
      this.$router.push({ name: "editArticle", params: { id: id } });
    },
    handleDelect(row) {
      let id = row.id;
      this.$confirm("此操作将删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: `文章删除成功!`,
          });
          // 发起删除的网络请求
          this.$http
            .post("/api/article/delete", {
              article_id: id,
            })
            .then((res) => {
              if (res.data.code === 0) {
                //发起删除请求操作
                this.$message({
                  type: "success",
                  message: `${id}文章删除成功!`,
                });
                // setTimeout(() => {
                //   location.reload();
                // }, 500);
                this.getMyBlogList(
                  this.blog_title,
                  this.curPage,
                  this.pageSize
                );
              }
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    change(val) {
      this.curPage = val;
      this.getMyBlogList(this.blog_title, val, this.pageSize);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getMyBlogList(this.blog_title, this.curPage, this.pageSize);
    },

    handleInput: debounce(function () {
      this.curPage = 1;
      this.getMyBlogList(this.blog_title, this.curPage, this.pageSize);
    }, 500),

    getMyBlogList(blog_title, curPage, pageSize) {
      this.$http
        .get("/api/article/myList", {
          params: { title: blog_title, curPage: curPage, pageSize: pageSize },
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.articleList = res.data.data;
            this.count = res.data.coust;
          }
        });
    },
  },
  watch: {
    //使用watch监听total总数的变化实现删除最后一页不刷新回到前一页的情况
    //原理:如果数据总数等于当前页-1*每页显示的条数，并且总数不能为0时，回到上一页
    count() {
      if (
        this.count === (this.curPage - 1) * this.pageSize &&
        this.count !== 0
      ) {
        this.curPage -= 1;
        this.getMyBlogList(this.blog_title, this.curPage, this.pageSize);
      }
    },
  },
  created() {
    this.getMyBlogList(this.blog_title, this.curPage, this.pageSize);
  },
};
</script>
<style>
.el-pagination__total,
.el-pagination__jump {
  color: #ccc !important;
}
</style>
<style lang="scss" scoped>
.title {
  margin: 30px 0;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
}
.article {
  .top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    .input_title {
      width: 300px;
    }
  }
}
/deep/ .el-table {
  .cell {
    text-align: center;
  }
}
.el-pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>