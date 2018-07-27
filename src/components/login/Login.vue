<template>
  <div class="login-warpper">
    <v-head></v-head>
    <div class="login">
      <form action="">
        <div class="form-item">
          <input type="text" name='username' id='name' v-model="username" placeholder='请输入您的用户名'>
        </div>
        <div class="form-item">
          <input type="password" name='username' id='password' v-model="password" placeholder="请输入您的密码(至少六位)">
        </div>
        <div class="submit" id="submit" @click='submit'>提交</div>
      </form>
    </div>
    <transition name='slide' enter-active-class='slide-active' leave-active-class='slide-leave'>
      <div class="error" v-if='error'>{{errorText}}</div>
    </transition>
  </div>
</template>
<script>
import head from '../common/Head'
import {localStorageSetitem, getLocalStorage} from '../../assets/js/base'
import {UserKey} from '../../assets/js/initData'
export default {
  data () {
    return {
      username: '',
      password: '',
      error: false,
      errorText: '请检查您输入的项'
    }
  },
  components: {
    'v-head': head
  },
  methods: {
    errorHide () {
      setTimeout(() => {
        this.error = false
      }, 3000)
    },
    submit () {
      let user = getLocalStorage(UserKey)
      if (user) {
        this.$router.push({'path': '/home'})
        return false
      }
      if (!this.username.length > 0) {
        this.error = true
        this.errorHide()
        this.errorText = '用户名不能为空'
        return false
      }
      if (this.password.length < 6) {
        this.error = true
        this.errorHide()
        this.errorText = '密码最少六位'
        return false
      }
      let userData = {
        username: this.username,
        password: this.password
      }
      localStorageSetitem(UserKey, JSON.stringify(userData))
      this.$router.history.go(-1)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .login-warpper
    width 100%
    overflow hidden
    padding-top 0.4rem
    .login
      width 80%
      margin 0 auto
      form
        width 100%
        .form-item
          width 100%
          margin 0.5rem 0rem
          input
            width 100%
            height 0.8rem
            border 1px solid #afafaf
            padding-left 0.2rem
            font-size 0.24rem
            color #000
            &:focus
              border-color: rgba(82, 168, 236, 0.8);
              outline: 0;
              outline: thin dotted \9;
              -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
              -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
              box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
        .submit
          width 100%
          margin-top 0.5rem
          height 0.8rem
          background-color rgba(36, 154, 247, 1)
          color #ffffff
          font-size 0.24rem
          text-align center
          line-height 0.8rem
    .error
      position fixed
      top 25%
      left 25%
      width 50%
      height 3rem
      box-shadow 0px 0px 0.7rem rgba(0,0,0,0.7)
      color #ff0000
      font-size 0.3rem
      text-align center
      line-height 3rem
      background-color #fff
      transition all 0.5s ease
      opacity 1
      transform translate3d(0rem, 0rem,0rem)
      &.slide-active
        transition 0.5s cubic-bezier(.18,-0.79,.68,1.86)
        opacity 0
        transform translate3d(0rem,-5rem,0rem)
      &.slide-leave-to
        transition 0.5s ease-out
        opacity 0
        transform translate3d(0rem,10rem,0rem)
</style>
