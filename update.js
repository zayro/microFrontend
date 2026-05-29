const fs = require('fs');
const file = 'src/views/register/createUserView.vue';
let content = fs.readFileSync(file, 'utf8');

const newTemplate = `
<template>
  <div class="flex flex-col min-h-screen items-center justify-between background-main transition-colors duration-300">
    <div class="flex items-center justify-center flex-1 w-full p-4">
      <Card class="flex flex-col text-center py-8 px-6 rounded-2xl w-full max-w-md shadow-lg backdrop-blur-md bg-[var(--p-surface-card)] transition-colors duration-300">
        <template #content>
          <div class="text-center mb-6">
            <Avatar :image="avatar" shape="circle" class="mx-auto mb-2 p-avatar-custom" />
            <div class="text-3xl font-semibold mb-2 text-[var(--p-text-color)]">Create New User</div>
            <span class="font-medium leading-6 text-[var(--p-text-secondary)]">Register</span>
          </div>

          <form id="createUser" name="createUser" autocomplete="on" @submit="onSubmit">
            <div class="flex items-center justify-center gap-3 mb-4 flex-col">
              <IconField icon-position="left" class="w-full">
                <InputIcon id="username" class="pi pi-user" />
                <InputText v-model.trim="username" type="text" class="flex-auto w-full" placeholder="Username" variant="filled" aria-describedby="username-help" />
              </IconField>
              <small v-if="errors.username" aria-describedby="username-help" class="p-error flex items-center justify-center">{{ errors.username }}</small>
            </div>

            <div class="flex items-center justify-center gap-3 mb-4 flex-col">
              <IconField icon-position="left" class="w-full">
                <InputIcon id="email" class="pi pi-envelope" />
                <InputText v-model.trim="email" type="email" class="flex-auto w-full" placeholder="Email" variant="filled" aria-describedby="email-help" />
              </IconField>
              <small v-if="errors.email" id="email-help" class="p-error flex items-center justify-center">{{ errors.email }}</small>
            </div>

            <div class="flex items-center justify-center gap-3 mb-4 flex-col">
              <IconField icon-position="left" class="w-full">
                <InputIcon class="z-2">
                  <InputIcon class="pi pi-lock" />
                </InputIcon>
                <Password v-model="password" inputClass="w-full" class="flex-auto w-full" placeholder="Password" variant="filled" toggle-mask>
                  <template #header>
                    <h6>Pick a password</h6>
                  </template>
                  <template #footer>
                    <Divider />
                    <p class="mt-2">Suggestions</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                      <li>At least one lowercase</li>
                      <li>At least one uppercase</li>
                      <li>At least one numeric</li>
                      <li>Minimum 8 characters</li>
                    </ul>
                  </template>
                </Password>
              </IconField>
              <small v-if="errors.password" id="password-help" class="p-error flex items-center justify-center">{{ errors.password }}</small>
            </div>

            <div class="flex items-center justify-center gap-3 mb-4 flex-col">
              <IconField icon-position="left" class="w-full">
                <InputIcon class="z-2">
                  <InputIcon class="pi pi-lock" />
                </InputIcon>
                <Password v-model="passwordConfirm" inputClass="w-full" class="flex-auto w-full" placeholder="Repeat Password" variant="filled" :feedback="false" toggle-mask />
              </IconField>
              <small v-if="errors.passwordConfirm" id="password-confirm-help" class="p-error flex items-center justify-center">{{ errors.passwordConfirm }}</small>
            </div>

            <div class="flex items-center justify-center gap-2 mb-4">
              <Checkbox v-model="terms" :binary="true" inputId="terms" />
              <label for="terms" class="text-[var(--p-text-secondary)] font-medium text-sm"> I have read the</label>
              <a class="text-sm cursor-pointer font-semibold text-[var(--p-primary-500)] hover:underline ml-1">Terms and Conditions</a>
            </div>

            <div class="flex items-center justify-center gap-3 mb-4">
              <Button type="submit" label="Sign Up" class="w-full" />
            </div>

            <div class="flex items-center justify-center gap-2 mb-3">
              <span class="font-medium text-[var(--p-text-secondary)]">Already have an account?
                <a class="font-semibold cursor-pointer text-[var(--p-primary-600)] hover:underline transition-colors transition-duration-300 ml-1" @click="goRouteLogin()">
                  Login
                </a>
              </span>
            </div>
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.p-avatar-custom {
  width: 100px;
  height: 100px;
  border: none !important;
  box-shadow:
    0 8px 32px rgba(31, 38, 135, 0.25),
    0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
}

.p-avatar-custom:hover {
  transform: translateY(-2px);
  box-shadow:
    0 12px 40px rgba(31, 38, 135, 0.35),
    0 8px 20px rgba(0, 0, 0, 0.2);
}

.background-main {
  overflow-x: hidden;
  overflow-y: hidden;
  background: linear-gradient(
    135deg,
    var(--p-surface-500, #e5e7eb) 0%,
    var(--p-surface-900, #225ba1) 100%
  );
  background-image: url('@/assets/img/background/polygon3.jpg');
  background-size: cover;
  background-repeat: repeat;
}

.p-card {
  background: var(--p-card-background);
  color: var(--p-text-color);
  border-radius: 1.25rem;
  box-shadow: var(--p-card-shadow);
  transition:
    background 0.3s,
    color 0.3s;
}

:deep(.p-password) {
  display: flex;
}

:deep(.p-password > input) {
  width: 100%;
}

body {
  backdrop-filter: blur(4px);
}
</style>
`;

content = content.replace(/<template>[\s\S]*<\/style>/, newTemplate);
fs.writeFileSync(file, content);
