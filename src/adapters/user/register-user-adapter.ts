import {
  register as registerCore,
  Register,
} from '@/core/use-cases/user/register-user'

export const register: Register = (outsideRegister) => (data) =>
  registerCore(outsideRegister)(data)
