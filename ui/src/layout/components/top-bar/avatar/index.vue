<template>
  <el-dropdown trigger="click" type="primary">
    <div class="flex-center cursor">
      <AppAvatar>
        <img src="@/assets/user-icon.svg" style="width: 54%" alt="" />
      </AppAvatar>
      <span class="ml-8">{{ user.userInfo?.username }}</span>
      <el-icon class="el-icon--right">
        <CaretBottom />
      </el-icon>
    </div>

    <template #dropdown>
      <el-dropdown-menu class="avatar-dropdown">
        <div class="userInfo">
          <p class="bold mb-4" style="font-size: 14px">{{ user.userInfo?.username }}</p>
          <p>
            <el-text type="info">
              {{ user.userInfo?.email }}
            </el-text>
          </p>
        </div>
        <el-dropdown-item class="border-t p-8" @click="openResetPassword">
          修改密码
        </el-dropdown-item>
        <el-dropdown-item class="border-t" @click="openAbout"> 关于 </el-dropdown-item>
        <el-dropdown-item class="border-t" @click="logout"> 退出 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <ResetPassword ref="resetPasswordRef"></ResetPassword>
  <AboutDialog ref="AboutDialogRef"></AboutDialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import useStore from '@/stores'
import { useRouter } from 'vue-router'
import ResetPassword from './ResetPasssword.vue'
import AboutDialog from './AboutDialog.vue'
const { user } = useStore()
const router = useRouter()

const AboutDialogRef = ref()
const resetPasswordRef = ref<InstanceType<typeof ResetPassword>>()

const openAbout = () => {
  AboutDialogRef.value?.open()
}

const openResetPassword = () => {
  resetPasswordRef.value?.open()
}

const logout = () => {
  user.logout().then(() => {
    router.push({ name: 'login' })
  })
}
</script>
<style lang="scss" scoped>
.avatar-dropdown {
  min-width: 210px;
  .userInfo {
    padding: 12px 11px;
  }
  :deep(.el-dropdown-menu__item) {
    padding: 12px 11px;
  }
}
</style>
