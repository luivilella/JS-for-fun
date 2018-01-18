<template>
  <div class="container" id="app">
    <div class="page-header">
      <input v-model="userSearch" />
      <button v-on:click="searchUser">Search</button>
      <spam v-if="userNotFound">User not found</spam>
      <spam v-if="userSearching">Searching user</spam>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-6 left-fixed-height">
          <ul class="list-group" v-show="user.posts.length">
            <li class="list-group-item" v-for="post in user.posts" :key="post.id">
              <h4>{{post.title}}</h4>
              <p>{{post.body}}</p>
            </li>
          </ul>
        </div>
        <div class="col-6" v-if="wordsStatistics.length">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Word</th>
                <th>% of all comments</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in wordsStatistics" :key="row.id">
                <td>{{row.word}}</td>
                <td v-if="row.pergentageOfTotal !== null">
                  {{row.pergentageOfTotal | number }}
                </td>
                <td v-if="row.pergentageOfTotal === null">Loading</td>
              </tr>
            </tbody>
          </table>
          <h2>Count of Top 10 Words</h2>
          <table class="table words">
            <tbody>
              <tr v-for="row in wordsStatistics" :key="row.id">
                <td class="td-words">{{row.word}}</td>
                <td class="td-numbers">
                  <div class="progress">
                    <div class="progress-bar" role="progressbar"
                    v-bind:style="{width: ((row.counter * 5)+'px')}">{{row.counter}}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import getTopNWords from '../utils/top-words'

export default {
  name: 'Search',

  data () {
    return {
      userSearch: 'Leanne Graham',
      user: {
        info: undefined,
        posts: [],
        comments: []
      },
      userNotFound: false,
      userSearching: false,
      wordsStatistics: []
    }
  },

  filters: {
    number: function (value, decimalPlaces = 1) {
      return (
        parseFloat(Math.round(value * 100) / 100).toFixed(decimalPlaces)
      )
    }
  },

  created () {
    this.cleanState()
  },

  methods: {
    // services //
    serviceGetUser (name) {
      return this.$http.get(
        `https://jsonplaceholder.typicode.com/users?name=${name}`
      )
        .then(response => {
          if (response.data) {
            return response.data[0]
          }
          return null
        })
    },

    serviceGetPosts (userId) {
      return this.$http.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      )
        .then(response => response.data)
    },

    serviceGetComments (postId) {
      return this.$http.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      )
        .then(response => response.data)
    },

    serviceGetCommentsMultiplePosts (postsIds) {
      let promissesList = []
      for (let postId of postsIds) {
        promissesList.push(this.serviceGetComments(postId))
      }
      return Vue.Promise.all(promissesList)
        .then(data => data)
    },
    // services //

    // page methods //
    cleanState () {
      this.user = {
        info: undefined,
        posts: [],
        comments: []
      }
      this.userNotFound = false
      this.userSearching = false
      this.wordsStatistics = []
    },

    getUser (name) {
      this.userSearching = true
      this.serviceGetUser(name)
        .then(user => {
          this.userSearching = false
          if (!user) {
            this.userNotFound = true
          } else {
            this.userNotFound = false
          }
          this.user.info = user
          this.getPosts(user)
        })
    },

    getPosts (user) {
      if (!user) {
        return
      }
      this.serviceGetPosts(user.id)
        .then(posts => {
          this.user.posts = posts
          this.getComments(posts)
        })
    },

    getComments (posts) {
      if (!posts.length) {
        return
      }

      let postsIds = []
      for (let post of posts) {
        postsIds.push(post.id)
      }
      this.serviceGetCommentsMultiplePosts(postsIds)
        .then(comments => {
          this.user.comments = comments
          this.generateWordsStatistics(comments)
        })
    },

    generateWordsStatistics (comments) {
      let commentsFrases = ''
      for (let postComments of comments) {
        for (let comment of postComments) {
          commentsFrases += ` ${comment.body}`
        }
      }
      let commentsTopWords = getTopNWords(commentsFrases, 10)

      this.wordsStatistics = []

      for (let row of commentsTopWords.topWords) {
        this.wordsStatistics.push({
          word: row[0],
          counter: row[1],
          pergentageOfTotal: (row[1] / commentsTopWords.totalWords) * 100
        })
      }
    },

    searchUser () {
      this.cleanState()
      this.getUser(this.userSearch)
    }
    // page methods //

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-header {
  height: 100px;
  background-color: #efefef;
  padding: 0;
}
.page-header input {
  margin: 35px 0 0 35px;
}
.left-fixed-height {
  height: 1150px;
  overflow: auto;
  padding: 10px;
}
table {
  border: 3px solid #ccc;
  margin-top: 20px;
}
.table td {
  border-right: 3px solid #ccc;
  text-align: center;
}
thead {
  background-color: #ccc;
  text-align: center;
}
thead tr th {
  text-align: center;
}
table.words,
table.words td {
  border: none;
  margin-top: 0;
}
table .td-words {
  width: 30%;
  text-align: right;
}
table .td-numbers {
  padding-top: 18px;
}
h2 {
  margin: 40px 0 10px 0;
}
.progress {
  background-color: transparent;
}
</style>
