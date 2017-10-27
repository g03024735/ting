<template>
  <div class="hot-list">
    <div class="hd">
      <h2>{{ head }}</h2>
      <router-link class="more" to="/courses/all">{{ more }}</router-link>
    </div>
    <div class="course-list">
      <div class="card" v-for="(course, index) in courses" :key="course._id">
        <router-link :to="'/course/' + course._id">
          <div class="poster">
            <img :src="course.cover" alt="course.title">
          </div>
          <div class="info">
            <span>{{ course.name }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hot',
  data: function () {
    return {
      head: '热门课程',
      more: '全部课程'
    }
  },
  props: {
    courses: {
      type: Array,
      default: []
    }
  }
}
</script>
<style scoped lang="scss">
.hot-list {
  margin-top: .1rem;
  background-color: white;
  padding: .2rem .17rem;
  .hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: .47rem;
      font-weight: 700;
    }
    .more {
      text-align: right;
      font-size: .25rem;
      font-weight: 700;
      color: #9a9a9a;
      margin-right: .1rem;
    }
  }
  .course-list {
    margin-top: .3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .card {
      width: 25%;
      padding: 0 .1rem .2rem;
      .poster {
        overflow: hidden;
        height: 2rem;
        border: 1px solid rgb(198, 198, 198);
        img {
          height: 100%;
          transform: translateX(-25%);
        }
      }
      .info {
        font-size: .23rem;
        margin-top: .14rem;
        overflow: hidden;
        span {
          white-space: nowrap;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
