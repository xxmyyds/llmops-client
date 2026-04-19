<template>
  <p>主页</p>
  <p>用户名：{{ account.name }}</p>
  <p>邮箱：{{ account.email }}</p>
  <p>头像：{{ account.avatar }}</p>
  <RouterLink to="/space/apps">跳转到ai应用列表</RouterLink>
</template>
<script setup lang="ts">
import { useAccountStore } from '@/stores/account'
import { onMounted, computed } from 'vue'
const accountStore = useAccountStore()
const account = computed(() => accountStore.account)
onMounted(() => {
  accountStore.updateAccount({
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/123456789?v=4',
  })
})
</script>
