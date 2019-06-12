<template>
  <div class="OrderList">
    <div>OrderList</div>
    <!-- emailjs-smtp-client -->
    <!-- smtp-client -->
  </div>
</template>

<script>
// import {SMTPClient} from 'smtp-client'
// let s = new SMTPClient({
//   host: 'mx.domain.com',
//   port: 25
// })
// (async function () {
//   await s.connect()
//   await s.greet({hostname: 'mx.domain.com'})// runs EHLO command or HELO as a fallback
//   await s.authPlain({username: 'john', password: 'secret'})// authenticates a user
//   await s.mail({from: 'from@sender.com'})// runs MAIL FROM command
//   await s.rcpt({to: 'to@recipient.com'})// runs RCPT TO command (run this multiple times to add more recii)
//   await s.data('mail source')// runs DATA command and streams email source
//   await s.quit()// runs QUIT command
// })().catch(console.error)

export default {
  name: 'OrderList',
  data () {
    return {
    }
  },
  methods: {
    // send () {
    //   var email = require('emailjs')z
    //   console.log(email.server.connect)
    //   var server = email.server.connect({
    //     user: '1319892950@qq.com',
    //     password: 'xxxxxxxxx',
    //     host: 'smtp.qq.com',
    //     ssl: true
    //   })
    //   // 开始发送邮件
    //   server.send({
    //     text: '邮件内容',
    //     from: '1319892950@qq.com',
    //     to: '1319892950@qq.com',
    //     subject: '邮件主题'
    //   }, function (err, message) {
    //     // 回调函数
    //     console.log(err || message)
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.OrderList{
  width: calc(100% - 2*@Padding);
  height: 200px;
  background: #fff;
  padding: @Padding;
}
</style>
