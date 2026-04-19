import { ref } from 'vue'
import { defineStore } from 'pinia'

const initAccount = {
  name: '',
  email: '',
  avatar: '',
}

export const useAccountStore = defineStore('account', () => {
  const account = ref({ ...initAccount })

  const updateAccount = (params: typeof initAccount) => {
    Object.assign(account.value, params)
  }
  const clearAccount = () => {
    account.value = { ...initAccount }
  }
  return { account, updateAccount, clearAccount }
})
